'use strict';
const jwt = require("jsonwebtoken");

module.exports = function (user) {
    return jwt.sign({user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.first_name,
        login: user.login,
        password: user.password,
        role: user.role,
    }}, process.env.TOKEN_SECRET);
}