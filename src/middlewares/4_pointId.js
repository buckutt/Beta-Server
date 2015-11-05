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
        .getJoin({
            points: true
        })
        .run()
        .then(devices => {
            req.pointId = devices[0].points[0].id;

            res.header('point', req.pointId);
            res.header('device', devices[0].id);

            return next();
        });
};
