let users = [];

/**
 *
 * @param {string} id
 * @param {string} username
 */
const joinUser = (id, username) => {
  users.push({ id, username });
};

/**
 *
 * @param {string} id
 */
const findUser = id => {
  return users.find(user => user.id === id);
};

module.exports = {
  joinUser,
  findUser
};
