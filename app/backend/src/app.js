import express from 'express';

import 'reflect-metadata';

import { json, urlencoded } from 'body-parser';

import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';
import compression from 'compression';

import { Container } from 'typedi';
import Database from './loaders/database';

import ProgramController from './controllers/Program';
import OrgController from './controllers/Organization';
import AppRoleController from './controllers/AppRole';
import AuthController from './controllers/Auth';
import AppRoleResourceController from './controllers/AppRoleResource/controller';
import AppResourceController from './controllers/AppResource';
import { errorHandlerController } from './middlewares/shared';
import MenuItemController from './controllers/MenuItem';
import MenuController from './controllers/Menu';
import { authorized } from './middlewares/auth/auth';

// https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications
const logger = require('morgan');

const app = express();
const cookieParser = require('cookie-parser');

export const dbUtil = new Database();

dbUtil.connect();

app.set('port', process.env.PORT);

app.use(cookieParser());
app.use(json({ limit: '50mb' }));
app.use(urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: process.env.CLIENT_SERVER }));

app.use(compression());

app.use(logger('dev'));

require('./middlewares/passport/index')();

const CookieStore = mongoStore(session);
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 },
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  next();
});

app.use('/', Container.get(AuthController));
app.use('/', Container.get(MenuController));
app.use('/', Container.get(MenuItemController));
app.use('/', Container.get(ProgramController));
app.use('/role_manager', Container.get(AppRoleController));
app.use('/org_manager', authorized, Container.get(OrgController));
app.use('/role_manager', authorized, Container.get(AppRoleResourceController));
app.use('/role_manager', authorized, Container.get(AppResourceController));

app.use(errorHandlerController);

export default app;
