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
        }
    }, 
    { sequelize }
);

Order.hasOne(Cart);
Product.hasOne(Cart);

module.exports = Cart;