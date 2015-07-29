import APIError    from '../APIError';
import modelParser from '../lib/modelParser';
import idParser    from '../lib/idParser';
import { pp }      from '../lib/utils';
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

    router.delete('/:model/:id', (req, res, next) => {
        let queryLog = req.model + '.get(' + req.params.id + ').getJoin(' + req.query.embed + ')';
        log.info(queryLog);
        // First, get the model
        req.model
            .get(req.params.id)
            .getJoin(req.query.embed)
            .run()
            .then(inst => {
                // Then delete

                // If embed parameter is present, deleteAll() instead of delete()
                if (req.query.embed) {
                    log.warn(req.params.id + '.deleteAll(' + pp(req.query.embed) + ')');
                    return inst.deleteAll(req.query.embed);
                }
                return inst.delete();
            })
            .then(() => {
                return res
                    .status(200)
                    .end();
            })
            .catch(thinky.Errors.DocumentNotFound, err => {
                return next(new APIError(404, 'Document not found', err));
            })
            .catch(thinky.Errors.ValidationError, err => {
                return next(new APIError(400, 'Invalid model', err));
            })
            .catch(thinky.Errors.InvalidWrite, err => {
                return next(new APIError(500, 'Couldn\'t write to disk', err));
            })
            .catch(err => {
                return next(new APIError(500, 'Unknown error', err));
            });
    });

    router.param('model', modelParser);
    router.param('id', idParser);

    app.use(router);
};
