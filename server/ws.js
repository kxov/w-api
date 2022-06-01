'use strict';

const { Server } = require('ws');

const BINARY_FLAG = { binary: false };

module.exports = (routing, port) => {
  const ws = new Server({ port });

  ws.on('connection', (connection, req) => {
    const ip = req.socket.remoteAddress;
    connection.on('message', async (message) => {
      const obj = JSON.parse(message);
      console.log(obj);
      const { name, method, args = [] } = obj;
      const entity = routing[name];
      if (!entity) return connection.send('"Not found"', BINARY_FLAG);
      const handler = entity[method];
      if (!handler) return connection.send('"Not found"', BINARY_FLAG);
      const json = JSON.stringify(args);
      const parameters = json.substring(1, json.length - 1);
      console.log(`${ip} ${name}.${method}(${parameters})`);
      try {
        const result = await handler(...args);
        connection.send(JSON.stringify(result), BINARY_FLAG);
      } catch (err) {
        console.dir({ err });
        connection.send('"Server error"', BINARY_FLAG);
      }
    });
  });

  console.log(`API on port ${port}`);
};
