export default class AppRoleResourceEntity {
  constructor({ _id, AppRoleId, resourceId, isActive }) {
    this._id = _id;
    this.AppRoleId = AppRoleId;
    this.resourceId = resourceId;
    this.isActive = isActive;
  }
}
