/// <reference path="../../../typescript/meteor/meteor.d.ts" />

interface LocalCollectionModel {
  name: string;
}

declare var LocalCollection : Mongo.Collection<LocalCollectionModel>;
LocalCollection = new Mongo.Collection<LocalCollectionModel>(null);
