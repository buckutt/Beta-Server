import APIError    from '../APIError';
import idParser    from '../lib/idParser';
import modelParser from '../lib/modelParser';
import { pp }      from '../lib/utils';
import logger      from '../log';
import thinky      from '../thinky';
import express     from 'express';

let r   = thinky.r;
let log = logger(module);

/**
 * Read controller. Handles reading one element, or multiple.
 * @param {Application} app Express main application
 */
export default app => {
    let router = new express.Router();

    router.get('/:model/:id?', (req, res, next) => {
        if (req.params.id) {
            // id === search => next to be used by search controller
            if (req.params.id === 'search') {
                return next();
            }

            let queryLog = req.model + '.get(' + req.params.id + ')';

            let request = req.model
                .get(req.params.id);

            // Embed multiple relatives
            if (req.query.embed) {
                queryLog += '.getJoin( ' + pp(req.query.embed) + ' )';
                request = request.getJoin(req.query.embed);
            }

            queryLog += '.run()';
            log.info(queryLog);
            request
                .run()
                .then(instance => {
                    return res
                        .status(200)
                        .json(instance)
                        .end();
                })
                .catch(thinky.Errors.DocumentNotFound, err => {
                    return next(new APIError(404, 'Document not found', err));
                })
                .catch(err => {
                    return next(new APIError(500, 'Unknown error', err));
                });
        } else {
            // List instances
            let request = req.model;
            let queryLog = req.model;

            // Order
            if (req.query.orderBy) {
                if (req.query.sort === 'asc') {
                    // Order ASC
                    queryLog += '.orderBy({ index: r.asc(' + req.query.orderBy + ') })';
                    request = request.orderBy({
                        index: r.asc(req.query.orderBy)
                    });
                } else if (req.query.sort === 'dsc') {
                    // Order DSC
                    queryLog += '.orderBy({ index: r.desc(' + req.query.orderBy + ')})';
                    request = request.orderBy({
                        index: r.desc(req.query.orderBy)
                    });
                } else {
                    // Order Default
                    queryLog += '.orderBy({ index: ' + req.query.orderBy + ' })';
                    request = request.orderBy({ index: req.query.orderBy });
                }
            }

            // Limit
            if (req.query.limit) {
                queryLog += '.limit(' + req.query.limit + ')';
                request = request.limit(req.query.limit);
            }

            // Skip/Offset
            if (req.query.offset) {
                queryLog += '.skip(' + req.query.offset + ')';
                request = request.skip(req.query.offset);
            }

            // Embed multiple relatives
            if (req.query.embed) {
                queryLog += '.getJoin( ' + pp(req.query.embed) + ' )';
                request = request.getJoin(req.query.embed);
            }

            queryLog += '.run()';
            log.info(queryLog);
            request.run()
                .then(results => {
                    return res
                        .status(200)
                        .json(results)
                        .end();
                })
                .catch(thinky.Errors.DocumentNotFound, err => {
                    return next(new APIError(404, 'Document not found', err));
                })
                .catch(err => {
                    return next(new APIError(500, 'Unknown error', err));
                });
        }
    });

    router.param('model', modelParser);
    router.param('id', idParser);

    app.use(router);
};
