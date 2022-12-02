'use strict';
const jwt = require("jsonwebtoken");
const { StatusCode } = require('status-code-enum')

function generateJWT(data) {
    return jwt.sign(data, process.env.TOKEN_SECRET);
}


module.exports = async function (req, res) {
    if (!req.body) {
        res.status(StatusCode.ClientErrorBadRequest).json();
        return;
    }

    const token = req.body.jwt;

    if (token) {
        try {
            jwt.verify(token, process.env.TOKEN_SECRET)
            res.status(StatusCode.SuccessOK).json();
            return;
        } catch (error) {
            console.log(`Wrong JWS token on verify_token: ${token}`);
        }
    }

    res.status(StatusCode.ClientErrorUnauthorized).json();
}