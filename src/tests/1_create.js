import assert  from 'assert';
import unirest from 'unirest';

let IceTeaPeche;
let KinderDelice;
let Formule1Euro;
let UNG;
let Foyer;
let GJ;
let TC;

describe('Create', function () {
    this.timeout(20 * 1000); // First request creates the tables

    describe('Correct model', () => {
        it('should support multiple entries', done => {
            unirest.post('http://localhost:3006/articles')
                .type('json')
                .send([
                    {
                        name : 'Ice Tea Pêche',
                        stock: 0
                    },
                    {
                        name : 'Ice Tea Liptonic',
                        stock: 0
                    }
                ])
                .end(response => {
                    IceTeaPeche = response.body[0];
                    assert.equal(2, response.body.length);
                    assert.equal(200, response.code);
                    done();
                });
        });

        it('should support one unique entry', done => {
            unirest.post('http://localhost:3006/articles')
                .type('json')
                .send({
                    name : 'Ice Tea Mangue',
                    stock: 0
                })
                .end(response => {
                    assert.equal('string', typeof response.body.id);
                    assert.equal(200, response.code);
                    done();
                });
        });

        it('should create Article', done => {
            unirest.post('http://localhost:3006/articles')
                .type('json')
                .send({
                    name : 'Kinder Delice',
                    stock: 0
                })
                .end(response => {
                    KinderDelice = response.body;
                    assert.equal('string', typeof response.body.id);
                    assert.equal(200, response.code);
                    done();
                });
        });

        it('should create Category', done => {
            unirest.post('http://localhost:3006/categories')
                .type('json')
                .send({
                    name: 'Barres',
                })
                .end(response => {
                    assert.equal('string', typeof response.body.id);
                    assert.equal(200, response.code);
                    done();
                });
        });

        it('should create Device', done => {
            unirest.post('http://localhost:3006/devices')
                .type('json')
                .send({
                    name: 'eeetop-1',
                })
                .end(response => {
                    assert.equal('string', typeof response.body.id);
                    assert.equal(200, response.code);
                    done();
                });
        });

        it('should create Fundation', done => {
            unirest.post('http://localhost:3006/fundations')
                .type('json')
                .send({
                    name   : 'UNG',
                    website: 'http://ung.utt.fr',
                    mail   : 'ung@utt.fr',
                })
                .end(response => {
                    UNG = response.body;
                    assert.equal('string', typeof response.body.id);
                    assert.equal(200, response.code);
                    done();
                });
        });

        it('should create Group', done => {
            unirest.post('http://localhost:3006/groups')
                .type('json')
                .send({
                    name    : 'Cotisants A2016',
                    isOpen  : true,
                    isPublic: false
                })
                .end(response => {
                    assert.equal('string', typeof response.body.id);
                    assert.equal(200, response.code);
                    done();
                });
        });

        it('should create MeanOfLogin', done => {
            unirest.post('http://localhost:3006/meansoflogins')
                .type('json')
                .send({
                    type: 'mail_etu',
                    data: 'gabriel.juchault@gmail.com',
                })
                .end(response => {
                    assert.equal('string', typeof response.body.id);
                    assert.equal(200, response.code);
                    done();
                });
        });

        it('should create Period', done => {
            unirest.post('http://localhost:3006/periods')
                .type('json')
                .send({
                    name : 'Just now',
                    start: new Date(),
                    end  : new Date(),
                })
                .end(response => {
                    assert.equal('string', typeof response.body.id);
                    assert.equal(200, response.code);
                    done();
                });
        });

        it('should create Point', done => {
            unirest.post('http://localhost:3006/points')
                .type('json')
                .send({
                    name: 'Foyer',
                })
                .end(response => {
                    Foyer = response.body;
                    assert.equal('string', typeof response.body.id);
                    assert.equal(200, response.code);
                    done();
                });
        });

        it('should create Price', done => {
            unirest.post('http://localhost:3006/prices')
                .type('json')
                .send({
                    amount: 3.141592654,
                })
                .end(response => {
                    assert.equal('string', typeof response.body.id);
                    assert.equal(200, response.code);
                    done();
                });
        });

        it('should create Promotions', done => {
            unirest.post('http://localhost:3006/promotions')
                .type('json')
                .send({
                    name: 'Formule 1€',
                })
                .end(response => {
                    Formule1Euro = response.body;
                    assert.equal('string', typeof response.body.id);
                    assert.equal(200, response.code);
                    done();
                });
        });

        it('should create Reloads', done => {
            unirest.post('http://localhost:3006/reloads')
                .type('json')
                .send({
                    trace : 'Ticket caisse n°123',
                    credit: 50
                })
                .end(response => {
                    assert.equal('string', typeof response.body.id);
                    assert.equal(200, response.code);
                    done();
                });
        });

        it('should create Right', done => {
            unirest.post('http://localhost:3006/rights')
                .type('json')
                .send({
                    name   : 'admin',
                    isAdmin: true
                })
                .end(response => {
                    assert.equal('string', typeof response.body.id);
                    assert.equal(200, response.code);
                    done();
                });
        });

        it('should create User', done => {
            unirest.post('http://localhost:3006/users')
                .type('json')
                .send({
                    firstname: 'Gabriel',
                    lastname : 'Juchault',
                    nickname : 'Extaze',
                    pin      : '1234',
                    password : '1234',
                    mail     : 'gabriel.juchault@utt.fr',
                    credit   : 150,
                })
                .end(response => {
                    GJ = response.body;
                    assert.equal('string', typeof response.body.id);
                    assert.equal(200, response.code);

                    unirest.post('http://localhost:3006/users')
                        .type('json')
                        .send({
                            firstname: 'Thomas',
                            lastname : 'Chauchefoin',
                            nickname : 'nashe',
                            pin      : '1234',
                            password : '1234',
                            mail     : 'thomas.chauchefoin@utt.fr',
                            credit   : 150,
                        })
                        .end(response => {
                            TC = response.body;
                            assert.equal('string', typeof response.body.id);
                            assert.equal(200, response.code);
                            done();
                        });
                });
        });

        it('should create Purchase with relationships', done => {
            unirest.post('http://localhost:3006/purchases?embed=articles,promotion')
                .type('json')
                .send({
                    fundationId: UNG.id,
                    pointId    : Foyer.id,
                    buyerId    : GJ.id,
                    sellerId   : TC.id,
                    promotionId: Formule1Euro.id,
                    articles   : [ IceTeaPeche.id, KinderDelice.id ]
                })
                .end(response => {
                    assert.equal('string', typeof response.body.id);
                    assert.equal(2, response.body.articles.length);
                    assert.equal(Formule1Euro.id, response.body.promotion.id);
                    assert.equal(200, response.code);
                    done();
                });
        });

        it('should cut the additionals fields if they are not part of the model', done => {
            unirest.post('http://localhost:3006/articles')
                .type('json')
                .send({
                    name : 'Mars',
                    stock: 0,
                    foo  : 'bar'
                })
                .end(response => {
                    assert.equal('string', typeof response.body.id);
                    assert.equal(200, response.code);
                    assert.equal(false, response.body.hasOwnProperty('foo'));
                    done();
                });
        });
    });

    describe('Invalid model', () => {
        it('should throw an error if there are missing fields', done => {
            unirest.post('http://localhost:3006/articles')
                .type('json')
                .send({})
                .end(response => {
                    assert.equal(400, response.code);
                    done();
                });
        });

        it('should throw an error if the model does not exists', done => {
            unirest.post('http://localhost:3006/foo')
                .type('json')
                .send({})
                .end(response => {
                    assert.equal(404, response.code);
                    done();
                });
        });
    });
});
