import APIError    from '../APIError';
import modelParser from '../lib/modelParser';
import idParser    from '../lib/idParser';
import thinky      from '../thinky';
import logger      from '../log';
import express     from 'express';

let log = logger(module);

/**
 * Update controller. Handles updating one element.
 * @param {Application} app Express main application
 */
export default app => {
    let router = new express.Router();

    router.put('/:model/:id', (req, res, next) => {
        let queryLog = `${req.model}.get(${req.params.id})`;
        log.info(queryLog);
        // First, get the model
        req.model
            .get(req.params.id)
            .run()
            .then(inst => {
                // Update based on body values
                Object.keys(req.body).forEach(k => {
                    inst[k] = req.body[k];
                });

                log.info(`${req.params.id}.saveAll()`);
                // Save all (including relatives)
                return inst.save();
            })
            .then(result =>
                res
                    .status(200)
                    .json(result)
                    .end()
            )
            .catch(thinky.Errors.DocumentNotFound, err =>
                next(new APIError(404, 'Document not found', err))
            )
            .catch(thinky.Errors.ValidationError, err =>
                next(new APIError(400, 'Invalid model', err))
            )
            .catch(thinky.Errors.InvalidWrite, err =>
                next(new APIError(500, 'Couldn\'t write to disk', err))
            )
            .catch(err =>
                next(new APIError(500, 'Unknown error', err))
            );
    });

    router.param('model', modelParser);
    router.param('id', idParser);

    app.use(router);
};
