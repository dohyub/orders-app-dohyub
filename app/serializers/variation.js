import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeQueryRecordResponse(store, primaryModelClass, payload, id, requestType) {
    const dimensions = Ember.makeArray(
      payload.matrix.Item.Variations.VariationDimensions.VariationDimension);
    const vs = payload.images.Item.Variations.Item.map((iItem, index) => {
      const mItem = payload.matrix.Item.Variations.Item[index];
      Ember.set(iItem, 'VariationAttributes', Ember.makeArray(
        mItem.VariationAttributes.VariationAttribute));
      Ember.set(iItem, 'ItemAttributes', mItem.ItemAttributes);
      return iItem;
    });
    const totalVariationPages = payload.matrix.Item.Variations.TotalVariationPages;
    const totalVariations = payload.matrix.Item.Variations.TotalVariations;
    const market = payload.type;
    const attributes = {
      market,
      dimensions,
      totalVariations,
      totalVariationPages,
      variations: vs,
    };
    const data = {
      id: payload.id,
      type: 'variation',
      attributes
    };
    return { data };
  }
});
