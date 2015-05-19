/// <reference path="router_config.ts" />

Router.route("/", {
  name: "home",
  template: "Home",
  data: () => {
    return { tasks: MyModule.Collections.Tasks.find() };
  }
});

