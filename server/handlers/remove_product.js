'use strict';
const jwt = require("jsonwebtoken");
const roles = require('../enum/roles');
const { StatusCode } = require('status-code-enum');

const Product = require('../models/Product');

module.exports = async function (req, res) {
    if (!req.body) {
        return res.status(StatusCode.ClientErrorBadRequest).json();
    }

    const token = req.body.jwt;

    if (token) {
        try {
            const jwt_data = jwt.verify(token, process.env.TOKEN_SECRET);
            const user = jwt_data.user;

            if (user.role !== roles.ADMIN) {
                return res.status(StatusCode.ClientErrorForbidden).json();
            }

            const product_id = req.body.product_id;

            try {
                await Product.destroy({where : {
                    id: product_id
                }});
                return res.status(StatusCode.SuccessOK).json();
            } catch (_err) {
                console.log(`Cannot remove product with id: ${product_id}`);
                return res.status(StatusCode.ClientErrorBadRequest).json();
            }
        } catch (error) {
            console.log(`Wrong JWT token on remove_product: ${token}`);
        }
    }

    return res.status(StatusCode.ClientErrorUnauthorized).json();
}