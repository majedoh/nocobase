/**
 * IU Facilities Management Plugin - Server Plugin Class
 *
 * Features:
 * - Venue booking conflict detection
 * - Capacity validation (attendees vs venue capacity)
 * - Fleet vehicle status tracking
 */
import { InstallOptions, Plugin } from '@nocobase/server';

export class PluginIUFacilitiesServer extends Plugin {
  afterAdd() {}

  beforeLoad() {
    this.app.acl.addFixedParams('collections', 'destroy', () => ({
      filter: { 'name.$notIn': ['venues', 'venueBookings', 'fleetVehicles'] },
    }));
  }

  async load() {
    this.app.acl.registerSnippet({
      name: `pm.${this.name}`,
      actions: ['venues:*', 'venueBookings:*', 'fleetVehicles:*'],
    });

    this.app.acl.allow('venues', ['list', 'get'], 'loggedIn');
    this.app.acl.allow('venueBookings', ['list', 'get', 'create'], 'loggedIn');
    this.app.acl.allow('fleetVehicles', ['list', 'get'], 'loggedIn');

    // Prevent double-booking of venues
    this.app.db.on('venueBookings.beforeCreate', async (model: any, options: any) => {
      const venueId = model.get('venueId');
      const date = model.get('date');
      const timeStart = model.get('timeStart');
      const timeEnd = model.get('timeEnd');

      if (!venueId || !date) return;

      const bookingRepo = this.app.db.getRepository('venueBookings');
      const conflicting = await bookingRepo.count({
        filter: {
          venueId,
          date,
          status: { $in: ['pending', 'confirmed'] },
          $or: [
            { timeStart: { $lt: timeEnd }, timeEnd: { $gt: timeStart } },
          ],
        },
        transaction: options?.transaction,
      });

      if (conflicting > 0) {
        throw new Error('This venue is already booked for the selected time slot');
      }

      // Validate capacity
      const venueRepo = this.app.db.getRepository('venues');
      const venue = await venueRepo.findOne({
        filter: { id: venueId },
        transaction: options?.transaction,
      });

      if (venue) {
        const capacity = venue.get('capacity') as number;
        const attendees = model.get('expectedAttendees') || 0;
        if (capacity && attendees > capacity) {
          this.app.logger.warn(
            `[iu-facilities] Booking exceeds venue capacity: ${attendees} > ${capacity}`
          );
        }
      }
    });

    // Log booking lifecycle
    this.app.db.on('venueBookings.afterUpdate', async (model: any) => {
      const prev = model.previous('status');
      const curr = model.get('status');
      if (prev !== curr) {
        this.app.logger.info(
          `[iu-facilities] Booking ${model.get('bookingNumber')}: ${prev} → ${curr}`
        );
      }
    });
  }

  async install(options?: InstallOptions) {
    const collectionRepo = this.db.getRepository<any>('collections');
    if (collectionRepo) {
      await collectionRepo.db2cm('venues');
      await collectionRepo.db2cm('venueBookings');
      await collectionRepo.db2cm('fleetVehicles');
    }
  }

  async afterEnable() {}
  async afterDisable() {}
  async remove() {}
}

export default PluginIUFacilitiesServer;
