const keys = require('./keys');
const Sequelize = require('sequelize');
module.exports = new Sequelize(keys.database, keys.username, keys.password, {
    host: keys.host,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
