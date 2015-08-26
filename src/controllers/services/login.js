import APIError from '../../APIError';
import logger   from '../../log';
import thinky   from '../../thinky';
import { pp }   from '../../lib/utils';
import express  from 'express';
import Promise  from 'bluebird';
import jwt      from 'jsonwebtoken';
import bcrypt_  from 'bcryptjs';

const bcrypt = Promise.promisifyAll(bcrypt_);
let log      = logger(module);

export default app => {
    let models = app.models;
    let router = express.Router();

    const pinLoggingAllowed = app.locals.config.pinLoggingAllowed;
    const secret            = app.locals.config.secret;
    const tokenOptions      = {
        expiresInMinutes: 1440
    };

    router.post('/services/login', (req, res, next) => {
        const now = Date.now();

        if (!req.body.meanOfLogin) {
            return next(new APIError(401, 'No meanOfLogin provided'));
        }

        if (!req.body.password || !req.body.pin) {
            return next(new APIError(401, 'No password nor pin provided'));
        }

        if (req.body.password  && req.body.pin) {
            return next(new APIError(401, 'Password and pin provided'));
        }

        let connectType = (req.body.pin && req.body.pin.length > 0) ? 'pin' : 'password';
        let user;

        let queryLog = models.MeanOfLogin + '.get(' + req.body.meanOfLogin + ').getAll(' + pp({
            user: {
                rights: {
                    period: true
                }
            }
        }) + ')';
        log.info(queryLog);

        models.MeanOfLogin.get(req.body.meanOfLogin)
            .getJoin({
                user: {
                    rights: {
                        period: true
                    }
                }
            })
            .then(mol => {
                user = mol.user;

                if (connectType === 'pin') {
                    return bcrypt.compareAsync(req.body.pin, mol.user.pin);
                } else {
                    return bcrypt.compareAsync(req.body.password, mol.user.password);
                }
            })
            .then(match =>
                new Promise((resolve, reject) => {
                    if (match) {
                        resolve();
                    } else {
                        return reject(new APIError(401, 'Wrong password'));
                    }
                })
            )
            .then(() =>
                user.rights
                    .map(right => {
                        // If pin is not allowed with this right, pass
                        if (connectType === 'pin' && pinLoggingAllowed.indexOf(right.name) === -1) {
                            return null;
                        }

                        if (right.period.start <= now && right.period.end > now) {
                            return right;
                        } else {
                            // This right should not be added as it is over
                            return null;
                        }
                    })
                    .filter(right => right !== null)
            )
            .then(newRights =>
                new Promise((resolve, reject) => {
                    if (newRights.length === 0) {
                        return reject(new APIError(401, 'No valid right found'));
                    }

                    resolve(newRights);
                })
            )
            .then(rights => {
                delete user.pin;
                delete user.password;

                return res
                    .status(200)
                    .json({
                        user,
                        token: jwt.sign({
                            rights
                        }, secret, tokenOptions)
                    })
                    .end();
            })
            .catch(APIError, err => next(err))
            .catch(thinky.Errors.DocumentNotFound, err =>
                next(new APIError(404, 'User not found', err))
            );
    });
};
