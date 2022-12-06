'use strict';
const jwt = require("jsonwebtoken");
const { StatusCode } = require('status-code-enum')
const generateJWT = require('../utils/generate_jwt');

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
                where: {...jwt_data.user},
            });

            if (user === null) {
                return res.status(StatusCode.ClientErrorConflict).json();
            }

            try {
                await user.update({passowrd: req.body.new_password});
                return res.status(StatusCode.SuccessOK).json({ jwt: generateJWT(user) });
            } catch (err) {
                console.log(err);
                return res.status(StatusCode.ServerErrorInternal).json();
            }

            
        } catch (error) {
            console.log(`Wrong JWT token on verify_token: ${token}`);
        }
    }

    return res.status(StatusCode.ClientErrorUnauthorized).json();
}