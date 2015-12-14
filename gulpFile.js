var gulp = require('gulp'),
    nodemon = require('nodemon'),
    webserver = require('gulp-webserver');

gulp.task('nodeserver', function() {
    nodemon({
        script: 'nodeServer.js'
    })
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});


gulp.task('default', ['webserver', 'nodeserver']);
