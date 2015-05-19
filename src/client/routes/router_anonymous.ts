/// <reference path="router_config.ts" />

Router.route("/", {
  name: "home",
  template: "Home",
  data: function() {
    //return result;
  },
  yieldRegions: {
    "FooterHome": {to: "extraFooter"}
  }
});