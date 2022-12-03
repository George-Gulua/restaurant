'use strict';
const Product = require('../models/product');

module.exports = async function (req, res) {
    res.json(await Product.findAll());
}