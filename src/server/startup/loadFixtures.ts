/// <reference path="../serverImports.d.ts" />

// load fixtures
Meteor.startup(() => {
	if (MyModule.Collections.Tasks.find().count()) {
		console.log("Insert fixtures");
	}
});
