/**
 *
 * @param {string} id
 * @param {string} username
 * @param {string} text
 * @returns {Object}
 */
const formatMessage = (id, username, text) => {
  return {
    id,
    username,
    time: new Date(),
    text
  };
};

module.exports = {
  formatMessage
};
