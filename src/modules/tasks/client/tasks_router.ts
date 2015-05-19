/// <reference path="../../modulesImports.d.ts" />

Router.route("/tasks", {
  name: "tasks",
  template: "Tasks",
  data: () => {
    return { tasks: MyModule.Collections.Tasks.find() };
  }
});
//
//Router.route("/task/:_id", {
//  name: "home",
//  template: "Home",
//  data: () => {
//    //return result;
//  },
//  yieldRegions: {
//    "FooterHome": {to: "extraFooter"}
//  }
//});
