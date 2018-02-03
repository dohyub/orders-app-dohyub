import DS from 'ember-data';
import * as attrs from 'orders-app/models/attrs';
import shipCalc from 'orders-app/utils/ship-calc';
import computed from '@ember-decorators/auto-computed';

export default DS.Model.extend({
  createdAt: attrs.firebaseTimestamp,
  owner: DS.attr('string'),
  email: DS.attr('string'),

  productId: DS.attr('string'),
  parentId: DS.attr('string'),
  option: DS.attr('string'),

  market: DS.attr('string'),       // ex) amazon, walmart
  category: DS.attr('string'),     // which category in a market
  title: DS.attr('string'),        // an offer title
  manufacturer: DS.attr('string'), // like Dongwon for a canned tuna
  image: DS.attr('string'),
  linkToMarket: DS.attr('string'),
  //
  quantity: DS.attr('number', { defaultValue: () => 1 }),

  // concrete meta model should provide data for below fields.
  price: DS.attr('number'),       // in cents for example, $10 is 1000
  dimensions: DS.attr('object'),  // for estimation of shipping fee
  variations: DS.attr('object'),  // variation

  @computed('dimensions', 'quantity')
  shippingFeeByQty(dim, q) {
    if (!dim) { return; }
    const { height, width, length, weight } = dim;
    if (![height, width, length, weight].every(Ember.isPresent)) { return; }
    const amount = Math.max(weight, (height * width * length)/139);
    const rounded = Math.ceil(amount * q);
    const fee = shipCalc[rounded] * 1.1;
    return fee;
  },
  @computed('shippingFeeByQty') isShippable(fee) {
    return !isNaN(fee);
  },
  @computed('price', 'quantity') totalPrice(p, q) {
    return Number((p * q).toFixed(2));
  },
  // these two will be used to estimate actual shipping fee.
  @computed('dimensions', 'quantity') volumeByQty({ height, width, length }, q) {
    return ((height * width * length) / 139) * q;
  },
  @computed('dimensions', 'quantity') weightByQty({ weight }, q) {
    return weight * q;
  },
});

