const { formatMessage, formatChatMessage } = require('../utils/message');
const chatService = require('../service/chatService');

function onConnected(socket, io) {
  socket.on('join', async ({ userId }) => {
    const user = await chatService.joinUser(userId, socket.id);
    //prettier-ignore
    console.log('join with sockId: ', user.sockId, ' username: ', user.email);

    io.of('/chattz').emit(
      'message',
      formatMessage(user.sockId, 'bot', `${user.username} joined the chat`)
    );

    const history = chatService.getMessageHistory();
    io.of('/chattz').emit('history', history);
  });

  socket.on('chat-message', function ({ userId, text }) {
    console.log('msg:', text);
    console.log('join with:', socket.id);
    // console.log('username:', username);
    const user = chatService.findUser(userId);
    console.log('user:', user);
    if (user) {
      socket.broadcast.emit('chat-message', formatChatMessage(user, text));
      socket.emit('chat-message', formatChatMessage(user, text));
      chatService.saveMessageHistory(formatChatMessage(user, text));
    }
  });

  socket.on('disconnect', reason => {
    console.log('disconnect', reason);
    if (reason === 'io server disconnect') {
      socket.connect();
    } else {
      const user = chatService.findUserBySockId(socket.id);
      if (user) {
        io.of('/chattz').emit(
          'message',
          formatMessage(socket.id, 'bot', `${user.username} has left the chat`)
        );
      }
    }
  });
}

module.exports = onConnected;
