const Sequelize = require('sequelize')
const path = require('path')

const database_creds = require('./database.creds')

let database = new Sequelize(
    database_creds.dev_creds.database,
    database_creds.dev_creds.username,
    database_creds.dev_creds.password,{
        host: database_creds.dev_creds.host,
        dialect: database_creds.dev_creds.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000.
        },
    },
);

module.exports = database;