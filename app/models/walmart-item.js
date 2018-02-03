import DS from 'ember-data';
import computed from '@ember-decorators/auto-computed';
import MetaItem from 'orders-app/models/meta-item';

export default MetaItem.extend({
  longDescription: DS.attr('string'),
  shortDescription: DS.attr('string'),
  isTwoDayShippingEligible: DS.attr('boolean'),
  salePrice: Ember.computed.reads('others.salePrice'),
  @computed('salePrice') fmtPrice(price) {
    return `$${price}`;
  },
  @computed('longDescription') escLongDesc(d) {
    if (!d) { return; }
    const e = document.createElement('textarea');
    e.innerHTML = d;
    return e.innerText;
  },
  @computed('shortDescription') escShortDesc(d) {
    if (!d) { return; }
    const e = document.createElement('textarea');
    e.innerHTML = d;
    return e.innerText;
  },
  supplyMetaCartItemPayload(payload) {
    payload.price = this.get('salePrice');
  }
});
