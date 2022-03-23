const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = require('../database');
const Account = require('./Account');
const Category = require('./Category');
const User = require('./User');

class Posting extends Model { }

Posting.init({
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
    category_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Category,
            key: 'id'
        }
    },
    account_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Account,
            key: 'id'
        }
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
    modelName: 'posting'
});

module.exports = Posting