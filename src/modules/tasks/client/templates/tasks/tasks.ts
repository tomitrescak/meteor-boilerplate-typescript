/// <reference path="../../../../modulesImports.d.ts" />

module MyModule.Templates {
	import MeteorTemplate = meteorts.MeteorTemplate;
	
	export class TasksTemplateData {
        tasks: Mongo.Collection<MyModule.Collections.TasksDAO>;
    }
	
	class TasksTemplateContext extends TasksTemplateData {
	    @MeteorTemplate.helper
	    isOwner(): boolean {
			console.log("Really?");
	        return true;
	    }
	}
	
	class TasksTemplate extends MeteorTemplate.Base<TasksTemplateData> {
	    constructor() {
	        super("Tasks", new TasksTemplateContext());
	    }	
	    rendered(): void {
	        
	    }
	}
	
	MeteorTemplate.register(new TasksTemplate());
}