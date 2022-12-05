'use strict';
const jwt = require("jsonwebtoken");
const roles = require('../enum/roles');
const { StatusCode } = require('status-code-enum');

const Product = require('../models/product');

module.exports = async function (req, res) {
    if (req.body) {

        const token = req.body.jwt;
        if (token) {

            const data = { ...req.body };

            try {
                const jwt_data = jwt.verify(token, process.env.TOKEN_SECRET);
                const user = jwt_data.user;

                if (user.role !== roles.ADMIN) {
                    res.status(StatusCode.ClientErrorUnauthorized).json();
                    return;
                }

                const new_product = await Product.create({
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    img: data.img,
                })

                
                if (new_product) {
                    res.status(StatusCode.SuccessCreated).json();
                } else {
                    res.status(StatusCode.ClientErrorBadRequest).json();
                }

                return;

            } catch (_err) {
                console.log(`Wrong JWS token on add_product: ${token}`);
            }
        }
    }

    res.status(StatusCode.ClientErrorBadRequest).json();
}