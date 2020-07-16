const express = require('express');
const path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
const { formatMessage } = require('./utils/message');
const { joinUser, findUser } = require('./utils/users');

process.env.PUBLIC_FOLDER = `${process.cwd()}/public`;
const publicDir = process.env.PUBLIC_FOLDER;
app.use(express.static(path.join(publicDir)));

const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

io.on('connection', function (socket) {
  socket.on('join', function ({ username, password }) {
    joinUser(socket.id, username);
    io.emit('join', formatMessage(socket.id, username, ''));
  });

  socket.on('chat-message', function (msg) {
    const user = findUser(socket.id);
    if (user) {
      io.emit('chat-message', formatMessage(user.id, user.username, msg));
    }
  });
});

server.listen(port, function () {
  console.log('listening on *:' + port);
});
