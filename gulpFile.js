var gulp = require('gulp'),
  //  connect = require('gulp-connect'),

    nodemon = require('nodemon'),
    webserver = require('gulp-webserver');

//gulp.task('webserver', function() {
 //   connect.server();
//});

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
