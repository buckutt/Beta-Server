import APIError  from '../APIError';

/**
 * Parses the target odel
 * @param {Request}  req   Express request
 * @param {Response} res   Express Response
 * @param {Function} next  Next middleware
 * @param {String}   model The query value
 */
function modelParser (req, res, next, model) {
    let modelsNames = {
        'articles'     : 'Article',
        'categories'   : 'Category',
        'promotions'   : 'Promotion',
        'devices'      : 'Device',
        'fundations'   : 'Fundation',
        'groups'       : 'Group',
        'meansoflogins': 'MeanOfLogin',
        'periods'      : 'Period',
        'points'       : 'Point',
        'prices'       : 'Price',
        'purchases'    : 'Purchase',
        'reloads'      : 'Reload',
        'reloadTypes'  : 'Reloadtype',
        'rights'       : 'Right',
        'users'        : 'User'
    };

    let possibleValues = Object.keys(modelsNames);
    let index          = possibleValues.indexOf(model);

    if (index === -1) {
        return next(new APIError(404, 'Model not found'));
    }

    req.model = req.app.locals.models[modelsNames[model]];

    return next();
}

export default modelParser;
