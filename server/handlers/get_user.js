'use strict';
const jwt = require("jsonwebtoken");
const { StatusCode } = require('status-code-enum')

module.exports = async function (req, res) {
    if (req.body) {

        const token = req.body.jwt;

        if (token) {
            try {
                res.json(jwt.verify(token, process.env.TOKEN_SECRET));
                return;
            } catch (error) {
                console.log(`Wrong JWS token: ${token}`);
            }
        }
    }

    res.status(StatusCode.ClientErrorBadRequest).json();
}