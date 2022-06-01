'use strict';

require('dotenv').config();

const { request } = require('undici');

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

class WeatherService {
  constructor(city) {
    this.url = new URL(WEATHER_URL);

    this.url.searchParams.append('q', city);
    this.url.searchParams.append('appId', process.env.TOKEN);
    this.url.searchParams.append('lang', 'ua');
    this.url.searchParams.append('units', 'metric');
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
