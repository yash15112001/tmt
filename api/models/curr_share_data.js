const Sequelize = require('sequelize')
const sequelize = require('../../config/connection')

const hooks = {}
const tableName = 'curr_share_data';

const CurrShareData = sequelize.define('CurrShareData',{
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    share_owners: {
        type: Sequelize.ARRAY(Sequelize.BIGINT),
        allowNull: false,
    },
    share_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    hold_minor: {
        type: Sequelize.ENUM('PUB','HUF','NRI','NRN','CM'),
        allowNull: false,
    },
    share_type: {
        type: Sequelize.ENUM('PHY','NSD','CDS'),
        allowNull: false,
    }
},{hooks,tableName});

module.exports = CurrShareData;