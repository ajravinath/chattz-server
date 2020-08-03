const userService = require('./userService');

let users = [];
let messages = [];

module.exports = {
  /**
   *
   * @param {string} id
   * @param {string} username
   */
  async joinUser(userId, sockId) {
    const user = await userService.findUserById(userId);
    const newUser = { ...user, sockId };
    users.push(newUser);
    return newUser;
  },

  /**
   *
   * @param {string} id
   */
  findUser(userId) {
    return users.find(user => user.id === userId);
  },

  findUserBySockId(sockId) {
    return users.find(user => user.sockId === sockId);
  },

  saveMessageHistory(message) {
    return messages.push(message);
  },

  getMessageHistory() {
    return messages;
  }
};
