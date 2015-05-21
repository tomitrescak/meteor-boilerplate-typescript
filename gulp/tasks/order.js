var gulp = require("gulp");

var config = require("./../config.json");
var rename = require("gulp-rename");

var map = require('vinyl-map')
var path = require('path');

var files = [];

var pad = "";
var padCharacters = "_abcdefghijklmnopqrstuvwxyz";

var regex = new RegExp(/^\/\/\/ <reference path="([^"]*)" \/>$/mg);

gulp.task('find-dependencies', function() {
  // init the file collection
  files = [];

  /**
   * This function will detect all dependencies and build array of elements
   */
  var findDependencies = map(function (code, filename) {
    //console.log("\n\n-> " + filename);
    // match dependencies
    code = code.toString();
    var match = code.match(regex);
    var newElem = {
      name: filename,
      dependencies: []
    };

    // strip all dependencies
    if (match) {
      var deps = [];

      for (var i = 0; i < match.length; i++) {
//        console.log("Match: " + match[i]);
        var dep = (/"([^"]*)"/).exec(match[i])[1].replace(/\.+\//g, ""); //.replace(".ts", ".js")
//        console.log("--> Dependency: " + dep);

        // add dependency stripped of ../ and ./
        deps.push(dep);
      }

      if (deps.length) {
        newElem.dependencies = deps;
      }
    }
    files.push(newElem);
  });

  return gulp.src([config.src + "/**/*.ts"])
    .pipe(findDependencies);

});

gulp.task('order', ['find-dependencies'], function() {
  // browse the files collection and resolve all dependencies
//  console.log(files.length);
  var resolved;

  for (var i in files) {
    var file = files[i];

    for (var j=0; j<file.dependencies.length; j++) {
      var dependency = file.dependencies[j];

      resolved = false;
      for (var k in files) {
        if (files[k].name.indexOf(dependency) > -1) {
          file.dependencies[j] = files[k];
  //        console.log("resolved: " + files[k]);
          resolved = true;
        }
      }
      if (!resolved) {
        file.dependencies.splice(j, 1);
        j--;
  //      console.log("not resolved: " + dependency);
      }
    }
  }

  // topologically sort files by hierarchy
  var sorted = TSort(files, true);

  return gulp.src([config.tmp + "/**/*.js"])
    .pipe(rename(function (path) {
      // we do not rename test files
      if (path.dirname == "tests" || path.dirname.indexOf('tests') > -1) {
        return;
      }
      
      var relPath = path.dirname + "/" + path.basename;

      for (var i=0; i<sorted.length; i++) {
        if (sorted[i].name.indexOf(relPath) > -1) {
//          console.log("Indexing: " + i + " " + relPath);
          path.basename = createPad(files, i) + "_" + path.basename;
          break;
        }
      }

      // decide directory
      //console.log(relPath + "--->" + path.dirname);
      if (path.dirname.match(/\/?server\/?/)) {
        
        if (path.dirname.match(/\/?lib\/?/)) {
          path.dirname = 'server/lib/';
        } else {
          path.dirname = 'server/';
        }
      } else if (path.dirname.match(/\/?client\/?/)) {
        if (path.dirname.match(/\/?lib\/?/)) {
          path.dirname = 'client/lib/';
        } else {
          path.dirname = 'client/';
        }       
      } else {
        path.dirname = '/lib/';
      }
      //console.log("decided: " + path.dirname);
      //path.basename += "-goodbye";
      //path.extname = ".md"
    }))
    .pipe(gulp.dest(config.destination));
})



function TSort(source, throwOnCycle)
{
  var sorted = [];
  var visited = [];

  for( var i in source )
    Visit( source[i], visited, sorted, throwOnCycle );

  return sorted;
}

function Visit(item, visited, sorted, throwOnCycle )
{
  if(visited.indexOf(item) == -1)
  {
    visited.push(item);

    for( var i in item.dependencies) {
      Visit(item.dependencies[i], visited, sorted, throwOnCycle);
    }

    sorted.push(item );
  }
  else
  {
    if( throwOnCycle && sorted.indexOf(item) == -1)
      console.log( "Cyclic dependency found: " + item.name );
  }
}

function createPad(files, index) {
  var elems = padCharacters.length;
  if (!pad) {
    pad = padCharacters[0];
    var rest = files.length;
    while (rest > elems) {
      rest = Math.floor(rest / elems);
      pad += padCharacters[0];
    }
//    console.log("Pad: " + pad);
  }

  // convert to character
  var num = index;
  var conv = "";

  do {
    conv = padCharacters[num % elems] + conv;
    num = Math.floor(num / elems);
  } while (num > 0);

  // return padded
  return pad.substring(0, pad.length - conv.length) + conv;
}