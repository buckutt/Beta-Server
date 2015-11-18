import assert from 'assert';

/* global unirest */

/**
 * Automatically adds bearer
 * @param  {String[]} methods Methods
 */
function automaticHeader (methods) {
    methods.forEach(method => {
        let previous_ = unirest[method];
        unirest[method] = (...args) => {
            return previous_(...args)
                .header('Authorization', `Bearer ${process.env.TOKEN}`);
        };
    });
}
automaticHeader(['get', 'post', 'put', 'delete']);

/**
 * Encodes a search string
 * @param  {Object} obj A search object
 * @return {String} The URL compatible search
 */
function q (obj) {
    return encodeURIComponent(JSON.stringify(obj));
}

describe('Searching', () => {
    describe('Correct search query', () => {
        it('should search correctly', done => {
            const search = {
                field     : 'name',
                startsWith: 'Ice Tea'
            };

            const or = {
                field: 'name',
                eq   : 'Mars'
            };

            const or2 = {
                field: 'name',
                eq   : 'Mars'
            };

            unirest.get(`https://localhost:3006/articles/search?q=${q(search)}&or[]=${q(or)}&or[]=${q(or2)}`)
                .type('json')
                .end(response => {
                    assert.equal(200, response.code);
                    const reg = /^Ice Tea/;
                    response.body.forEach(article => {
                        assert.equal(true, reg.test(article.name) || article.name === 'Mars');
                    });
                    done();
                });
        });

        it('should support limit, embed, etc.', done => {
            const search = {
                field     : 'name',
                startsWith: 'Ice Tea'
            };

            const or = {
                field: 'name',
                eq   : 'Mars'
            };

            const or2 = {
                field: 'name',
                eq   : 'Mars'
            };

            unirest.get(`https://localhost:3006/articles/search?q=${q(search)}&or[]=${q(or)}&or[]=${q(or2)}&limit=1`)
                .type('json')
                .end(response => {
                    assert.equal(200, response.code);
                    const reg = /^Ice Tea/;
                    response.body.forEach(article => {
                        assert.equal(true, reg.test(article.name) || article.name === 'Mars');
                    });
                    done();
                });
        });
    });

    describe('Incorrect search query', () => {
        it('should refuse when no condition is specified', done => {
            const search = {
                field : 'name',
                equals: 'Mars'
            };

            unirest.get(`https://localhost:3006/articles/search?q=${q(search)}`)
                .type('json')
                .end(response => {
                    assert.equal(400, response.code);
                    done();
                });
        });

        it('should refuse when no field is specified', done => {
            const search = {
                eq: 'Mars'
            };

            unirest.get(`https://localhost:3006/articles/search?q=${q(search)}`)
                .type('json')
                .end(response => {
                    assert.equal(400, response.code);
                    done();
                });
        });
    });
});
