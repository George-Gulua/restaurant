'use strict';
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

            const order_id = req.body.order_id;

            try {
                await Order.destroy({where : {
                    id: order_id
                }});
                res.status(StatusCode.SuccessOK).json();
            } catch (_err) {
                console.log(`Cannot remove order with id: ${order_id}`);
                res.status(StatusCode.ClientErrorBadRequest).json();
            }

            return;

        } catch (error) {
            console.log(`Wrong JWS token on remove_order: ${token}`);
        }
    }

    res.status(StatusCode.ClientErrorUnauthorized).json();
}