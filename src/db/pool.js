const { Pool } = require('pg');
const { parseDbString } = require('../helpers/object');

const ssl =
  process.env.SSL_DB === 'true'
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    : {};

// const dbString = process.env.DATABASE_URL.split('://')[1];
// const [firstPart, database] = dbString.split('/');
// const [username, passwordHost, port] = firstPart.split(':');
// const [password, host] = passwordHost.split('@');

const { user, database, password, port, host } = parseDbString(
  process.env.DATABASE_URL
);

const config = {
  user: user,
  database: database,
  password: password,
  port: port,
  host: host,
  max: 10,
  idleTimeoutMillis: 30000,
  ...ssl
};

const pool = new Pool(config);

module.exports = pool;
