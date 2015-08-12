import APIError        from '../APIError';
import logger          from '../log';
import thinky          from '../thinky';
import express         from 'express';
import Promise         from 'bluebird';

let log = logger(module);

export default app => {
    let models = app.models;
    let router = express.Router();

    router.post('/services/login', (req, res, next) => {
        if (!req.body.meanOfLogin) {
            return next(new APIError(401, 'No meanOfLogin provided'));
        }

        if (!req.body.password || !req.body.pin) {
            return next(new APIError(401, 'No password nor pin provided'));
        }

        if (req.body.password  && req.body.pin) {
            return next(new APIError(401, 'Password and pin provided'));
        }

        let user;

        models.MeanOfLogin.get(req.body.meanOfLogin)
            .getAll({ user: true })
            .then(mol => {
                user = mol.user;
                return bcrypt.compareAsync(req.body.password, mol.user.password);
            })
            .then(passwordsMatch => {
                if (passwordsMatch) {
                    let secret       = app.locals.config.secret;
                    let tokenOptions = { expiresInMinutes: 1440 };
                    // req.session = jwt.encode(user);
                } else {
                    return next(new APIError(401, 'Wrong password'));
                }
            })
            .catch(thinky.Errors.DocumentNotFound, err => {
                return next(new APIError(404, 'User not found', err));
            })
    });
};
