import APIError    from '../APIError';
import idParser    from '../lib/idParser';
import modelParser from '../lib/modelParser';
import { pp }      from '../lib/utils';
import logger      from '../log';
import thinky      from '../thinky';
import express     from 'express';

let log = logger(module);

/**
 * Read submodel controller. Handles reading the children of one element (based on a relation).
 * @param {Application} app Express main application
 */
export default app => {
    let router = new express.Router();

    router.get('/:model/:id/:submodel', (req, res, next) => {
        let submodel = req.params.submodel;

        if (!req.model._joins.hasOwnProperty(submodel)) {
            return next(new APIError(404, 'Document not found', 'Submodel ' + submodel + ' does not exists'));
        }

        let embed = {};
        // If embed on the submodel, do something like { submodel: whatever he wants }
        // Else just the submodel, so { submodel: true }
        if (req.query.embed) {
            embed[submodel] = req.query.embed;
        } else {
            embed[submodel] = true;
        }

        let queryLog = `${req.model}.get(${req.params.id}).getJoin(${pp(embed)}).run()`;
        log.info(queryLog);

        req.model
            .get(req.params.id)
            .getJoin(embed)
            .run()
            .then(instance =>
                res
                    .status(200)
                    .json(instance[submodel])
                    .end()
            )
            .catch(thinky.Errors.DocumentNotFound, err =>
                next(new APIError(404, 'Document not found', err))
            )
            .catch(err =>
                next(new APIError(500, 'Unknown error', err))
            );
    });

    router.param('model', modelParser);
    router.param('id', idParser);

    app.use(router);
};
