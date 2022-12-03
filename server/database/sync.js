'use strict';
const sequelize = require('./connection');

require('../models/cart');
require('../models/order');
require('../models/product');

const User = require('../models/user');
const roles = require('../enum/roles');

module.exports = () => {
    sequelize.sync({force: true});

    User.create({
        first_name: 'admin',
        last_name: 'admin',
        login: 'admin',
        password: 'admin',
        role: roles.ADMIN
    })
}