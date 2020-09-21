import AppRoleController from '../../controllers/AppRole';
import AppRolesStore from '../AppRolesStore/store';

import {
  getRequestFactory,
  createRequestFactory,
  deleteRequestFactory,
  updateRequestFactory,
} from './common/REST';

export const getAppRolesRequest = getRequestFactory(AppRolesStore, AppRoleController);
export const createAppRoleRequest = createRequestFactory(AppRolesStore, AppRoleController);
export const deleteAppRoleRequest = deleteRequestFactory(AppRolesStore, AppRoleController);
export const updateAppRoleRequest = updateRequestFactory(AppRolesStore, AppRoleController);
