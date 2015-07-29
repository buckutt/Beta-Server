import { clone } from '../lib/utils';
import assert    from 'assert';
import unirest   from 'unirest';

let firstArticle;
let totalArticles;

describe('Read', () => {
    describe('Correct id', () => {
        it('should list correctly the model', done => {
            unirest.get('http://localhost:3006/articles')
                .type('json')
                .end(response => {
                    assert.equal(200, response.code);
                    assert.equal(true, response.body.length > 0);

                    firstArticle  = response.body[0].id;
                    totalArticles = response.body.length;

                    done();
                });
        });

        it('should read correctly one model', done => {
            unirest.get('http://localhost:3006/articles/' + firstArticle)
                .type('json')
                .end(response => {
                    assert.equal(200, response.code);
                    assert.equal('string', typeof response.body.id);

                    done();
                });
        });

        it('should read correctly the model and its relatives with ?embed=modelA,modelB', done => {
            unirest.get('http://localhost:3006/purchases/')
                .type('json')
                .end(response => {
                    unirest.get('http://localhost:3006/purchases/' + response.body[0].id + '/?embed=buyer,seller,articles')
                        .type('json')
                        .end(response => {
                            assert.equal('string', typeof response.body.buyer.id);
                            assert.equal('string', typeof response.body.seller.id);
                            done();
                        });
                });
        });

        it('should support ordering asc', done => {
            unirest.get('http://localhost:3006/articles?orderBy=name&sort=asc')
                .type('json')
                .end(response => {
                    let articles = response.body.map(article => article.name);
                    let otherOne = clone(articles);
                    assert.deepEqual(articles.sort(), otherOne);
                    done();
                });
        });

        it('should support ordering dsc', done => {
            unirest.get('http://localhost:3006/articles?orderBy=name&sort=dsc')
                .type('json')
                .end(response => {
                    let articles = response.body.map(article => article.name);
                    let otherOne = clone(articles);
                    assert.deepEqual(articles.sort(), otherOne.reverse());
                    done();
                });
        });

        it('should support ordering without order', done => {
            unirest.get('http://localhost:3006/articles?orderBy=name')
                .type('json')
                .end(response => {
                    let articles = response.body.map(article => article.name);
                    let otherOne = clone(articles);
                    assert.deepEqual(articles.sort(), otherOne);
                    done();
                });
        });

        it('should support limiting', done => {
            unirest.get('http://localhost:3006/articles?limit=1')
                .type('json')
                .end(response => {
                    assert.equal(1, response.body.length);
                    done();
                });
        });

        it('should support skipping', done => {
            unirest.get('http://localhost:3006/articles?offset=1')
                .type('json')
                .end(response => {
                    assert.equal(totalArticles - 1, response.body.length);
                    done();
                });
        });
    });

    describe('Incorrect id', () => {
        it('should not read if id is non-existant', done => {
            unirest.get('http://localhost:3006/articles/00000000-0000-1000-8000-000000000000')
                .type('json')
                .end(response => {
                    assert.equal(404, response.code);

                    done();
                });
        });

        it('should not read if the id is not a guid', done => {
            unirest.get('http://localhost:3006/articles/foo')
                .type('json')
                .end(response => {
                    assert.equal(400, response.code);

                    done();
                });
        });

        it('should not read if the model does not exists', done => {
            unirest.get('http://localhost:3006/foo/00000000-0000-1000-8000-000000000000')
                .type('json')
                .end(response => {
                    assert.equal(404, response.code);

                    done();
                });
        });
    });
});
