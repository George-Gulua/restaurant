const { DataTypes, Model } = require('sequelize');
const sequelize = require("../database/connection");

const Order = require("./order");
const Product = require("./product");

class Cart extends Model {}

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    { sequelize }
);

Order.hasOne(Cart, {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE',
    });
Product.hasOne(Cart, {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE',
    });

module.exports = Cart;