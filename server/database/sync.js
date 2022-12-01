'use strict';
const sequelize = require("./connection");

require("../models/cart");
require("../models/user");
require("../models/order");
require("../models/product");

module.exports = () => {
    sequelize.sync({force: true});
}