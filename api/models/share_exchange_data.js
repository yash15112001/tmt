const Sequelize = require('sequelize')
const sequelize = require('../../config/connection')

const CurrShareData = require('./curr_share_data')
const PrevShareData = require('./prev_share_data')

const hooks = {}
const tableName = 'share_exchange_data';

const ShareExchangeData = sequelize.define('ShareExchangeData',{
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    share_delta: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    share_owners: {
        type: Sequelize.ARRAY(Sequelize.BIGINT),
        allowNull: false,
    },
    curr_share_data_index: {
        allowNull: true,
        type: Sequelize.BIGINT,
        references: {
            model: CurrShareData,
            key: 'id',
        }
    },
    prev_share_data_index: {
        allowNull: true,
        type: Sequelize.BIGINT,
        references: {
            model: PrevShareData,
            key: 'id',
        }
    },
    hold_minor_status: {
        type: Sequelize.STRING,
    },
    share_type_status: {
        type: Sequelize.STRING,
    }
},{hooks,tableName});

module.exports = ShareExchangeData;