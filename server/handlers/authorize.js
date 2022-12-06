'use strict';
const generateJWT = require("../utils/generate_jwt");
const { StatusCode } = require('status-code-enum')

const User = require('../models/user');

module.exports = async function (req, res) {
    if (!req.body) {
        return res.status(StatusCode.ClientErrorBadRequest).json();
    }

    const login = req.body.login;
    const password = req.body.password;

    if (login && password) {
        const user = await User.findOne({ where: { login, password } });

        if (user !== null) {
            return res.json({ "jwt": generateJWT(user) });
        }
    }

    return res.status(StatusCode.ClientErrorUnauthorized).json();
}