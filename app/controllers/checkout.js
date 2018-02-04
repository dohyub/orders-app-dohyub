import Controller from '@ember/controller';
import { action } from 'ember-decorators/object';
import computed from '@ember-decorators/auto-computed';
import Ember from 'ember';

export default Controller.extend({
  itemQuantities: Ember.computed.mapBy('model.cart.metaCartItems', 'quantity'),
  totalItemCount: Ember.computed.sum('itemQuantities'),
  itemTotalPrices: Ember.computed.mapBy('model.cart.metaCartItems', 'totalPrice'),
  totalItemPrice: Ember.computed.sum('itemTotalPrices'),
  @computed('totalItemPrice') fmtTotalItemPrice(p) {
    return p.toFixed(2);
  },
  @action setPayment(p) {
    this.set('payment', p);
  },
  @action setShipping(s) {
    this.set('shipping', s);
  }
});
