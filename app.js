'use strict';

const staticPort = 8000;

const staticServer = require('./server/static.js');

staticServer('./static', staticPort);
