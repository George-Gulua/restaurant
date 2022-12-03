'use strict';
const jwt = require("jsonwebtoken");
const { StatusCode } = require('status-code-enum')

const User = require('../models/user');

module.exports = async function (req, res) {
    if (!req.body) {
        res.status(StatusCode.ClientErrorBadRequest).json();
        return;
    }

    const token = req.body.jwt;

    if (token) {
        try {
            const jwt_data = jwt.verify(token, process.env.TOKEN_SECRET);
            const user = await User.findOne({
                ...jwt_data.user,
            });

            if (user === null) {
                res.status(StatusCode.ClientErrorConflict).json();
                return;
            }

            res.status(StatusCode.SuccessOK).json();
            return;
        } catch (error) {
            console.log(`Wrong JWS token on verify_token: ${token}`);
        }
    }

    res.status(StatusCode.ClientErrorUnauthorized).json();
}