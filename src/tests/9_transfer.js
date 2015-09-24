import assert from 'assert';

/* global unirest */

describe('Transfers', () => {
    describe('Correct input', () => {
        it('should transfer from one account to another', done => {
            unirest.post('https://localhost:3006/services/transfer')
                .type('json')
                .send({
                    recieverId: process.env.GJId,
                    amount    : 100
                })
                .end(response => {
                    assert.equal(200, response.code);
                    assert.equal(20, response.body.newCredit);
                    done();
                });
        });
    });
});
