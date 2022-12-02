'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'restaurant',
    'root',
    '',
    {
        port: '3306',
        dialect: 'mysql',
        define: {
            timestamps: false
        }
    }
)

module.exports = sequelize;

