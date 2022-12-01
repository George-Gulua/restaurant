'use strict';
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

            User.create({
                first_name: data.first_name,
                last_name: data.last_name,
                login: data.login,
                password: data.password,
                role: "user",
            })
            .then((_user) => res.status(StatusCode.SuccessCreated).json())
            .catch((_reason) => res.status(StatusCode.ClientErrorBadRequest).json())

            return;
        }
    }

    res.status(StatusCode.ClientErrorBadRequest).json();
}