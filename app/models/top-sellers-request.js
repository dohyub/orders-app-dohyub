import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  TotalPages: attr('number'),
  TotalResults: attr('number'),
  RequestProcessingTime: attr('number'),
  MoreSearchResultsUrl: attr('string'),
  Request: attr(),
  SearchBinSets: attr(),
  Items: hasMany('item')
  // Items: hasMany('item', { polymorphic: true })
});
