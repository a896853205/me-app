import express from 'express';
import path from 'path';
// var favicon = require('serve-favicon');
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { cors } from './src/config/cors-config';
// 路由
import { routerInit as equipRouterInit } from './src/routes/equip';
import { routerInit as uploadTokenRouterInit } from './src/routes/upload-token';
// result返回对象
import { Result } from './util/response';

const app = express();

app.all('*', cors);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/equip', equipRouterInit());
app.use('/upload', uploadTokenRouterInit());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json(new Result({}, err.status, 0));
});

module.exports = app;