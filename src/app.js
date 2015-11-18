import fs           from 'fs';
import path         from 'path';
import APIError     from './APIError';
import config       from './config';
import logger       from './log';
import { pp }       from './lib/utils';
import models       from './models';
import bodyParser   from 'body-parser';
import compression  from 'compression';
import consoleTitle from 'console-title';
import cookieParser from 'cookie-parser';
import cors         from 'cors';
import express      from 'express';
import https        from 'https';
import morgan       from 'morgan';

let log = logger(module);

consoleTitle('Buckutt Server **');

let app = express();

app.locals.config = config;
app.locals.models = models;

// Some middlewares
app.use(cors({
    exposedHeaders: ['device', 'point']
}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

// Set application into the request
app.use((req, res, next) => {
    req.app = app;

    if (!req.client.authorized) {
        res
            .status(401)
            .end('Unauthorized : missing client HTTPS certificate');

        return;
    }

    return next();
});

// Application middlewares
let middlewares = fs
    .readdirSync(path.join(config.root, 'middlewares/'))
    .filter(f => f.slice(-3) === '.js')
    .sort()
    .map(f => require(path.join(config.root, 'middlewares/', f)));

middlewares.forEach(middleware => {
    app.use(middleware);
});

// Controllers subrouters
let controllers = fs
    .readdirSync(path.join(config.root, 'controllers/'))
    .filter(f => f.slice(-3) === '.js')
    .sort()
    .map(f => require(path.join(config.root, 'controllers/', f)));

controllers.forEach(controller => {
    controller(app);
});

// Service controllers subrouters
let services = fs
    .readdirSync(path.join(config.root, 'controllers/', 'services/'))
    .filter(f => f.slice(-3) === '.js')
    .sort()
    .map(f => require(path.join(config.root, 'controllers/', 'services/', f)));

services.forEach(service => {
    service(app);
});

// 404 Handling
app.use((req, res, next) => {
    next(new APIError(404, 'Not Found'));
});

// Other errors (req is not used, but four arguments must be detected by express to recognize error middleware)
app.use((err, req, res, next) => { // jshint ignore:line
    if (!(err instanceof APIError)) {
        // Classic errors
        if (err instanceof Error) {
            err = {
                status : 500,
                message: err.message,
                details: err
            };
        } else {
            // Unknown errors
            err = {
                status : 500,
                message: err.toString(),
                details: err
            };
        }
    }

    log.error(err.message);

    if (err.message === 'Unknown error') {
        console.log(pp(err));
    }

    res
        .status(err.status || 500)
        .json(err)
        .end();
});

app.start = () => {
    let key;
    let cert;
    let ca;

    if (process.env.NODE_ENV === 'test') {
        key  = `./ssl/test/server.key`;
        cert = `./ssl/test/server.crt`;
        ca   = `./ssl/test/ca.crt`;
    } else {
        key  = `./ssl/server-key.pem`;
        cert = `./ssl/server-crt.pem`;
        ca   = `./ssl/ca-crt.pem`;
    }

    let server = https.createServer({
        key               : fs.readFileSync(key),
        cert              : fs.readFileSync(cert),
        ca                : fs.readFileSync(ca),
        requestCert       : true,
        rejectUnauthorized: false
    }, app);

    // let server = http.createServer(app);

    server.listen(config.port, () => {
        log.info('Server is listening on port %d', config.port);
        log.warn('Please wait for models to be ready...');
        consoleTitle('Buckutt Server *');
    });
};

// Start the application
if (require.main === module) {
    app.start();
}

export default app;
