import DS from 'ember-data';
import computed from '@ember-decorators/auto-computed';

export default DS.Model.extend({
  market: DS.attr('string'),
  totalVariations: DS.attr('number'),
  totalVariationPages: DS.attr('number'),
  variations: DS.attr(),
  dimensions: DS.attr(),
  @computed('dimensions') isSingle(ds) {
    return ds.length === 1;
  },
  @computed('dimensions') isDouble(ds) {
    return ds.length === 2;
  },
  // @computed('dimensions', 'variations') uniqAttributes(ds, vs) {
  //   const firstCats = vs.mapBy('ItemAttributes.' + ds[0]).uniq();
  //   const secondCats = vs.mapBy('ItemAttributes.' + ds[1]).uniq();
  // },
  @computed('variations') vattrs(vs) {
    return vs.mapBy('ItemAttributes');
  },
  @computed('variations') uniqColorItems(vs) {
    return vs.uniqBy('ItemAttributes.Color');
  },
  @computed('variations') uniqSizeItems(vs) {
    return vs.uniqBy('ItemAttributes.Size');
  },
  @computed('dimensions') dimension(ds) {
    return ds[0];
  },
  @computed('dimension', 'variations') uniqItems(d, vs) {
    return vs.uniqBy('ItemAttributes.' + d);
  }
});
