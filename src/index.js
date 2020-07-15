const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

process.env.PUBLIC_FOLDER = `${process.cwd()}/public`;
const publicDir = process.env.PUBLIC_FOLDER;
app.use(express.static(path.join(publicDir)));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
});

server.listen(process.env.PORT || 3000, function () {
  console.log('listening on *:' + port);
});
