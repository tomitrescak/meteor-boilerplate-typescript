var gulp = require("gulp");

var config = require("./../config.json");
var replace = require('gulp-replace');

gulp.task('modularize', function () {

  // remove "var ModuleName;" from all files"
  for (var i in config.modules) {
    var regex = new RegExp("var " + config.modules[i] + ";", "g");
    gulp.src([config.destination + "/**/*.js"])
      .pipe(replace(regex, ""))
      .pipe(gulp.dest(config.destination));
  }
});
