import { Sequelize, Options, DataTypes, Model } from "sequelize";

const env = process.env.NODE_ENV || 'development';
const config = require('../config/db.json')[env];

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize.authenticate().then(() => {
  console.log('Database connection successful.');
}).catch(err => {
  console.error('Database connection Failed.', err);
})

export default sequelize