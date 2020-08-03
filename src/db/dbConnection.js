const pool = require('./pool');

pool.on('connect', () => {
  console.log('connected to db');
});

const createUserTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS 
    users(id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        password VARCHAR(100) NOT NULL,
        created_on DATE NOT NULL
        )`;
  pool
    .query(query)
    .then(result => {
      console.log(result);
      pool.end();
    })
    .catch(error => {
      console.log(error);
      pool.end();
    });
};

const dropUsersTable = () => {
  const query = `DROP TABLE IF EXISTS users`;
  pool
    .query(query)
    .then(result => {
      console.log(result);
      pool.end();
    })
    .catch(error => {
      console.log(error);
      pool.end();
    });
};

const createAllTables = () => {
  createUserTable();
};

const dropAllTables = () => {
  dropUsersTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createAllTables,
  dropAllTables
};

require('make-runnable');
