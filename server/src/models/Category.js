const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database')

class Category extends Model { }

Category.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'category'
});

module.exports = Category