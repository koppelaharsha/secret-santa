const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Santa = sequelize.define('santa',{
    sno: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Santa;
