import APIError        from '../APIError';
import modelParser     from '../lib/modelParser';
import relationsHelper from '../lib/relationsHelper';
import { pp }          from '../lib/utils';
import thinky          from '../thinky';
import logger          from '../log';
import express         from 'express';
import Promise         from 'bluebird';

let log = logger(module);

/**
 * Create controller. Handles creating one element, or multiple.
 * @param {Application} app Express main application
 */
export default app => {
    let router = new express.Router();

    router.post('/:model/', (req, res, next) => {
        let insts;
        let queryLog = '';

        console.log('BBBBBBBBBBBBBBBBBB');

        if (Array.isArray(req.body)) {
            // Multiple instances
            queryLog += '[';
            insts = req.body.map(data => {
                let [instData, leftKeysExtracted] = relationsHelper.sanitize(req.model, data);
                let newInst = new req.model(instData);
                relationsHelper.restore(newInst, leftKeysExtracted);

                return newInst;
            });
            queryLog += req.body.map(data => pp(data)).join(',');
            queryLog += ']';
        } else {
            // Only one instance
            queryLog += pp(req.body);
            let [data, leftKeysExtracted] = relationsHelper.sanitize(req.model, req.body);
            let newInst = new req.model(data);
            relationsHelper.restore(newInst, leftKeysExtracted);
            insts = [newInst];
        }

        let allDone;

        if (req.query.embed) {
            allDone = insts.map(inst => inst.saveAll(req.query.embed));
            queryLog += `.saveAll(${pp(req.query.embed)}) (length: ${allDone.length})`;
        } else {
            allDone = insts.map(inst => inst.save());
            queryLog += `.save() (length: ${allDone.length})`;
        }

        log.info(queryLog);
        Promise.all(allDone)
            .then(results => {
                // Retrieve the element anyway (to ensure n:n relations are present)
                // See https://github.com/neumino/thinky/issues/291#issuecomment-125024658

                // Use only ids
                results = results.map(instance => instance.id);

                // Get all ideas and the embed wanted
                return req.model.getAll(...results).getJoin(req.query.embed).run();
            })
            .then(results => {
                if (results.length === 1) {
                    results = results[0];
                }

                res
                    .status(200)
                    .json(results)
                    .end();
            })
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

    app.use(router);
};
