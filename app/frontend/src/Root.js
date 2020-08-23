import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import { ROUTE_ROOT } from './constants/routes';

import App from './App';

const Root = () => (
  <BrowserRouter>
    <Route path={ROUTE_ROOT} component={App} />
  </BrowserRouter>
);

export default Root;
