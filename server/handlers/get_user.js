'use strict';
const jwt = require("jsonwebtoken");
const { StatusCode } = require('status-code-enum')

module.exports = async function (req, res) {
    if (req.body) {

        const token = req.body.jwt;

        if (token) {
            try {
                return res.json(jwt.verify(token, process.env.TOKEN_SECRET));
            } catch (error) {
                console.log(`Wrong JWT token on get_user: ${token}`);
            }
        }
    }
    
    return res.status(StatusCode.ClientErrorBadRequest).json();
}