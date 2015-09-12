import APIError from '../../APIError';
import logger   from '../../log';
import thinky   from '../../thinky';
import { pp }   from '../../lib/utils';
import bcrypt_  from 'bcryptjs';
import express  from 'express';
import jwt      from 'jsonwebtoken';
import Promise  from 'bluebird';

const bcrypt = Promise.promisifyAll(bcrypt_);
let log      = logger(module);

export default app => {
    let models = app.locals.models;
    let router = express.Router();

    const secret            = app.locals.config.secret;
    const tokenOptions      = {
        expiresInMinutes: 1440
    };

    router.post('/services/login', (req, res, next) => {
        if (!req.body.meanOfLogin) {
            return next(new APIError(401, 'No meanOfLogin provided'));
        }

        if (!req.body.data) {
            return next(new APIError(401, 'No (meanOfLogin) data provided'));
        }

        if (!req.body.password && !req.body.pin) {
            return next(new APIError(401, 'No password nor pin provided'));
        }

        if (req.body.password && req.body.pin) {
            return next(new APIError(401, 'Password and pin provided'));
        }

        let connectType = (req.body.hasOwnProperty('pin')) ? 'pin' : 'password';
        let user;

        let queryLog = `${models.MeanOfLogin}
            .filter({
                type: ${req.body.meanOfLogin},
                data: ${req.body.data}
            })
            .limit(1).getJoin(` + pp({
            user: {
                rights: {
                    period: true
                }
            }
        }) + ')';
        log.info(queryLog);

        models.MeanOfLogin
            .filter({
                type: req.body.meanOfLogin,
                data: req.body.data
            })
            .limit(1)
            .getJoin({
                user: {
                    rights: {
                        period: true
                    }
                }
            })
            .then(mol => {
                if (mol.length === 0) {
                    return next(new APIError(404, 'Unknown user'));
                }

                user = mol[0].user;

                if (connectType === 'pin') {
                    return bcrypt.compareAsync(req.body.pin.toString(), user.pin);
                } else {
                    return bcrypt.compareAsync(req.body.password, user.password);
                }
            })
            .then(match =>
                new Promise((resolve, reject) => {
                    if (match) {
                        return resolve();
                    } else {
                        return reject(new APIError(401, 'Wrong password'));
                    }
                })
            )
            .then(() => {
                delete user.pin;
                delete user.password;

                return res
                    .status(200)
                    .json({
                        user,
                        token: jwt.sign({
                            id: user.id,
                            // Will be used by middleware (else how could middleware know if pin or password ?)
                            connectType
                        }, secret, tokenOptions)
                    })
                    .end();
            })
            .catch(APIError, err => next(err))
            .catch(thinky.Errors.DocumentNotFound, err =>
                next(new APIError(404, 'User not found', err))
            );
    });

    app.use(router);
};
