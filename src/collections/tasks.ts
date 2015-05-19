/// <reference path="../../typescript/meteor/meteor.d.ts" />

module MyModule.Collections {
	export class TasksDAO {
		name: string;
	}
	
	export var Tasks : Mongo.Collection<TasksDAO>;
	Tasks = new Mongo.Collection<TasksDAO>("tasks");
}