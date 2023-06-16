const Sequelize = require('sequelize')
const sequelize = require('../../config/connection')

const hooks = {}
const tableName = 'country_exchange_data';

const CountryExchangeData = sequelize.define('CountryExchangeData',{
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    country_name: {
        type: Sequelize.STRING,
    },
    prev_week_total: {
        type: Sequelize.INTEGER,
    },
    curr_week_total: {
        type: Sequelize.INTEGER,
    },
    total_delta: {
        type: Sequelize.INTEGER
    }
},{hooks,tableName});

module.exports = CountryExchangeData