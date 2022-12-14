'use strict';
const jwt = require("jsonwebtoken");
const roles = require('../enum/roles');
const { StatusCode } = require('status-code-enum');

const User = require('../models/user');
const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require("../models/product");

module.exports = async function (req, res) {
    if (!req.query) {
        res.status(StatusCode.ClientErrorBadRequest).json();
        return;
    }

    const token = req.query.jwt;

    if (token) {
        try {
            const jwt_data = jwt.verify(token, process.env.TOKEN_SECRET);
            const user = jwt_data.user;

            if (user.role !== roles.ADMIN) {
                return res.status(StatusCode.ClientErrorForbidden).json();
            }

            let response = [];

            const orders = await Order.findAll();
            for (const order of orders) {
                try {
                    const carts = await Cart.findAll({where: {
                        'OrderId': order.id,
                    }});

                    const user = await User.findByPk(order.UserId);
                    
                    let entry = {};

                    entry.order_id = order.id;
                    entry.owner_login = user.login;
                    entry.creation_date = order.creation_date;
                    entry.products = [];

                    for (const cart of carts) {
                        const product = await Product.findByPk(cart.ProductId);
                        entry.products.push({
                            title: product.title,
                            price: product.price,
                            product_quantity: cart.product_quantity,
                        });
                    }

                    response.push(entry);

                } catch(err) {
                    console.log(err);
                    return res.status(StatusCode.ServerErrorInternal).json();
                }
            }

            return res.status(StatusCode.SuccessOK).json(response);            
        } catch (error) {
            console.log(`Wrong JWT token on get_orders_all: ${token}`);
        }
    }

    return res.status(StatusCode.ClientErrorUnauthorized).json();
}