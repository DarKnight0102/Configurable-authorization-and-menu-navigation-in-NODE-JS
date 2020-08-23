import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from '../../components/NotFound';
import Organizations from './Organizations';
import CreateOrganization from './CreateOrganization';
import EditOrganization from './EditOrganization';

const OrgRouter = () => (
  <Switch>
    <Route exact path="/organization/edit/:_id" component={EditOrganization} />
    <Route exact path="/organization/create" component={CreateOrganization} />
    <Route exact path="/organization" component={Organizations} />
    <Route component={NotFound} />
  </Switch>
);

export default OrgRouter;
