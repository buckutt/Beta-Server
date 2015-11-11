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

gulp.task('seed', ['default'], function (cb) {
    var models = require('./app/models');

    models.onReady = function () {
        var buckuttData = require('./app/buckuttData');
        var raw         = buckuttData.raw(models);

        Promise
            .all(
                raw.all.map(document => document.save())
            )
            .then(() => {
                console.log('Inserted documents');

                return Promise.all(buckuttData.rels(models, raw.data));
            })
            .then(() =>
                models.r.wait()
            )
            .then(() => {
                console.log('Inserted relationships');
                cb();
            })
            .catch(err => {
                console.log(err.stack);
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
