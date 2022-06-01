'use strict';

require('dotenv').config();

const { request } = require('undici');

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

class WeatherService {
  constructor(city) {
    const url = new URL(WEATHER_URL);

    url.searchParams.append('q', city);
    url.searchParams.append('appId', process.env.TOKEN);
    url.searchParams.append('lang', 'ua');
    url.searchParams.append('units', 'metric');

    this.url = url;
  }

  async getWeather() {
    const { body } = await request(this.url);

    const buffers = [];
    for await (const data of body) {
      buffers.push(data);
    }

    return JSON.parse(Buffer.concat(buffers).toString());
  }
}

module.exports = WeatherService;
