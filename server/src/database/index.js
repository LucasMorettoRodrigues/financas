const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development';
const dbConfig = require('../config/database.json')[env]

let sequelize;
if (dbConfig.use_env_variable) {
    sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
    sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

module.exports = sequelize