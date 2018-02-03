import DS from 'ember-data';
import * as attrs from 'orders-app/models/attrs';
import computed from '@ember-decorators/auto-computed';
import Ember from 'ember';

export default DS.Model.extend({
  createdAt: attrs.firebaseTimestamp,
  user: DS.belongsTo('user'),
  items: DS.hasMany('cart-item'), // do not use this field, legacy compat
  metaCartItems: DS.hasMany(),
  quantities: Ember.computed.mapBy('metaCartItems', 'quantity'),
  totalQuantity: Ember.computed.sum('quantities'),
  // totalPriceSet: Ember.computed.mapBy('items', 'totalPrice'),
  // totalPrice: Ember.computed.sum('totalPriceSet'),
  // @computed('totalPrice') formattedTotalPrice(tp) {
  //   return (tp/100).toFixed(2);
  // },
  // @computed('items.@each.quantity') qtyLength(items) {
  //   return items.getEach('quantity').reduce((x, y) => x + y);
  // }
});
