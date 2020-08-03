const mapKeys = require('lodash/mapKeys');
const camelCase = require('lodash/camelCase');

module.exports = {
  snakeToCamel(object) {
    return mapKeys(object, (value, key) => camelCase(key));
  },

  parseDbString(databaseUrl) {
    console.log('databaseUrl:', databaseUrl);
    if (databaseUrl) {
      const dbString = databaseUrl.split('://')[1];
      const [firstPart, database] = dbString.split('/');
      const [user, passwordHost, port] = firstPart.split(':');
      const [password, host] = passwordHost.split('@');

      return {
        user: user,
        database: database,
        password: password,
        port: port,
        host: host
      };
    }
    return null;
  }
};
