'use strict';
const jwt = require("jsonwebtoken");
const { StatusCode } = require('status-code-enum')

const Cart = require('../models/cart');
const Order = require('../models/order');

module.exports = async function (req, res) {
    if (req.body) {

        const token = req.body.jwt;
        if (token) {

            const data = { ...req.body };

            try {
                const jwt_data = jwt.verify(token, process.env.TOKEN_SECRET);

                try {
                    const order = await Order.create({
                        creation_date: new Date(),
                        UserId: jwt_data.user.id,
                    });

                    try {
                        const product_list = data.products;
                        for (const product of product_list) {
                            await Cart.create({
                                OrderId: order.id,
                                ProductId: product.id,
                                product_quantity: product.product_quantity,
                            });
                        }
                        return res.status(StatusCode.SuccessCreated).json();
                    } catch(_err) {
                        await Order.destroy({
                            where: {
                                'id': order.id
                            }
                        });
                        console.log(`Cannot add product to order from product list: ${product_list}`);
                    }
                } catch (_err) {
                    console.log(`Cannot create order for user: ${user.id}`);
                }
            } catch (_err) {
                console.log(`Wrong JWT token on add_order: ${token}`);
            }
        }
    }

    return res.status(StatusCode.ClientErrorBadRequest).json();
}