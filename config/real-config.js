const env = process.env.NODE_ENV || 'test';

const development = {
  // set env variables by running app as
  // $ DB_USERNAME="username" DB_PASSWORD="password" ... node app.js
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOSTNAME,
  dialect: 'mysql',
  secret: 'secret',
};
const test = {
  username: 'root',
  password: 'root',
  database: 'master',
  host: 'localhost',
  dialect: 'mysql',
  secret: 'secret',
};
const travis = {
  username: 'root',
  password: '',
  database: 'master',
  host: 'localhost',
  dialect: 'mysql',
  secret: 'secret',
};

const configs = {
  development,
  test,
  travis,
};

module.exports = configs[env];
