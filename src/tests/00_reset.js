import thinky   from '../thinky';
import Promise  from 'bluebird';
import syncExec from 'sync-exec';

let sslResult = syncExec('openssl x509 -noout -fingerprint -in ssl/test/test.crt').stdout;

if (sslResult.indexOf('=') === -1) {
    console.error('Couldn\'t find test certificate (ssl/test/test.crt). See README.md to create it');
    process.exit(1);
}

let fingerprint = sslResult.split('=')[1].replace(/:/g, '').trim();

let r = thinky.r;
describe('Before tests', () => {
    it('should empty all the databases', function (done) {
        this.timeout(20 * 1000);

        let allDeleters = [
            r.table('Article').delete(),
            r.table('Article_Purchase').delete(),
            r.table('Category').delete(),
            r.table('Device').delete(),
            r.table('Device_PeriodPoint').delete(),
            r.table('Fundation').delete(),
            r.table('Group').delete(),
            r.table('Group_User').delete(),
            r.table('MeanOfLogin').delete(),
            r.table('Period').delete(),
            r.table('Point').delete(),
            r.table('PeriodPoint').delete(),
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
        let pointId;
        let deviceId;
        let periodId;
        let outdatedPeriodId;

        r.table('User').insert({
            firstname  : 'Buck',
            lastname   : 'UTT',
            nickname   : 'buck',
            pin        : '$2a$12$p/OhqfEVU8tCqo52amm1xeslmqUIBG0xoLgLqLjvRGHAoSrYo5Nbi',
            password   : '$2a$12$uOChECr6VjPfcmm/em.pnujdVPK46QEr/SJLnUIXWpADLA6wYVVZW',
            mail       : 'buck@utt.fr',
            credit     : 120,
            isTemporary: false,
            createdAt  : new Date(),
            editedAt   : new Date(),
            isRemoved  : false,
            failedAuth : 0
        }).then(res => {
            userId = res.generated_keys[0];

            return r.table('MeanOfLogin').insert([{
                type     : 'etuMail',
                data     : 'buck@utt.fr',
                createdAt: new Date(),
                editedAt : new Date(),
                isRemoved: false,
                userId   : userId
            }, {
                type     : 'etuId',
                data     : '22000000353423',
                createdAt: new Date(),
                editedAt : new Date(),
                isRemoved: false,
                userId   : userId
            }]);
        }).then(function () {
            return r.table('Period').insert([{
                name     : 'Surrounding',
                start    : new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
                end      : new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
                createdAt: new Date(),
                editedAt : new Date(),
                isRemoved: false
            }, {
                name     : 'Never',
                start    : new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 2),
                end      : new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
                createdAt: new Date(),
                editedAt : new Date(),
                isRemoved: false
            }]);
        }).then(res => {
            periodId         = res.generated_keys[0];
            outdatedPeriodId = res.generated_keys[1];
        }).then(() =>
            r.table('Right').insert([{
                name     : 'admin',
                isAdmin  : false,
                createdAt: new Date(),
                editedAt : new Date(),
                isRemoved: false,
                periodId : periodId
            }, {
                name     : 'admin',
                isAdmin  : true,
                createdAt: new Date(),
                editedAt : new Date(),
                isRemoved: false,
                periodId : outdatedPeriodId
            }])
        ).then(res =>
            r.table('Right_User').insert([{
                Right_id: res.generated_keys[0],
                User_id : userId
            }, {
                Right_id: res.generated_keys[1],
                User_id : userId
            }])
        ).then(() =>
            r.table('Point').insert({
                name     : 'Foyer',
                createdAt: new Date(),
                editedAt : new Date(),
                isRemoved: false
            })
        ).then(res => {
            pointId = res.generated_keys[0];
        }).then(() =>
            r.table('Device').insert({
                fingerprint: fingerprint,
                name       : 'buckutt-test',
                createdAt  : new Date(),
                editedAt   : new Date(),
                isRemoved  : false
            })
        ).then(res => {
            deviceId = res.generated_keys[0];
        }).then(() =>
            r.table('PeriodPoint').insert({
                periodId: periodId,
                pointId : pointId
            })
        ).then(res =>
            r.table('Device_PeriodPoint').insert({
                id            : `${deviceId}_${res.generated_keys[0]}`,
                Device_id     : deviceId,
                PeriodPoint_id: res.generated_keys[0]
            })
        ).then(() =>
            r.table('MeanOfPayment').insert([
                {
                    slug: 'card',
                    name: 'Carte'
                },
                {
                    slug: 'cash',
                    name: 'Liquide'
                },
                {
                    slug: 'cheque',
                    name: 'Chèque'
                },
                {
                    slug: 'gobby',
                    name: 'Gobby'
                }
            ])
        ).then(() => {
            done();
        });
    });
});
