'use strict';
const jwt = require("jsonwebtoken");
const { StatusCode } = require('status-code-enum')

const User = require('../models/user');


function generateJWT(data) {
    return jwt.sign(data, process.env.TOKEN_SECRET);
}

module.exports = async function (req, res) {
    if (!req.body) {
        res.status(StatusCode.ClientErrorBadRequest).json();
        return;
    }

    const login = req.body.login;
    const password = req.body.password;

    if (login && password) {
        const user = await User.findOne({ where: { login, password } });

        if (user !== null) {
            res.json({ "jwt": generateJWT({user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.first_name,
                    login: user.login,
                    password: user.password,
                    role: user.role,
                }}) 
            });
            return;
        }
    }

    res.status(StatusCode.ClientErrorUnauthorized).json();
}