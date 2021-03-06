'use strict';

const WeatherService = require('../../app/service/weatherService');

module.exports = {
  async get(city) {

    const weatherService = new WeatherService(city);

    return weatherService.getWeather();
  },
};
