import thinky  from '../thinky';
import Promise from 'bluebird';

let r = thinky.r;
describe('Before tests', () => {
    it('should empty all the databases', function (done) {
        this.timeout(20 * 1000);

        let allDeleters = [
            r.table('Article').delete(),
            r.table('Article_Purchase').delete(),
            r.table('Category').delete(),
            r.table('Device').delete(),
            r.table('Device_Point').delete(),
            r.table('Fundation').delete(),
            r.table('Group').delete(),
            r.table('Group_User').delete(),
            r.table('MeanOfLogin').delete(),
            r.table('Period').delete(),
            r.table('Point').delete(),
            r.table('Price').delete(),
            r.table('Promotion').delete(),
            r.table('Purchase').delete(),
            r.table('Reload').delete(),
            r.table('Right').delete(),
            r.table('Right_User').delete(),
            r.table('User').delete()
        ];

        Promise.all(allDeleters).then(() => {
            done();
        });
    });

    it('should create one user', done => {
        let userId;

        r.table('User').insert({
            firstname  : 'Buck',
            lastname   : 'UTT',
            nickname   : 'buck',
            pin        : 1234,
            password   : 'buckutt',
            mail       : 'buck@utt.fr',
            credit     : 120,
            isTemporary: false,
            createdAt  : new Date(),
            updatedAt  : new Date(),
            isRemoved  : false,
            failedAuth : 0
        }).then(user => {
            userId = user.id;

            return r.table('MeanOfLogin').insert({
                type     : 'mail_etu',
                data     : 'buck@utt.fr',
                createdAt: new Date(),
                updatedAt: new Date(),
                isRemoved: false,
                userId   : userId
            });
        }).then(() =>
            r.table('MeanOfLogin').insert({
                type     : 'id_etu',
                data     : 35426,
                createdAt: new Date(),
                updatedAt: new Date(),
                isRemoved: false,
                userId   : userId
            })
        ).then(() => {
            done();
        });
    });
});
