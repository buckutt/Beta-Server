import APIError from '../APIError';

const disableAuth = true;

let authorize = {
    all: ['admin', 'seller'],
    seller: {
        read: [
            '/api/articles',
            '/api/articleslinks',
            '/api/users',
            '/api/usersrights',
            '/api/usersgroups',
            '/api/devicespoints',
            '/api/devices',
            '/api/meanofloginsusers',
            '/api/services/availableArticles'
        ],
        write: [
            '/api/services/purchase'
        ]
    },
    reloader: {
        read: [
            '/api/users',
            '/api/usersrights',
            '/api/usersgroups',
            '/api/devicespoints',
            '/api/devices',
            '/api/reloadtypes',
            '/api/meanofloginsusers'
        ],
        write: [
            '/api/services/reload'
        ]
    }
};

/**
 * Check for the current user wether he can do what he wants
 * @param {Request}  req  Express request
 * @param {Response} res  Express response
 * @param {Function} next Next middleware
 */
export default (req, res, next) => {
    if (disableAuth) { return next(); }

    if (req.url === '/api/services/login') {
        return next();
    }

    let rights = req.user.rights || [];
    let url    = req.path;
    let method = req.method;
    let now    = Date.now();

    rights.forEach(right => {
        // The right is still valid
        if (Date.parse(right.end) > now) {
            // Admin/Treasurer : he does whatever he wants
            if (authorize.all.indexOf(right.name) > -1) {
                return next();
            }

            // Get : check for read authorizations
            // Post/Put/Delete : check for write authorizations
            if (method === 'get' && authorize[right.name].read.indexOf(url) > -1) {
                return next();
            } else if (authorize[right.name].write.indexOf(url) > -1) {
                return next();
            }
        }
    });

    return next(new APIError(401, 'Unauthorized'));
};
