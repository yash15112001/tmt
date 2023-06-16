const Sequelize = require('sequelize')
const sequelize = require('../../config/connection')

const hooks = {}
const tableName = 'city_exchange_data';

const CityExchangeData = sequelize.define('CityExchangeData',{
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    city_name: {
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

module.exports = CityExchangeData