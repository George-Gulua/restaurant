'use strict'

const signup = require('./handlers/singup')
const get_user = require('./handlers/get_user')
const authorize = require('./handlers/authorize')


module.exports = function (app, opts) {
    app.post('/signup', signup);
    app.post('/getUser', get_user);
    app.post('/authorize', authorize);
}
