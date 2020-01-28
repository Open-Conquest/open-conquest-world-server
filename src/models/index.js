const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const thisfile = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/real-config.js')[env];

// create connection to database
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
    });

const db = {};

// import all the model definitions from files in this directory
fs.readdirSync(__dirname)
    .filter((file) => {
      return (file.indexOf('.') !== 0) &&
      (file !== thisfile) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
      const model = sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
