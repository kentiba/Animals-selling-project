const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.define('clients', {
    //client info!
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    note: {
        type: Sequelize.STRING,
    },
});

//to create the table
db.sync();
