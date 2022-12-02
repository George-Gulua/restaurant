'use strict';

const cors = require("cors");
const pino = require("pino");
const dotenv = require("dotenv");
const express = require("express");
const pinoHttp = require("pino-http");

const sync = require('./database/sync');

module.exports = function main(options, cb) {
    // Set default options
    const ready = cb || function () {};
    const opts = Object.assign(
        {
            // Default options
        },
        options
    );

    const app = express();

    // Common middleware
    app.use(cors());
    app.use(express.json());

    const logger = pino();
    app.use(pinoHttp({ logger }));

    // Register routes
    // @NOTE: require here because this ensures that even syntax errors
    // or other startup related errors are caught logged and debuggable.
    // Alternativly, you could setup external log handling for startup
    // errors and handle them outside the node process.  I find this is
    // better because it works out of the box even in local development.
    require("./routes")(app, opts);

    // Start server
    let server;
    server = app.listen(opts.port, opts.host, function (err) {
        if (err) {
            return ready(err, app, server);
        }

        dotenv.config();
        // sync();

        const addr = server.address();
        logger.info(
            `Started at ${opts.host || addr.host || "localhost"}:${addr.port}`
        );
        ready(err, app, server);
    });
};

