// Return the parsed query parameter from the raw one
const queryRules = {
    limit  : limit  => parseInt(limit, 10),
    offset : offset => parseInt(offset, 10),
    orderBy: order  => order,
    sort   : sort   => sort,
    count  : ()     => true,
    embed  : embed  => JSON.parse(decodeURIComponent(embed))
};

/**
 * Parses the query to build the future rethink call
 * @param {Request}  req  Express request
 * @param {Response} res  Express response
 * @param {Function} next Next middleware
 */
export default (req, res, next) => {
    let query = {};

    Object.keys(queryRules).forEach(q => {
        let value = (req.query.hasOwnProperty(q)) ? req.query[q].toString() : undefined;

        if (value === undefined) {
            return;
        }
        query[q] = queryRules[q](value);
    });

    req.query = query;

    return next();
};
