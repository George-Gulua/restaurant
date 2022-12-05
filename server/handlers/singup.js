'use strict';
const roles = require('../enum/roles');
const { StatusCode } = require('status-code-enum')

const User = require('../models/user');

module.exports = async function (req, res) {
    if (req.body) {
        const data = { ...req.body };

        if (data.login && data.password) {
            const user = await User.findOne({ where: { "login": data.login } });

            if (user !== null) {
                res.status(StatusCode.ClientErrorBadRequest).json({ "reason": "User already exists"});
                return;
            }

            const new_user = await User.create({
                first_name: data.first_name,
                last_name: data.last_name,
                login: data.login,
                password: data.password,
                role: roles.USER,
            })

            if (new_user) {
                res.status(StatusCode.SuccessCreated).json();
                return;
            }
        }
    }

    res.status(StatusCode.ClientErrorBadRequest).json();
}