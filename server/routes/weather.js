'use strict';

require('dotenv').config();

const { request } = require('undici');

module.exports = {
  async get(city) {

    const token = process.env.TOKEN;
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');

    url.searchParams.append('q', city);
    url.searchParams.append('appId', token);
    url.searchParams.append('lang', 'ua');
    url.searchParams.append('units', 'metric');

    const { body } = await request(url);

    const buffers = [];
    for await (const data of body) {
      buffers.push(data);
    }

    return JSON.parse(Buffer.concat(buffers).toString());
  },
};
