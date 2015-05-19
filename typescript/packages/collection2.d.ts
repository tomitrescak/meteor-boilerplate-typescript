declare module Mongo {
  interface Collection<T> {
    attachSchema(schema : any) : void;
  }
}