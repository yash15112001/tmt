const Sequelize = require('sequelize')
const sequelize = require('../../config/connection')

const hooks = {}
const tableName = 'portfolio';

const User = require('./user')

const Portfolio = sequelize.define('Portfolio',{
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        allowNull: true,
        type: Sequelize.BIGINT,
        references: {
            model: User,
            key: 'id',
        }
    },
    share_exchange_data_indexes: {
        type: Sequelize.ARRAY(Sequelize.BIGINT),
        allowNull: false,
    },
    prev_week_total: {
        type: Sequelize.FLOAT,
    },
    curr_week_total: {
        type: Sequelize.FLOAT,
    },
    total_delta: {
        type: Sequelize.FLOAT
    }
},{hooks,tableName});

module.exports = Portfolio;