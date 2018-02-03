import DS from 'ember-data';

const { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend({
  // ASIN: attr('string'),
  Item: belongsTo('item'),
  Request: attr(),
  RequestProcessingTime: attr('number'),
  // ?
  variationGrouped: attr(),
  variationDimensions: attr(),
  variationParentFull: attr(),
  // !
  VariationParent: belongsTo('item'),
  VariationItems: hasMany('item'),
  hasVariation: attr('boolean'),
});
