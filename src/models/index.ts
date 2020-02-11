import * as fs from 'fs';
import * as path from 'path';
const Sequelize = require('sequelize');
const thisfile = path.basename(__filename);
import * as config from '../../config/real-config';

// create connection to database
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      logging: false,
      host: config.host,
      dialect: config.dialect,
    });

const models: any = {};

// import all the model definitions from files in this directory
fs.readdirSync(__dirname)
    .filter((file) => {
      return (file.indexOf('.') !== 0) &&
      (file !== thisfile) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
      const model = sequelize['import'](path.join(__dirname, file));
      models[model.name] = model;
    });

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export {models};
