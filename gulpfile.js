// Author: Andrew Jarombek
// Date: 12/27/2017
// Gulp is the build tool for our node app.  We can now run the server by simply calling 'gulp' in bash

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');
const nodemon = require('gulp-nodemon');

// The main task called.  We first execute the 'watch' task and then run a script to start the server
gulp.task('default', ['watch'], () => {
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
        // Nodemon will restart the server when any of the src files change
        console.info('Restarting Server with Changes');
    })
});

// The 'watch' task will wait for changes in the source files and when they occur invoke
// the 'transpile' task.
gulp.task('watch', ['transpile'], () => {
    livereload.listen();
    gulp.watch('./src/**/*.js', ['transpile']);
});

// The transpile task invokes babel to convert ES6+ code into ES5
gulp.task('transpile', () => {
    gulp.src('./src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'))
        .pipe(livereload());
});