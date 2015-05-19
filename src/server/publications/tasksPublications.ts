/// <reference path="../serverImports.d.ts" />

Meteor.publish('tasks', function() {
  return MyModule.Collections.Tasks.find();
});