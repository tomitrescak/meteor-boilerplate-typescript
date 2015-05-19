/// <reference path="../serverImports.d.ts" />

// load fixtures
Meteor.startup(() => {
	if (MyModule.Collections.Tasks.find().count() == 0) {
		console.log("Inserting tasks");
		// load tasks
		var records = JSON.parse(Assets.getText('fixtures/tasksFixtures.json'));		
		for (var record of records) {
			MyModule.Collections.Tasks.insert(record);
		}
	}
});
