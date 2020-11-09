const Sequelize = require('sequelize');
const {mysqlCredentials} = require('../data/keys');

const sequelize = new Sequelize(
    mysqlCredentials.database,
    mysqlCredentials.username,
    mysqlCredentials.password,
    mysqlCredentials.options
);

module.exports = sequelize;
