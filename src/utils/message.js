const format = require('date-fns/format');
const objectHelper = require('../helpers/object');
/**
 *
 * @param {string} id
 * @param {string} username
 * @param {string} text
 * @returns {Object}
 */
const formatMessage = (id, username, text, isMe = false) => {
  return {
    id,
    username,
    time: format(new Date(), 'h:mm a'),
    text,
    isMe
  };
};

const formatChatMessage = (user, text) => {
  return {
    ...objectHelper.snakeToCamel(user),
    text,
    time: format(new Date(), 'h:mm a')
  };
};

module.exports = {
  formatMessage,
  formatChatMessage
};
