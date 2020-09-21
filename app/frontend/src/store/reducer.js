import { combineReducers } from 'redux';

import ui from './reducers/ui';

import AppResourcesStore from './AppResourcesStore/store';
import AppRoleResourcesStore from './AppRoleResourcesStore/store';
import AppRolesStore from './AppRolesStore/store';
import DialogsStore from './DialogsStore/store';

import ProgramsStore from './ProgramsStore/store';
import OrgsStore from './OrganizationsStore/store';
import UserStore from './UserStore/store';

export const root = combineReducers({
  UserStore: UserStore.reducer,
  ProgramsStore: ProgramsStore.reducer,
  AppResourcesStore: AppResourcesStore.reducer,
  AppRoleResourcesStore: AppRoleResourcesStore.reducer,
  AppRolesStore: AppRolesStore.reducer,
  DialogsStore: DialogsStore.reducer, 
  OrgsStore: OrgsStore.reducer,
  ui,
});

export default root;
