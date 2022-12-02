const { DataTypes, Model } = require('sequelize');
const sequelize = require("../database/connection");

class Product extends Model {}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        img_path: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    }, 
    { sequelize }
);

module.exports = Product;