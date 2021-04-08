/**
 * чтобы запустить:
 * > npm run s
 * http://localhost:7777 в браузере
 * чтобы отключиться — ctrl+c
 */

const http = require('http');
const fs = require('fs');
const ws = new require('ws');
const wss = new ws.Server({
  noServer: true
});
const clients = new Set();


function accept(req, res) {
  if (req.url == '/ws' && req.headers.upgrade &&
    req.headers.upgrade.toLowerCase() == 'websocket') {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);

  } else {
    res.writeHead(404);
    res.end();
  }
}


function onSocketConnect(ws) {
  clients.add(ws);

  ws.on('message', function (message) {
    for (let client of clients) {
      client.send(message);
    }
  });

  ws.on('close', function () {
    clients.delete(ws);
  });
}


http.createServer(accept).listen(7777);