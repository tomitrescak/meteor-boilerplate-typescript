var gulp = require("gulp");

var config = require("./gulp/config.json");
var run = require("./gulp/jobs/run.js");

require("./gulp/tasks/ts.js");
require("./gulp/tasks/lint.js");
require("./gulp/tasks/tests.js");
require("./gulp/tasks/clean.js");
require("./gulp/tasks/meteor.js");
require("./gulp/tasks/modularize.js");
require("./gulp/tasks/order.js");

var src = config.src;

gulp.task("order-and-modularize", ["order"], run(["modularize"]));

gulp.task("build", ["clean", "tslint"], run(["ts"]));
gulp.task("build-debug-modules", ["clean", "ts-modules-debug"], run(["order-and-modularize"]));
gulp.task("build-release-modules", ["clean", "ts-modules-release"], run(["modularize"]));

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch([config.src + "/**/*.ts"], ['build']);
});

gulp.task('watch-modules', function() {
  gulp.watch([config.src + "/**/*.ts"], ['build-debug-modules']);
});

//gulp.task("make", ["tslint", "clean"], run(["ts", "ts-tests"]));
//gulp.task("test", ["make"], run(["run-unit-tests"]));
//gulp.task("test-all", ["make"], run(["run-all-tests"]));
//gulp.task("run", ["make"], run(["meteor"]));

gulp.task("default", ["build"]);
