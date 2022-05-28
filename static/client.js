'use strict';

const socket = new WebSocket('ws://127.0.0.1:8001/');

document.getElementById('ok').onclick = () => {
  const city = document.getElementById('city').value;

  const packet = { name: 'weather', method: 'get', city };
  socket.send(JSON.stringify(packet));
};

const result = document.getElementById('result');
socket.onmessage = (event) => {
  result.innerHTML = JSON.parse(event.data);
};
