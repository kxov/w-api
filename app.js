'use strict';

const staticPort = 8000;
const staticServer = require('./server/static.js');

const wsPort = 8001;
const wsServer = require('./server/ws.js');

staticServer('./static', staticPort);
wsServer(require('./server/routes/routes.js'), wsPort);

