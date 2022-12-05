'use strict';
const jwt = require("jsonwebtoken");
const { StatusCode } = require('status-code-enum')

const User = require('../models/user');

module.exports = async function (req, res) {
    if (!req.body) {
        return res.status(StatusCode.ClientErrorBadRequest).json();
    }

    const token = req.body.jwt;

    if (token) {
        try {
            const jwt_data = jwt.verify(token, process.env.TOKEN_SECRET);
            const user = await User.findOne({
                ...jwt_data.user,
            });

            if (user === null) {
                return res.status(StatusCode.ClientErrorConflict).json();
            }

            return res.status(StatusCode.SuccessOK).json();
        } catch (error) {
            console.log(`Wrong JWS token on verify_token: ${token}`);
        }
    }

    return res.status(StatusCode.ClientErrorUnauthorized).json();
}