'use strict'
const authorize = require('./handlers/authorize')

module.exports = function (app, opts) {
    app.post('/authorize', authorize)
}
