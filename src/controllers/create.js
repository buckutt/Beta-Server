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
            insts = [ newInst ];
        }

        /**
         * Hypothèse de départ : new model() avant, setter sur les leftKeys
         * Schéma possible :
         *  1. Récupérer l'objet total
         *  2. Boucler sur les relations
         *  3. Si leftKey dans l'objet total + ?embed
         *  4. Supprimer les clés de l'objet total et les stocker quelque part
         *  5. Créer l'objet (new req.model)
         *  6. Réajouter les ids si existants, ou faire des new req.submodel() avec la data sinon
         *  7. Passer l'objet d'embed à saveAll ou ça marchera pas
         * 1   => done
         * 2-4 => dans un lib/relationHelper.js « extractRelations »
         * 5   => done
         * 6   => dans un lib/relationHelper.js « restoreRelations »
         * 7   => done (middlewares/3_query.js)
         */

        let allDone = insts.map(inst => inst.saveAll(req.query.embed));
        queryLog += '.saveAll(' + pp(req.query.embed) + ') (length: ' + allDone.length + ')';

        log.info(queryLog);
        Promise.all(allDone)
            .then(results => {
                // Get back the element anyway (to ensure n:n relations are present)
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

    app.use(router);
};
