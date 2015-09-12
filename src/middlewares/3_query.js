// Return the parsed query parameter from the raw one
const queryRules = {
    limit  : limit  => parseInt(limit, 10),
    offset : offset => parseInt(offset, 10),
    orderBy: order  => order,
    sort   : sort   => sort,
    count  : ()     => true,
    embed  : embed  => {
        if (embed.length === 0) {
            return undefined;
        }

        // ?embed=modelA:modelB:modelC,modelC,modelD
        // Should generate
        // {
        //  modelA: {
        //   modelB: true,
        //   modelC: true
        //  },
        //  modelC: true,
        //  modelD: true
        // }
        let joinObj = {};
        embed
            .split(',')
            .map(model => model.split(':'))
            .forEach(model => {
                if (model.length === 1) {
                    // One element : no submodel
                    joinObj[model[0]] = true;
                } else {
                    // Multiple elements : first is model, nexts are submodels
                    joinObj[model[0]] = {};
                    model.slice(1).forEach(subModel => {
                        joinObj[model[0]][subModel] = true;
                    });
                }
            });

        return joinObj;
    }
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
