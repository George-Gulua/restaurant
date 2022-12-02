const { DataTypes, Model } = require('sequelize');
const sequelize = require("../database/connection");

const User = require("./user");

class Order extends Model {}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        creation_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
    }, 
    { sequelize }
);

User.hasOne(Order, {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE',
    });

module.exports = Order;