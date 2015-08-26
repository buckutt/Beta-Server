import Promise  from 'bluebird';
import jwt      from 'jsonwebtoken';
import APIError from '../APIError';
import config   from '../config';

Promise.promisifyAll(jwt);

const disableAuth = true;

/**
 * Parses the client token
 * @param {Request}  req  Express request
 * @param {Response} res  Express response
 * @param {Function} next Next middleware
 */
export default (req, res, next) => {
    if (disableAuth) {
        return next();
    }

    let secret = config.secret;

    // Login : no token required
    if (req.url === '/api/services/login') {
        return next();
    }

    // Config is invalid
    if (!secret) {
        throw new Error('config.secret must be set');
    }

    // Missing header
    if (!(req.headers && req.headers.authorization)) {
        return next(new APIError(400, 'No token or scheme provided. Header format is Authorization: Bearer [token]'));
    }

    let parts = req.headers.authorization.split(' ');
    // Invalid format (`Bearer Token`)
    if (parts.length !== 2) {
        return next(new APIError(400, 'No token or scheme provided. Header format is Authorization: Bearer [token]'));
    }

    let scheme = parts[0];
    let token  = parts[1];
    // Invalid format (`Bearer Token`)
    if (scheme.toLowerCase() !== 'bearer') {
        return next(new APIError(400, 'Scheme is `Bearer`. Header format is Authorization: Bearer [token]'));
    }

    jwt
        .verifyAsync(token, secret)
        .then(decoded => {
            req.user = decoded;

            return next();
        })
        .catch(err =>
            next(new APIError(401, 'Invalid token', err))
        );
};
