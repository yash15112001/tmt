const Sequelize = require('sequelize')
const sequelize = require('../../config/connection')

const hooks = {}
const tableName = 'user';

// const Address = sequelize.define('address',{
//     addl1: {
//         type: Sequelize.STRING,
//         alllowNull: false,
//     },
//     addl2: {
//         type: Sequelize.STRING,
//         alllowNull: true,
//     },
//     addl3: {
//         type: Sequelize.STRING,
//         alllowNull: true,
//     },
//     addl4: {
//         type: Sequelize.STRING,
//         alllowNull: false,
//     },
//     pincode: {
//         type: Sequelize.INTEGER,
//         alllowNull: false,
//     },
// });

// const Name = seq.define('name',{
//     first_name: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     middle_name: {
//         type: Sequelize.STRING,
//         alllowNull: true,
//     },
//     last_name: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
// })

const User = sequelize.define('User',{
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    middle_name: {
        type: Sequelize.STRING,
        alllowNull: true,
    },
    last_name: {
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
    is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
},{hooks,tableName});

// User.hasOne(Name);
// User.hasOne(Address);

module.exports = User;
