'use strict'

const signup = require('./handlers/singup')
const authorize = require('./handlers/authorize')


module.exports = function (app, opts) {
    app.post('/signup', signup)
    app.post('/authorize', authorize)
}
