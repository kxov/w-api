'use strict';

const socket = new WebSocket('ws://127.0.0.1:8001/');

document.getElementById('ok').onclick = () => {
  const city = document.getElementById('city').value;

  const packet = { name: 'weather', method: 'get', args: [city] };
  socket.send(JSON.stringify(packet));
};

socket.onmessage = ({ data }) => {
  const weather = JSON.parse(data);
  document.getElementById('result').innerHTML = Number(weather.cod) !== 200 ?
    weather.message :
    weather.main.feels_like;
};
