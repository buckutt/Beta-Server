var gulp    = require('gulp');
var babel   = require('gulp-babel');
var jshint  = require('gulp-jshint');
var plumber = require('gulp-plumber');
var stylish = require('jshint-stylish');
var changed = require('gulp-changed');
var rimraf  = require('rimraf');

var jshintConfig = {
    bitwise: true,
    curly: true,
    eqeqeq: true,
    forin: true,
    freeze: true,
    latedef: true,
    noarg: true,
    shadow: 'inner',
    undef: true,
    unused: true,
    varstmt: true,
    eqnull: true,

    esnext: true,
    devel: true,
    mocha: true,
    module: true,
    node: true
};

gulp.task('clean', function (cb) {
    rimraf('app', cb);
});

gulp.task('lint');

gulp.task('default', function () {
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
