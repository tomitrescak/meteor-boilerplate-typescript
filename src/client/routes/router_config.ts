/// <reference path="../clientImports.d.ts" />
/// <reference path="../../collections/all-collections.d.ts" />

declare var subscriptions : SubsManager;
subscriptions = new SubsManager();

Router.configure({
  layoutTemplate: "Basic",
  load: function() {
    $("html, body").animate({ scrollTop: 0 }, 400);
    $(".content").hide().fadeIn(1000);
    this.next();
  },
  waitOn: function () {
    return [
      subscriptions.subscribe("tasks")
    ];
  }
});


