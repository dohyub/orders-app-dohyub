import DS from 'ember-data';
import * as attrs from 'orders-app/models/attrs';

export default DS.Model.extend({
  createdAt: attrs.firebaseTimestamp,
  items: DS.hasMany('cart-item'),
  retailer: DS.attr('string'),
  user: DS.belongsTo('user'),
  requestId: DS.attr('string'),
  requestStatus: DS.attr('object'),
  globalStatus: DS.attr('string')
});
