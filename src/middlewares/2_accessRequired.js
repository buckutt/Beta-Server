import APIError from '../APIError';

const disableAuth = false;

/**
 * Check for the current user wether he can do what he wants
 * @param {Request}  req  Express request
 * @param {Response} res  Express response
 * @param {Function} next Next middleware
 */
export default (req, res, next) => {
    let authorize = req.app.locals.config.rightsManagement;

    if (disableAuth) {
        return next();
    }

    if (req.url === '/services/login') {
        return next();
    }

    let rights = req.user.rights || [];
    let url    = req.path;
    let method = req.method;

    let handled = false;

    rights.forEach(right => {
        // Admin/Treasurer : he does whatever he wants
        if (authorize.all.indexOf(right.name) > -1) {
            handled = true;

            return next();
        }

        const uuid = /[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;

        if (uuid.test(url)) {
            url = url.slice(0, -37);
        }

        // Get : check for read authorizations
        // Post/Put/Delete : check for write authorizations
        if (method.toLowerCase() === 'get' && authorize[right.name].read.indexOf(url) > -1) {
            handled = true;

            return next();
        } else if (authorize[right.name].write.indexOf(url) > -1) {
            handled = true;

            return next();
        }
    });

    if (!handled) {
        return next(new APIError(401, 'Unauthorized'));
    }
};
