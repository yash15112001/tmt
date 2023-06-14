const Sequelize = require('sequelize')
const sequelize = require('../../config/connection')

const hooks = {}
const tableName = 'prev_share_data';

const PrevShareData = sequelize.define('PrevShareData',{
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

module.exports = PrevShareData;