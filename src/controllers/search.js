import APIError    from '../APIError';
import logger      from '../log';
import modelParser from '../lib/modelParser';
import thinky      from '../thinky';
import { pp }      from '../lib/utils';
import express     from 'express';
import qs          from 'qs';
import url         from 'url';

let log = logger(module);
let r   = thinky.r;

/**
 * Converts a JSON object to a RethinkDB call
 * @param  {Object}   obj The RethinkDB model
 * @param  {Function} onFail Called if any search object is malformed
 * @return {Object[]} The AST generated by RethinkDB
 */
function objToRethinkDBSearch (obj, onFail) {
    if (!obj.hasOwnProperty('field')) {
        onFail();

        return [null, null];
    }

    if (!(obj.hasOwnProperty('startsWith') || obj.hasOwnProperty('endsWith') || obj.hasOwnProperty('matches') ||
        obj.hasOwnProperty('gt') || obj.hasOwnProperty('ne') || obj.hasOwnProperty('lt') ||
        obj.hasOwnProperty('ge') || obj.hasOwnProperty('le') || obj.hasOwnProperty('eq'))) {
        onFail();

        return [null, null];
    }

    let rethinkSearch = r.row(obj.field.toString());
    let log           = `r.row("${obj.field.toString()}")`;

    if (obj.hasOwnProperty('startsWith')) {
        rethinkSearch = rethinkSearch.match('^' + obj.startsWith.toString());
        log += `.match("^${obj.startsWith.toString()}")`;
    }

    if (obj.hasOwnProperty('endsWith')) {
        rethinkSearch = rethinkSearch.match(obj.endsWith.toString() + '$');
        log += `.match("${obj.endsWith.toString()}$")`;
    }

    if (obj.hasOwnProperty('matches')) {
        rethinkSearch = rethinkSearch.math(obj.matches.toString());
        log += `.match("${obj.matches.toString()}")`;
    }

    if (obj.hasOwnProperty('gt')) {
        rethinkSearch = rethinkSearch.gt(obj.gt);
        log += `.gt("${obj.gt}")`;
    }

    if (obj.hasOwnProperty('ne')) {
        rethinkSearch = rethinkSearch.ne(obj.ne);
        log += `.ne("${obj.ne}")`;
    }

    if (obj.hasOwnProperty('lt')) {
        rethinkSearch = rethinkSearch.lt(obj.lt);
        log += `.lt("${obj.lt}")`;
    }

    if (obj.hasOwnProperty('ge')) {
        rethinkSearch = rethinkSearch.ge(obj.ge);
        log += `.ge("${obj.ge}")`;
    }

    if (obj.hasOwnProperty('le')) {
        rethinkSearch = rethinkSearch.le(obj.le);
        log += `.le("${obj.le}")`;
    }

    if (obj.hasOwnProperty('eq')) {
        rethinkSearch = rethinkSearch.eq(obj.eq);
        log += `.eq("${obj.eq}")`;
    }

    return [log, rethinkSearch];
}

/**
 * Matches an array of search objects to a filter using « and » operator
 * @param  {Object[]} array  The search object
 * @param  {Function} onFail Called if any search object is malformed
 * @return {Object[]} The AST generated by RethinkDB
 */
function arrayToRethinkFilters (array, onFail) {
    let rethinkSearch = r;
    let log           = '';
    array.forEach((searchObj, i) => {
        // First call, do not call and
        let [subLog, subSearch] = objToRethinkDBSearch(searchObj, onFail);

        if (subSearch === null) {
            return [null, null];
        }

        if (i !== 0) {
            rethinkSearch = rethinkSearch.and(subSearch);
            subLog = `.and(${subLog})`;
        } else {
            rethinkSearch = subSearch;
        }

        log += subLog;
    });

    return [log, rethinkSearch];
}

/**
 * Match an array of array of search objects to a filter using « or » operator
 * @param  {Object[][]} array  The search object
 * @param  {Function}   onFail Called if any search object is malformed
 * @return {Object[]} The AST generated by RethinkDB
 */
function arrayOfArrayToRethinkFilters (array, onFail) {
    let rethinkSearch = r;
    let log           = '';
    array.forEach((searchObj, i) => {
        // First call, do not call or
        let [subLog, subSearch] = arrayToRethinkFilters(searchObj, onFail);

        if (subSearch === null) {
            return [null, null];
        }

        if (i !== 0) {
            rethinkSearch = rethinkSearch.or(subSearch);
            subLog = `.or(${subLog})`;
        } else {
            rethinkSearch = subSearch;
        }

        log += subLog;
    });

    return [log, rethinkSearch];
}

/**
 * Search among all documents of a model.
 * @param {Application} app Express main application
 */
export default app => {
    let router = new express.Router();

    router.get('/:model/search', (req, res, next) => {
        // Support encoded JSON (express doesn't)
        let searchQuery = JSON.parse(qs.parse(url.parse(req.url).query).q);

        if (!searchQuery) {
            return next(new APIError(400, 'Missing q paramter'));
        }

        if (!Array.isArray(searchQuery)) {
            searchQuery = [searchQuery];
        }

        let orQuery     = qs.parse(url.parse(req.url).query).or || [];
        orQuery = orQuery.map(orItem => [JSON.parse(orItem)]);

        searchQuery = [searchQuery];
        searchQuery.push(...orQuery);

        let queryLog = `${req.model}.filter(`;

        // Must use a boolean variable because we want to stop the request if failed
        let failed = false;

        let [logFilter, filterResult] = arrayOfArrayToRethinkFilters(searchQuery, () => {
            failed = true;
        });

        queryLog += logFilter;

        if (failed) {
            return next(new APIError(400, 'Invalid search object'));
        }

        let request = req.model
            .filter(filterResult);

        queryLog += ')';

        // Order
        if (req.query.orderBy) {
            if (req.query.sort === 'asc') {
                // Order ASC
                queryLog += `.orderBy({ index: r.asc(${req.query.orderBy}) })`;
                request = request.orderBy({
                    index: r.asc(req.query.orderBy)
                });
            } else if (req.query.sort === 'dsc') {
                // Order DSC
                queryLog += `.orderBy({ index: r.desc(${req.query.orderBy})})`;
                request = request.orderBy({
                    index: r.desc(req.query.orderBy)
                });
            } else {
                // Order Default
                queryLog += `.orderBy({ index: ${req.query.orderBy} })`;
                request = request.orderBy({
                    index: req.query.orderBy
                });
            }
        }

        // Limit
        if (req.query.limit) {
            queryLog += `.limit(${req.query.limit})`;
            request = request.limit(req.query.limit);
        }

        // Skip/Offset
        if (req.query.offset) {
            queryLog += `.skip(${req.query.offset})`;
            request = request.skip(req.query.offset);
        }

        // Embed multiple relatives
        if (req.query.embed) {
            queryLog += `.getJoin(${pp(req.query.embed)})`;
            request = request.getJoin(req.query.embed);
        }

        log.info(queryLog);

        request
            .run()
            .then(result => {
                res
                    .status(200)
                    .json(result)
                    .end();
            })
            .catch(thinky.Errors.DocumentNotFound, err =>
                next(new APIError(404, 'Document not found', err))
            )
            .catch(err =>
                next(new APIError(500, 'Unknown error', err))
            );
    });

    router.param('model', modelParser);

    app.use(router);
};
