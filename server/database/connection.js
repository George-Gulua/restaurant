'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'MY_DATABASE',
    'root',
    'MYSQL_ROOT_PASSWORD',
    {
        port: '8806',
        dialect: 'mysql',
        define: {
            timestamps: false
        }
    }
)

sequelize
    .authenticate()
    .then(() => console.log('Database connected.'))
    .catch((err) => console.error('Database connection error: ', err))

module.exports = sequelize;

