const Sequelize = require('sequelize')
const sequelize = require('../../config/connection')

const hooks = {}
const tableName = 'user';

const User = sequelize.define('User',{
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    addl1: {
        type: Sequelize.STRING,
        alllowNull: false,
    },
    addl2: {
        type: Sequelize.STRING,
        alllowNull: true,
    },
    addl3: {
        type: Sequelize.STRING,
        alllowNull: true,
    },
    addl4: {
        type: Sequelize.STRING,
        alllowNull: false,
    },
    pincode: {
        type: Sequelize.INTEGER,
        alllowNull: false,
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
},{hooks,tableName});

module.exports = User;
