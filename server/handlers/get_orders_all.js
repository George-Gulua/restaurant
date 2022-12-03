'use strict';
const jwt = require("jsonwebtoken");
const roles = require('../enum/roles');
const { StatusCode } = require('status-code-enum');

const Order = require('../models/order');

module.exports = async function (req, res) {
    if (!req.body) {
        res.status(StatusCode.ClientErrorBadRequest).json();
        return;
    }

    const token = req.body.jwt;

    if (token) {
        try {
            const jwt_data = jwt.verify(token, process.env.TOKEN_SECRET);
            const user = jwt_data.user;

            if (user.role !== roles.ADMIN) {
                res.status(StatusCode.ClientErrorForbidden).json();
                return;
            }

            res.status(StatusCode.SuccessOK).json(await Order.findAll());
            return;
        } catch (error) {
            console.log(`Wrong JWS token on get_orders_all: ${token}`);
        }
    }

    res.status(StatusCode.ClientErrorUnauthorized).json();
}