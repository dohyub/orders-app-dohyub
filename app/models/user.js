import DS from 'ember-data';
import computed from '@ember-decorators/auto-computed';
import * as attrs from 'orders-app/models/attrs';

export default DS.Model.extend({
  method: DS.attr('string', { defaultValue: 'dev-ht-alpha' }),
  createdAt: attrs.firebaseTimestamp,
  auth: DS.attr('object'),
  fullName: DS.attr('string'),
  status: DS.attr('string'),
  membershipCancel: DS.attr('boolean'),
  birthdate: DS.attr('string'),
  gender: DS.attr('string'),
  number: DS.attr('string'),
  anetUserToken: DS.attr('string'),
  isAdmin: DS.attr('boolean'),
  billingAddresses: DS.hasMany('billing-address', { inverse: 'user' }),
  selectedBillingAddress: DS.belongsTo('billing-address'),
  shippingAddresses: DS.hasMany('shipping-address', { inverse: 'user' } ),
  selectedShippingAddress: DS.belongsTo('shipping-address'),
  amazonCredentials: DS.hasMany('amazon-credential'),
  walmartCredentials: DS.hasMany('walmart-credential'),
  bestbuyCredentials: DS.hasMany('bestbuy-credential'),
  orders: DS.hasMany('order'),
  purchases: DS.hasMany('purchase'),
  requests: DS.hasMany('request'),
  cart: DS.belongsTo('cart'),
  payments: DS.hasMany('payment'),
  @computed('status') online(status) {
    return status === 'online' ? true : false;
  },
  @computed('auth') is9pler(auth) {
    //manage-flex-orders restriction
    return (auth.email.endsWith('@9ple.com') && auth.emailVerified);
  }
});
