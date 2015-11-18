import assert from 'assert';
import jwt    from 'jsonwebtoken';

/* global unirest */

// Prepare global token (passed to other tests)
process.env.TOKEN = '';

describe('Login', function () {
    it('should refuse requests before auth', done => {
        unirest.post('https://localhost:3006/articles')
            .type('json')
            .send([])
            .end(response => {
                assert.equal(401, response.code);
                done();
            });
    });

    it('should login with mail', done => {
        unirest.post('https://localhost:3006/services/login')
            .type('json')
            .send({
                meanOfLogin: 'etuMail',
                data       : 'buck@utt.fr',
                password   : 'buckutt'
            })
            .end(response => {
                assert.equal(200, response.code);
                assert.equal(true, response.body.hasOwnProperty('user'));

                let user  = response.body.user;
                let token = response.body.token;

                assert.equal('string', typeof user.id);
                assert.equal('string', typeof token);

                // Set token globally
                process.env.TOKEN = token;

                let rightsDecoded = jwt.decode(token);

                assert.notEqual(null, rightsDecoded);

                done();
            });
    });

    it('should login with another mean of login', done => {
        unirest.post('https://localhost:3006/services/login')
            .type('json')
            .send({
                meanOfLogin: 'etuId',
                data       : '22000000353423',
                password   : 'buckutt'
            })
            .end(response => {
                assert.equal(200, response.code);
                assert.equal(true, response.body.hasOwnProperty('user'));

                let user  = response.body.user;
                let token = response.body.token;

                assert.equal('string', typeof user.id);
                assert.equal('string', typeof token);

                let rightsDecoded = jwt.decode(token);

                assert.notEqual(null, rightsDecoded);

                done();
            });
    });

    it('should login with pin', done => {
        unirest.post('https://localhost:3006/services/login')
            .type('json')
            .send({
                meanOfLogin: 'etuId',
                data       : '22000000353423',
                pin        : 1234
            })
            .end(response => {
                assert.equal(200, response.code);
                assert.equal(true, response.body.hasOwnProperty('user'));

                let user  = response.body.user;
                let token = response.body.token;

                assert.equal('string', typeof user.id);
                assert.equal('string', typeof token);

                let rightsDecoded = jwt.decode(token);

                assert.notEqual(null, rightsDecoded);

                done();
            });
    });

    it('should not log a non-existant user', done => {
        unirest.post('https://localhost:3006/services/login')
            .type('json')
            .send({
                meanOfLogin: 'etuId',
                data       : 35427,
                pin        : 1234
            })
            .end(response => {
                assert.equal(404, response.code);

                done();
            });
    });

    it('should not log a user with wrong password', done => {
        unirest.post('https://localhost:3006/services/login')
            .type('json')
            .send({
                meanOfLogin: 'etuId',
                data       : 35427,
                pin        : 1258
            })
            .end(response => {
                assert.equal(404, response.code);

                done();
            });
    });
});
