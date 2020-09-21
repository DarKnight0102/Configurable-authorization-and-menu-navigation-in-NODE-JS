import AppRoleEntity from '../../entities/AppRole';
import BaseRepository from '../repository';
import AppRoleModel from '../../models/AppRole';

export default class AppRoleRepository extends BaseRepository {
  constructor() {
    super(AppRoleModel);
  }

  async delete(id) {
    const AppRole = await AppRoleModel.findById(id);
    if (AppRole) {
      AppRole.isActive = false;
    }
    return this.update(id, AppRole);
  }

  async create(AppRole) {
    AppRole.isActive = true;
    return AppRoleModel.create(AppRole).then(
      AppRole => new AppRoleEntity(AppRole.toObject()),
    );
  }

  async update(id, AppRole) {
    return AppRoleModel.findByIdAndUpdate(id, AppRole).then(
      AppRole => new AppRoleEntity(AppRole.toObject()),
    );
  }

  async find(query) {
    return AppRoleModel.find(query).then(AppRoles =>
      AppRoles.map(AppRole => new AppRoleEntity(AppRole.toObject())),
    );
  }

  async findById(id) {
    return this._model.findById(id).then(result => {
      if (!result) throw new Error('_id does not exist');
      return result.toObject();
    });
  }

  async findAndCreateAppRole(appSys, role) {
    return AppRoleModel.findOne({ appSys, role }).then(AppRole => {
      if (AppRole) return AppRole;
      return AppRoleModel.create({
        role,
        appSys,
        isActive: true,
      });
    });
  }
}
