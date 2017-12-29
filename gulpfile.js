const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('transpile', () => {
    gulp.src('./src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('default', ['transpile'], () => {
   nodemon({
       script: './dist/app.js',
       ext: 'js',
       env: {
           PORT: 3000
       },
       ignore: [
           './node_modules/**',
           './dist/**/*.js',
           './dist/**/*.map',
           './package.json',
           './package-lock.json',
           './dbscripts/**'
       ]

   }).on('restart', () => {
       console.info('Restarting Server with Changes');
   })
});