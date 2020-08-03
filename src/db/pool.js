const { Pool } = require('pg');

const ssl =
  process.env.SSL_DB === 'true'
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    : {};

const config = {
  connectionString: `${process.env.DATABASE_URL}`,
  max: 10,
  idleTimeoutMillis: 30000,
  ...ssl
};

const pool = new Pool(config);

module.exports = pool;
