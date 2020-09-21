import { Schema, model } from 'mongoose';

const AppRole = new Schema(
  {
    appSys: { type: String },
    role: { type: String },
    isActive: { type: Boolean },
  },
  { minimize: false },
);

AppRole.pre(/^find/, function (next) {
  this.find({ isActive: { $ne: false } });
  next();
});

const AppRoleModel = model('AppRole', AppRole, 'AppRole');

export default AppRoleModel;
