const format = require('date-fns/format');

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

module.exports = {
  formatMessage
};
