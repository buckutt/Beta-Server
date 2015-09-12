import assert from 'assert';

/* global unirest */

describe('Basket', () => {
    it('should support payment', done => {
        unirest.post('https://localhost:3006/services/basket')
            .type('json')
            .send([
                {
                    buyerId    : process.env.GJId,
                    fundationId: process.env.FoyerId,
                    promotionId: null,
                    sellerId   : process.env.GJId,
                    articles   : [
                        process.env.KinderDeliceId
                    ],
                    cost       : 50,
                    type       : 'purchase'
                }
            ])
            .end(response => {
                assert.equal(200, response.code);
                assert.equal(100, response.body.newCredit);
                done();
            });
    });

    it('should support reloads', done => {
        unirest.post('https://localhost:3006/services/basket')
            .type('json')
            .send([
                {
                    credit  : 50 * 100,
                    trace   : 'card',
                    buyerId : process.env.GJId,
                    sellerId: process.env.GJId,
                    type    : 'reload'
                }
            ])
            .end(response => {
                assert.equal(200, response.code);
                assert.equal(5100, response.body.newCredit);
                done();
            });
    });

    it('should support promotions', done => {
        unirest.post('https://localhost:3006/services/basket')
            .type('json')
            .send([
                {
                    buyerId    : process.env.GJId,
                    fundationId: process.env.FoyerId,
                    promotionId: process.env.Formule1EuroId,
                    sellerId   : process.env.GJId,
                    articles   : [
                        process.env.KinderDeliceId,
                        process.env.IceTeaPecheId
                    ],
                    cost       : 100,
                    type       : 'purchase'
                }
            ])
            .end(response => {
                assert.equal(200, response.code);
                assert.equal(5000, response.body.newCredit);
                done();
            });
    });

    it('should support payment, reloads and promotions', done => {
        unirest.post('https://localhost:3006/services/basket')
            .type('json')
            .send([
                {
                    buyerId    : process.env.GJId,
                    fundationId: process.env.FoyerId,
                    promotionId: process.env.Formule1EuroId,
                    sellerId   : process.env.GJId,
                    articles   : [
                        process.env.KinderDeliceId,
                        process.env.IceTeaPecheId
                    ],
                    cost       : 100,
                    type       : 'purchase'
                },
                {
                    credit  : 50 * 100,
                    trace   : 'card',
                    buyerId : process.env.GJId,
                    sellerId: process.env.GJId,
                    type    : 'reload'
                },
                {
                    buyerId    : process.env.GJId,
                    fundationId: process.env.FoyerId,
                    promotionId: null,
                    sellerId   : process.env.GJId,
                    articles   : [
                        process.env.KinderDeliceId
                    ],
                    cost       : 50,
                    type       : 'purchase'
                }
            ])
            .end(response => {
                assert.equal(200, response.code);
                assert.equal(9850, response.body.newCredit);
                done();
            });
    });

    it('should not accept anything else than an array of payments, reloads or promotions', done => {
        unirest.post('https://localhost:3006/services/basket')
            .type('json')
            .send([
                {}
            ])
            .end(response => {
                assert.equal(400, response.code);

                unirest.post('https://localhost:3006/services/basket')
                    .type('json')
                    .send({})
                    .end(response => {
                        assert.equal(400, response.code);
                        done();
                    });
            });
    });

    it('should not accept if the user does not have enough credit', done => {
        unirest.post('https://localhost:3006/services/basket')
            .type('json')
            .send([
                {
                    buyerId    : process.env.GJId,
                    fundationId: process.env.FoyerId,
                    promotionId: null,
                    sellerId   : process.env.GJId,
                    articles   : [
                        process.env.KinderDeliceId
                    ],
                    cost       : 10000,
                    type       : 'purchase'
                }
            ])
            .end(response => {
                assert.equal(400, response.code);
                assert.equal('Not enough credit', response.body.message);
                done();
            });
    });

    describe('Update user credit, stocks and purchases after payments and reloads', () => {
        let gj;
        let kinder;

        before(done => {
            unirest.get(`https://localhost:3006/users/${process.env.GJId}?embed=purchases,reloads`)
                .type('json')
                .end(response => {
                    gj = response.body;

                    unirest.get(`https://localhost:3006/articles/${process.env.KinderDeliceId}`)
                        .type('json')
                        .end(response => {
                            kinder = response.body;

                            done();
                        });
                });
        });

        it('should update user credit', () => {
            assert.equal(9850, gj.credit);
        });

        it('should update purchases', () => {
            assert.equal(5, gj.purchases.length);
        });

        it('should update stocks', () => {
            assert.equal(-4, kinder.stock);
        });

        it('should update reloads', () => {
            console.log(gj.reloads);
        });
    });
});
