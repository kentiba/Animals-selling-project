const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.define('orders', {
    //Product info of the order
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    sex: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    breed: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
    },
});
