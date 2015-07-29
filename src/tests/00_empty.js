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
});
