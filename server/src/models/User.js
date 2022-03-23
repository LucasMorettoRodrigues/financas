const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database')

class User extends Model { }

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user'
});

module.exports = User