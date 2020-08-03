const http = require('http');
const socketIo = require('socket.io');
const onConnected = require('./sio/index');
const app = require('./app');

const server = http.createServer(app);

process.on('uncaughtException', err => {
  console.error('uncaughtException', err);
  process.exit(1);
});

process.on('unhandledRejection', err => {
  console.error('unhandledRejection', err);
  process.exit(1);
});

server.listen(process.env.PORT || '3000', () => {
  console.log(`server will listen on port ${process.env.PORT || '3000'}`);
});

const io = socketIo.listen(server);
io.set('origins', 'http://localhost:* http://chattz.surge.sh:*');
io.of('/chattz').on('connection', socket => onConnected(socket, io));
