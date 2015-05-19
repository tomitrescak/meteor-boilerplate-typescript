declare module Meteor {
  function permissionQuery(user : any) : any;

  function UserAccessSchema(schema : any) : any
  
  //function Announce(positive?: (n)
}

interface JQueryStatic {
  semanticUiGrowl(text: string, options?: { type: string}) : void; //TODO: options have a set structure
}