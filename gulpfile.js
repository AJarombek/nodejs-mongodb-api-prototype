const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

gulp.task('transformES6', () => {
    gulp.src('./src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env'],
            ignore: [
                './gulpfile.js',
                './node_modules/**/*.js',
            ]
        }))
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('default', ['transformES6'], () => {
   nodemon({
       script: './dist/bundle.js',
       ext: 'js',
       env: {
           PORT: 3000
       },
       ignore: [
           './node_modules/**',
           './dist/**',
           './package.json',
           './package-lock.json'
       ]

   }).on('restart', () => {
       console.info('Restarting Server with Changes');
   })
});