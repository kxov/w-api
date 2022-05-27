'use strict';

const http = require('http');

const server = (routing, port) => {
  http
    .createServer(async (req, res) => {
      const { method, url } = req;
      const name = '/' === url ? url : url.substring(1).split('/');
      const entity = routing[name];
      if (!entity) return res.end('Not found');

      const handler = entity[method.toLowerCase()];

      const result = await handler();
      res.end(result);
    })
    .listen(port);
};

module.exports = { server };
