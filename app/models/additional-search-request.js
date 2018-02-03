import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  RequestProcessingTime: attr('number'),
  MoreSearchResultsUrl: attr('string'),
  Request: attr(),
  AdditionalRetailerFirst: attr('string'),
  AdditionalRetailerSecond: attr('string'),
  ItemsFirst: attr(),
  ItemsSecond:attr()
  // Items: hasMany('item', { polymorphic: true })
});
