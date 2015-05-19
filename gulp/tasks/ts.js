var gulp = require('gulp');

var config = require("./../config.json");
var ts = require("./../jobs/ts.js");
var run = require("./../jobs/run.js");

var src = config.src;

/* Main source files */
gulp.task("ts-server", ts([src + "server/**/*.ts"], src, {"out": "js/server/server.js", "noImplicitAny": false, "target": "ES5"}));
gulp.task("ts-shared", ts([src + "/lib/**/*.ts", src + "/collections/**/*.ts"], src, {"out": "js/lib/shared.js", "noImplicitAny": false, "target": "ES5"}));
gulp.task("ts-client", ts([src + "/client/**/*.ts"], src, {"out": "js/client/client.js", "noImplicitAny": false, "target": "ES5"}));
gulp.task("ts-main", run(["ts-server", "ts-shared", "ts-client"]));

/* Packages sources */
gulp.task("ts-packages", ts([src + "package/**/*.ts"], src, {"out": "package/packages.js", "noImplicitAny": false, "target": "ES5"}));

/* All typescript sources */

gulp.task("ts-modules-release", run(["ts-main", "ts-packages"]));
gulp.task("ts-modules-debug", ts([src + "/**/*.ts"], config.tmp, {"noImplicitAny": true, "target": "ES5"}));
gulp.task("ts", ts([src + "/**/*.ts"], config.destination, {"noImplicitAny": true, "target": "ES5"}));


//gulp.task("ts", ts([src + "/**/*.ts"], config.destination, {"sourceMaps": true, "noImplicitAny": true, "target": "ES5", "sourceRoot": "./src"}));

