var gulp = require("gulp");

var config = require("./../config.json");
var rename = require("gulp-rename");

var map = require('vinyl-map')
var path = require('path');

var linkedListStart = null;
var pad = "0000";

gulp.task('prepare-order', function () {
  // create dependency list

  linkedListStart = null;
  var regex = new RegExp(/^\/\/\/ <reference path="([^"]*)" \/>\W/);

  // enqueue into linked list
  function enqueueBefore(elem, newOne, before) {
    //console.log('B: ' +  newOne.name + " ----> " + elem.name);

    if (!elem.previous) {
      linkedListStart = newOne;
    } else {
      elem.previous.next = newOne;
    }

    newOne.previous = elem.previous;
    elem.previous = newOne;
    newOne.next = elem;
  }

  function enqueueAfter(elem, newOne, before) {
    //console.log('A: '  +  elem.name + " ----> " + newOne.name);

    if (elem.next) {
      elem.next.previous = newOne;
    }
    newOne.next = elem.next;
    elem.next = newOne;
    newOne.previous = elem;
  }

  var order = map(function (code, filename) {

    // file contents are handed over as buffers
    code = code.toString();

    var newElem = {
      name: filename
    }

    // match dependencies
    var match = regex.exec(code);

    // strip all dependencies
    if (match) {
      var deps = [];

      for (var i = 1; i < match.length; i++) {
        // skip definition files
        if (match[i].indexOf(".d.ts") > -1) {
          continue;
        }

        // add dependency stripped of ../ and ./
        deps.push(match[i].replace(/\.+\//g, ""));
      }

      if (deps.length) {
        newElem.dependencies = deps;
      }
    }

    // init first element
    if (!linkedListStart) {
      linkedListStart = newElem;
      return;
    }

    // start from the beggining of the linked list
    var head = linkedListStart;
    var found = null;
    var foundCount = 0;

    if (match) {
      // browse the linked list until we find the latest dependency
      // going down, finding the latest position of file which I depend on
      while (head) {
        for (var i in newElem.dependencies) {
          // if we found a filename of the dependency
          if (head.name.indexOf(newElem.dependencies[i]) > -1) {
            found = head;
            foundCount++;
          }
          // stop if we found all dependencies
          if (foundCount == newElem.dependencies.length) {
            break;
          }
        }
        head = head.next;
      }
    }


    // we may have not found anything
    if (!found) {
      found = linkedListStart;
    }

    // if there are elements below the current element
    // we go further down, finding the topmost position of file which depends on me
    if (found.next) {
      found = found.next;
      head = found;

      while (head) {
        for (var i in head.dependencies) {
          // if we found a filename of the dependency
          if (newElem.name.indexOf(head.dependencies[i]) > -1) {
            found = head;
          }
        }
        head = head.next;
      }

      // insert before the last found element
      enqueueBefore(found, newElem);

    } else {
      // if this is a last element only add content afterwards
      enqueueAfter(found, newElem);
    }

    // insert element before the currently found element
    //    console.log(fileName);
    //return { file: fileName };
  });

  return gulp.src([config.tmp + "/**/*.js"])
    .pipe(order);

});

gulp.task('order', ["prepare-order"], function () {


  return gulp.src([config.tmp + "/**/*.js"])
    .pipe(rename(function (path) {
      // we do not rename test files
      if (path.dirname == "tests" || path.dirname.indexOf('tests') > -1) {
        return;
      }
      
      var relPath = path.dirname + "/" + path.basename + path.extname;

      // find this path in linked list
      var i = 0;
      var head = linkedListStart;

      while (head != null) {
        //console.log(i + " " + head.name + "::" + relPath);
        if (head.name.indexOf(relPath) > -1) {
          path.basename = pad.substring(0, pad.length - i.toString().length) + i.toString() + "_" + path.basename;
        }
        i++;
        head = head.next;
      }

      // decide directory
      //console.log(relPath + "--->" + path.dirname);
      if (path.dirname.match(/\/?server\/?/)) {
        path.dirname = 'server/';
      } else if (path.dirname.match(/\/?client\/?/)) {
        path.dirname = 'client/';
      } else {
        path.dirname = '/lib/';
      }
      //console.log("decided: " + path.dirname);
      //path.basename += "-goodbye";
      //path.extname = ".md"
    }))
    .pipe(gulp.dest(config.destination));
})

