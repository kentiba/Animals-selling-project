const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.define(
    'products',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        age: {
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
        image: {
            type: Sequelize.STRING,
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

//to create the table
db.sync();
