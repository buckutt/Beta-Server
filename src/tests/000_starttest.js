import app     from '../app';
import fs      from 'fs';
import unirest from 'unirest';

describe('Should start the test application', () => {
    it('should init models', function (done) {
        this.timeout(500 * 1000);

        app.start();

        app.locals.models.onReady = () => {
            done();
        };
    });
});

let certFile = fs.readFileSync('ssl/test/test.crt');
let keyFile  = fs.readFileSync('ssl/test/test.key');
let caFile   = fs.readFileSync('ssl/test/ca.crt');

let options = {
    cert              : certFile,
    key               : keyFile,
    ca                : caFile,
    strictSSL         : false,
    rejectUnauthorized: false
};

unirest.request = unirest.request.defaults(options);

global.unirest = unirest;
global.q       = obj => encodeURIComponent(JSON.stringify(obj));
