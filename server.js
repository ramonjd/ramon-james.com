import path from 'path';
import express from 'express';
import webpackDevServer from './webpack.dev.server';
import bodyParser from 'body-parser'


export default function(callback) {

  const server = express();

  server.set('env', process.env.NODE_ENV)
  server.set('host', process.env.HOST || 'localhost')
  server.set('port', process.env.PORT || 3000)
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({extended: false}))

  global.__ENVIRONMENT__ = process.env.NODE_ENV || 'development';

  // Otherwise errors thrown in Promise routines will be silently swallowed.
  // (e.g. any error during rendering the app server-side!)
  process.on('unhandledRejection', (reason, p) => {
    if (reason.stack) {
      console.error(reason.stack);
    } else {
      console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
    }
  });

  // Short-circuit the browser's annoying favicon request. You can still
  // specify one as long as it doesn't have this exact name and path.
  server.get('/favicon.ico', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' });
    res.end();
  });

  server.use(express.static(path.resolve(__dirname, 'dist')));
  server.use(express.static(path.resolve(__dirname, 'api')));

  // Pull in development server before we define our routes
  if (process.env.NODE_ENV === 'development') {
    webpackDevServer(server)
  }

  server.get('*', require('./app').serverMiddleware);

  server.listen(server.get('port'), (err) => {
    if (err) {
      console.error(err);
    }
    callback(server)
  });

  return server;

}
