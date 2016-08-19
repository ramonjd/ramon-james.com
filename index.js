require('babel-register');

var server = require('./server');

server.default(function (server) {
    console.info(`⚡⚡⚡ Server running on http://localhost:${server.get('port')}/`);
});
