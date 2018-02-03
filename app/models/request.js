import DS from 'ember-data';
import computed from '@ember-decorators/auto-computed';
import * as attrs from 'orders-app/models/attrs';
import * as ship from 'orders-app/utils/ship-calc';
import moment from 'moment';

export default DS.Model.extend({
  isRequest: true,
  createdAt: attrs.firebaseTimestamp,
  debug: DS.attr('boolean'),
  handler: DS.attr('string'),
  items: DS.attr('object'),
  metaCartItems: DS.attr('object'),
  cardinfo: DS.attr('object'),
  paymentProfile: DS.attr('object'),
  billing: DS.attr(),
  shipping: DS.attr(),
  cart: DS.attr('object'),
  cartError: DS.attr('string'),
  estShipFee: DS.attr('number'),
  fullName: DS.attr('string'),
  isManualOrder: DS.attr('boolean', { defaultValue: false }),
  isOutOfFeeTable: DS.attr('boolean', { defaultValue: false }),
  icon: DS.attr('string', { defaultValue: 'loading setting'}),
  email: DS.attr('string'),
  user: DS.belongsTo('user'),
  messages: DS.hasMany('message'),
  functions: DS.hasMany('function'),
  authorizations: DS.hasMany('authorization'),
  trackingInformations: DS.hasMany('tracking-information'),
  amazonOrderInformations: DS.hasMany('amazon-order-information'),
  reqCancel: DS.attr('boolean'),
  discountAmount: DS.attr('number'),
  moniebinTrackingNumber: DS.attr('string'),

  amazonFinalized: DS.attr('boolean'),
  amazonOrderNumber: DS.attr('string'),
  amazonSubTotal: DS.attr('number'),
  amazonSalesTax: DS.attr('number'),
  amazonShippingFee: DS.attr('number'),
  amazonETA: DS.attr('string'),

  trackingObtained: DS.attr('boolean'),
  trackingCarrier: DS.attr('string'),
  trackingNumber: DS.attr('string'),
  trackingURL: DS.attr('string'),

  @computed('createdAt') createdAtFormattedForList(ts) {
    return moment(ts).format('ddd YY-MM-DD HH:mm');
  },
  @computed('authorizations.[]') isMoneyOnHold(as){
    const purchase = as.find(a => {
      const hasAmount = a.get('amount');
      const isPurchase = a.get('descriptor') === "9PLE PURCHASE";
      const isSuccess = a.get('transactionResponse.messages.0.code') === "1";
      return hasAmount && isPurchase && isSuccess;
    });
    const shipping = as.find(a => {
      const hasAmount = a.get('amount');
      const isShipping = a.get('descriptor') === "9PLE SHIPPING";
      const isSuccess = a.get('transactionResponse.messages.0.code') === "1";
      return hasAmount && isShipping && isSuccess;
    });
    return purchase && shipping
  },
  @computed('authorizations.[]') successfulPurchaseTransaction(as){
    return as.find(a => {
      const hasAmount = a.get('amount');
      const isPurchase = a.get('descriptor') === "9PLE PURCHASE";
      const isSuccess = a.get('transactionResponse.messages.0.code') === "1";
      return hasAmount && isPurchase && isSuccess;
    });
  },
  @computed('authorizations.[]') successfulPurchaseCapturedTransaction(as){
    return as.find(a => {
      const hasAmount = a.get('amount');
      const isCapture = a.get('method') === "capture";
      const isForPurchase = a.get('captureFor') === "PURCHASE";
      const isSuccess = a.get('transactionResponse.messages.0.code') === "1";
      return hasAmount && isCapture && isForPurchase && isSuccess;
    });
  },
  @computed('messages.[]') hasNotifiedAmazonFinalization(ms){
    return ms.findBy('icon', 'yellow amazon');
  },
  @computed('trackingCarrier') isTrackingCarrierOther(tc) {
    return tc === 'Other';
  }
});
