require('babel-register');

var server = require('./server');

server.default(function (server) {
       console.info('==> 🌎 Express %s server listening on %s:%s', server.get('env'), server.get('host'), server.get('port'));
});
