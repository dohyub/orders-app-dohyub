import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  metaItem: belongsTo({ polymorphic: true })
});