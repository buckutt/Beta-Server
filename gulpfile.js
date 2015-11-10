var gulp    = require('gulp');
var babel   = require('gulp-babel');
var jshint  = require('gulp-jshint');
var plumber = require('gulp-plumber');
var stylish = require('jshint-stylish');
var changed = require('gulp-changed');
var rimraf  = require('rimraf');

var jshintConfig = {
    bitwise: true,
    curly  : true,
    eqeqeq : true,
    forin  : true,
    freeze : true,
    latedef: true,
    noarg  : true,
    shadow : 'inner',
    undef  : true,
    unused : true,
    varstmt: true,
    eqnull : true,

    esnext : true,
    devel  : true,
    mocha  : true,
    module : true,
    node   : true
};

gulp.task('seed:up', ['default'], function (cb) {
    var models = require('./app/models');
    var pp     = require('./app/lib/utils').pp;

    var saver = function (item) {
        var joins = {};
        Object.keys(item.getModel()._joins).forEach(function (key) {
            joins[key] = true;
        });
        return item.saveAll(joins);
    };

    models.onReady = function () {
        var data = require('./app/buckuttData')(models);

        var articlePromises    = data.articles.map(saver);
        var categoriesPromises = data.categories.map(saver);
        var devicesPromises    = data.devices.map(saver);
        var fundationsPromises = data.fundations.map(saver);
        var groupsPromises     = data.groups.map(saver);
        var molPromises        = data.meansOfLogin.map(saver);
        var mopPromises        = data.meansOfPayment.map(saver);
        var periodsPromises    = data.periods.map(saver);
        var pointsPromises     = data.points.map(saver);
        var pricesPromises     = data.prices.map(saver);
        var promotionsPromises = data.promotions.map(saver);
        var rightsPromises     = data.rights.map(saver);
        var setsPromises       = data.sets.map(saver);
        var usersPromises      = data.users.map(saver);

        var allPromises = articlePromises
            .concat(categoriesPromises)
            .concat(devicesPromises)
            .concat(fundationsPromises)
            .concat(groupsPromises)
            .concat(molPromises)
            .concat(mopPromises)
            .concat(periodsPromises)
            .concat(pointsPromises)
            .concat(pricesPromises)
            .concat(promotionsPromises)
            .concat(rightsPromises)
            .concat(setsPromises)
            .concat(usersPromises);

        Promise.all(allPromises).then(function () {
            console.log('saved');
            cb();
        });
    };
});

gulp.task('clean', function (cb) {
    rimraf('app', cb);
});

gulp.task('cleardb', function (cb) {
    rimraf('rethinkdb_data', cb);
});

gulp.task('config', function () {
    var src = 'src/config/**/*.json';
    var dst = 'app/config/';

    return gulp.src(src)
        .pipe(changed(dst))
        .pipe(gulp.dest(dst));
});

gulp.task('default', ['config'], function () {
    var src = 'src/**/*.js';
    var dst = 'app';
    return gulp.src(src)
        .pipe(plumber())
        .pipe(jshint(jshintConfig))
        .pipe(jshint.reporter(stylish))
        .pipe(changed(dst))
        .pipe(babel())
        .pipe(gulp.dest(dst));
});
