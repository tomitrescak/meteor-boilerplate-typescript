var gulp = require("gulp");
var path = require("path");
var del = require("del");
var config = require("../config.json");

gulp.task("clean", function(cb) {
  // delete javascript

  var files = [path.join(config.destination, "**", "*.js"),
               path.join(config.destination, "**", "*.map"),
               path.join(config.tmp, "**", "*.js"),
               path.join(config.tmp, "**", "*.map"),
      "!" + path.join(config.destination, "packages", "**", "*.js")];
  del(files, cb);
});
