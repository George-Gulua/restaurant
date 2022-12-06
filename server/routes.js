'use strict'

const signup = require('./handlers/singup');
const get_user = require('./handlers/get_user');
const authorize = require('./handlers/authorize');
const add_order = require('./handlers/add_order');
const add_product = require('./handlers/add_product');
const remove_order = require('./handlers/remove_order');
const verify_token = require('./handlers/verify_token');
const remove_product = require('./handlers/remove_product');
const get_orders_all = require('./handlers/get_orders_all');
const change_password = require('./handlers/change_password');
const get_products_all = require('./handlers/get_products_all');


module.exports = function (app, opts) {
    app.get('/getOrdersAll', get_orders_all);
    app.get('/getProductsAll', get_products_all);

    app.post('/signup', signup);
    app.post('/getUser', get_user);
    app.post('/addOrder', add_order);
    app.post('/authorize', authorize);
    app.post('/addProduct', add_product);
    app.post('/verifyToken', verify_token);
    app.post('/removeOrder', remove_order);
    app.post('/removeProduct', remove_product);
    app.post('/changePassword', change_password);
}
