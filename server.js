var connect = require('connect'),
    http = require('http');

connect()
    .use(connect.static('build'))
    .listen(3333);