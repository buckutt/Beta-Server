import assert from 'assert';

/* global unirest */

describe('Delete', () => {
    describe('Correct id', () => {
        it('should delete correctly the model', done => {
            unirest.get('https://localhost:3006/articles')
                .type('json')
                .end(response => {
                    let id = response.body[1].id;
                    unirest.delete('https://localhost:3006/articles/' + id + '/')
                        .type('json')
                        .end(response => {
                            assert.equal(200, response.code);

                            // Check if the article was really deleted
                            unirest.get('https://localhost:3006/articles/' + id + '/')
                                .type('json')
                                .end(response => {
                                    assert.equal(404, response.code);

                                    done();
                                });
                        });
                });
        });

        it('should delete correctly the model and its relatives with ?embed=modelA,modelB', done => {
            unirest.get('https://localhost:3006/purchases?embed=promotion')
                .type('json')
                .end(response => {
                    response.body = response.body.filter(purchase => purchase.hasOwnProperty('promotion'));

                    let id          = response.body[0].id;
                    let promotionId = response.body[0].promotion.id;
                    unirest.delete('https://localhost:3006/purchases/' + id + '/?embed=promotion')
                        .type('json')
                        .end(response => {
                            assert.equal(200, response.code);

                            // Check if the purchase was really deleted
                            unirest.get('https://localhost:3006/purchases/' + id + '/')
                                .type('json')
                                .end(response => {
                                    assert.equal(404, response.code);

                                    // Check if the promotion was really deleted
                                    unirest.get('https://localhost:3006/promotions/' + promotionId + '/')
                                        .type('json')
                                        .end(response => {
                                            assert.equal(404, response.code);
                                            done();
                                        });
                                });
                        });
                });
        });
    });

    describe('Incorrect id', () => {
        it('should not delete if id is non-existant', done => {
            unirest.delete('https://localhost:3006/articles/00000000-0000-1000-8000-000000000000')
                .type('json')
                .end(response => {
                    assert.equal(404, response.code);

                    done();
                });
        });

        it('should not delete if the id is not a guid', done => {
            unirest.delete('https://localhost:3006/articles/foo')
                .type('json')
                .end(response => {
                    assert.equal(400, response.code);

                    done();
                });
        });
    });
});
