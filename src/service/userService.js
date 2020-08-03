const dbQuery = require('../db/dbQuery');

module.exports = {
  findUserById: async userId => {
    const query = `SELECT * FROM users WHERE id = $1`;
    const { rows } = await dbQuery.query(query, [userId]);
    const user = rows[0];
    return user;
  }
};
