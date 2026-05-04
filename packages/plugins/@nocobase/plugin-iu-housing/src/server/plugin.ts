/**
 * IU Housing Management Plugin - Server Plugin Class
 *
 * Features:
 * - Auto-update room occupancy on assignment
 * - Auto-set room status to "full" when capacity reached
 * - Maintenance ticket auto-assignment workflow
 */
import { InstallOptions, Plugin } from '@nocobase/server';

export class PluginIUHousingServer extends Plugin {
  afterAdd() {}

  beforeLoad() {
    this.app.acl.addFixedParams('collections', 'destroy', () => ({
      filter: {
        'name.$notIn': ['buildings', 'rooms', 'housingAssignments', 'maintenanceRequests'],
      },
    }));
  }

  async load() {
    this.app.acl.registerSnippet({
      name: `pm.${this.name}`,
      actions: [
        'buildings:*', 'rooms:*', 'housingAssignments:*', 'maintenanceRequests:*',
      ],
    });

    this.app.acl.allow('buildings', ['list', 'get'], 'loggedIn');
    this.app.acl.allow('rooms', ['list', 'get'], 'loggedIn');
    this.app.acl.allow('housingAssignments', ['list', 'get', 'create'], 'loggedIn');
    this.app.acl.allow('maintenanceRequests', ['list', 'get', 'create'], 'loggedIn');

    // Auto-update room occupancy when assignment is created/checked-in
    this.app.db.on('housingAssignments.afterCreate', async (model: any, options: any) => {
      await this.updateRoomOccupancy(model.get('roomId'), options?.transaction);
    });

    this.app.db.on('housingAssignments.afterUpdate', async (model: any, options: any) => {
      const previousStatus = model.previous('status');
      const currentStatus = model.get('status');

      if (previousStatus !== currentStatus) {
        await this.updateRoomOccupancy(model.get('roomId'), options?.transaction);
        this.app.logger.info(
          `[iu-housing] Assignment ${model.get('id')} status: ${previousStatus} → ${currentStatus}`
        );
      }
    });

    // Prevent overbooking
    this.app.db.on('housingAssignments.beforeCreate', async (model: any, options: any) => {
      const roomId = model.get('roomId');
      if (!roomId) return;

      const roomRepo = this.app.db.getRepository('rooms');
      const room = await roomRepo.findOne({
        filter: { id: roomId },
        transaction: options?.transaction,
      });

      if (!room) throw new Error('Room not found');

      const assignmentRepo = this.app.db.getRepository('housingAssignments');
      const activeCount = await assignmentRepo.count({
        filter: {
          roomId,
          status: { $in: ['assigned', 'checked_in'] },
        },
        transaction: options?.transaction,
      });

      if (activeCount >= room.get('capacity')) {
        throw new Error(`Room ${room.get('roomNumber')} is at full capacity (${room.get('capacity')})`);
      }
    });
  }

  private async updateRoomOccupancy(roomId: any, transaction?: any) {
    if (!roomId) return;

    const assignmentRepo = this.app.db.getRepository('housingAssignments');
    const activeCount = await assignmentRepo.count({
      filter: {
        roomId,
        status: { $in: ['assigned', 'checked_in'] },
      },
      transaction,
    });

    const roomRepo = this.app.db.getRepository('rooms');
    const room = await roomRepo.findOne({ filter: { id: roomId }, transaction });

    if (room) {
      const capacity = room.get('capacity') as number;
      await roomRepo.update({
        filter: { id: roomId },
        values: {
          currentOccupancy: activeCount,
          status: activeCount >= capacity ? 'full' : 'available',
        },
        transaction,
      });
    }
  }

  async install(options?: InstallOptions) {
    const collectionRepo = this.db.getRepository<any>('collections');
    if (collectionRepo) {
      await collectionRepo.db2cm('buildings');
      await collectionRepo.db2cm('rooms');
      await collectionRepo.db2cm('housingAssignments');
      await collectionRepo.db2cm('maintenanceRequests');
    }
  }

  async afterEnable() {}
  async afterDisable() {}
  async remove() {}
}

export default PluginIUHousingServer;
