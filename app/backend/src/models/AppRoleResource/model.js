import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const AppRoleResourceModel = model(
  'AppRoleResource',
  new Schema(
    {
      appResourceId: { type: ObjectId, ref: 'AppResource' },
      AppRoleId: [{ type: ObjectId, ref: 'AppRole' }],
    },
    { minimize: false },
  ),
  'AppRoleResource',
);

export default AppRoleResourceModel;
