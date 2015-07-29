import assert  from 'assert';
import unirest from 'unirest';

function q (obj) {
    return encodeURIComponent(JSON.stringify(obj));
}

describe('Searching', () => {
    describe('Correct search query', () => {
        it('should search correctly', done => {
            let search = {
                field: 'name',
                startsWith: 'Ice Tea'
            };

            let or = {
                field: 'name',
                eq: 'Mars'
            };

            let or2 = {
                field: 'name',
                eq: 'Mars'
            };

            unirest.get('http://localhost:3006/articles/search?q=' + q(search) + '&or[]=' + q(or) + '&or[]=' + q(or2))
                .type('json')
                .end(response => {
                    assert.equal(200, response.code);
                    assert.equal(3, response.body.length);
                    let reg = /^Ice Tea/;
                    response.body.forEach(article => {
                        assert.equal(true, reg.test(article.name) || article.name === 'Mars');
                    });
                    done();
                });
        });

        it('should support limit, embed, etc.', done => {
            let search = {
                field: 'name',
                startsWith: 'Ice Tea'
            };

            let or = {
                field: 'name',
                eq: 'Mars'
            };

            let or2 = {
                field: 'name',
                eq: 'Mars'
            };

            unirest.get('http://localhost:3006/articles/search?q=' + q(search) + '&or[]=' + q(or) + '&or[]=' + q(or2) + '&limit=1')
                .type('json')
                .end(response => {
                    assert.equal(200, response.code);
                    assert.equal(1, response.body.length);
                    let reg = /^Ice Tea/;
                    response.body.forEach(article => {
                        assert.equal(true, reg.test(article.name) || article.name === 'Mars');
                    });
                    done();
                });
        });
    });

    describe('Incorrect search query', () => {
        it('should refuse when no condition is specified', done => {
            let search = {
                field: 'name',
                equals: 'Mars'
            };

            unirest.get('http://localhost:3006/articles/search?q=' + q(search))
                .type('json')
                .end(response => {
                    assert.equal(400, response.code);
                    done();
                });
        });

        it('should refuse when no field is specified', done => {
            let search = {
                eq: 'Mars'
            };

            unirest.get('http://localhost:3006/articles/search?q=' + q(search))
                .type('json')
                .end(response => {
                    assert.equal(400, response.code);
                    done();
                });
        });
    });
});
