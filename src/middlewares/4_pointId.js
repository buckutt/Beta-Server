/**
 * Retrieve the point id from the SSL certificate fingerprint
 * @param {Request}  req  Express request
 * @param {Response} res  Express response
 * @param {Function} next Next middleware
 */
export default (req, res, next) => {
    let fingerprint = req.connection.getPeerCertificate().fingerprint.replace(/:/g, '').trim();

    let Device = req.app.locals.models.Device;

    Device
        .getAll(fingerprint, {
            index: 'fingerprint'
        })
        .run()
        .then(point => {
            req.pointId = point[0].id;

            return next();
        });
};
