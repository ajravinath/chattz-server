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
    console.log('username:', username);
    joinUser(socket.id, username);
    io.emit(
      'message',
      formatMessage(socket.id, 'bot', `${username} joined the chat`)
    );
  });

  socket.on('chat-message', function (msg) {
    const user = findUser(socket.id);
    if (user) {
      socket.broadcast.emit(
        'chat-message',
        formatMessage(user.id, user.username, msg)
      );
      socket.emit(
        'chat-message',
        formatMessage(user.id, user.username, msg, true)
      );
    }
  });

  socket.on('disconnect', reason => {
    console.log('disconnect', reason);
    if (reason === 'io server disconnect') {
      socket.connect();
    } else {
      const user = findUser(socket.id);
      if (user) {
        io.emit(
          'message',
          formatMessage(socket.id, 'bot', `${user.username} has left the chat`)
        );
      }
    }
  });
});

server.listen(port, function () {
  console.log('listening on *:' + port);
});
