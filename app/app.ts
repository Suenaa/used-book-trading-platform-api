import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as cors from '@koa/cors';
import * as session from 'koa-session';

const serve = require('koa-static');
const koaValidator = require('koa-async-validator');
const koaSwagger = require('koa2-swagger-ui');

import { config } from './config';
import { logger } from './logger';
import { router } from './routes';

import { errorHandler } from './error';

const app = new Koa();

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFieldsSize: 200 * 1024 * 1024,
  }
}));

app.use(koaValidator());
app.use(cors({
  origin: 'http://10.69.107.33:8081',
  credentials: true,
}));
app.use(logger);
app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve('public'));
app.use(koaSwagger({
  routePrefix: '/swagger',
  swaggerOptions: {
    url: '/swagger.json',
  },
}));

app.keys = ['sysu'];

app.use(session({
  key: 'sugerpocket', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false
}, app));

export const server = app.listen(config.port);

console.log(`Server running on port ${config.port}`);
