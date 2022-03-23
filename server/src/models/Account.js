const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = require('../database')
const User = require('./User')

class Account extends Model { }

Account.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    balance: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'account'
});

module.exports = Account