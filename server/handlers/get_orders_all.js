'use strict';
const Order = require('../models/order');

module.exports = async function (req, res) {
    res.json(await Order.findAll());
}