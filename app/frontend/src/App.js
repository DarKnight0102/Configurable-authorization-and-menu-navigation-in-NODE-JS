import React, { useState, useEffect } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import { CircularProgress, Grid } from '@material-ui/core';
import AuthPage from './components/AuthPage';
import Error from './views/authError';
import AuthController from './controllers/Auth';
import Login from './views/Login';
import Logout from './views/Logout';
import Menu from './views/Menu';

import OrgRouter from './views/OrganizationRouter';
import Signup from './views/Signup'

import './App.scss';

const PrivateRouter = ({ setLoggedIn }) => {
  return (
    <Switch>
      <Route exact path="/" component={Menu} />
      <Route path="/organization" component={OrgRouter} />
      <Route exact path="/logout" render={props => <Logout {...props} setLoggedIn={setLoggedIn} />} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};
const PublicRouter = ({ setLoggedIn }) => {
  return (
    <Switch>
      <Route exact path="/register" component={Signup} />
      <Route exact path="/login" render={props => <Login {...props} setLoggedIn={setLoggedIn} />} />
      <Route exact path="/auth/error" component={Error} />
      <Redirect from="*" to="/login" />
    </Switch>
  );
};

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    AuthController.profile()
      .then(res => {
        setLoggedIn(res.status === 'ok');
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }, []);

  return (
    <div className="appContainer">
      {isLoggedIn === null ? (
        <Grid container style={{ height: '100vh' }} justify="center" alignContent="center">
          <Grid item>
            <CircularProgress color="secondary" />
          </Grid>
        </Grid>
      ) : isLoggedIn ? (
        <AuthPage>
          <PrivateRouter setLoggedIn={setLoggedIn} />
        </AuthPage>
      ) : (
            <PublicRouter setLoggedIn={setLoggedIn} />
          )}
    </div>
  );
};

export default App;
