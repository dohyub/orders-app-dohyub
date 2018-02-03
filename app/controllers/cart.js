import Controller from '@ember/controller';
import computed from '@ember-decorators/auto-computed';
import Ember from 'ember';

export default Controller.extend({
  itemQuantities: Ember.computed.mapBy('model.metaCartItems', 'quantity'),
  totalItemCount: Ember.computed.sum('itemQuantities'),
  itemTotalPrices: Ember.computed.mapBy('model.metaCartItems', 'totalPrice'),
  totalItemPrice: Ember.computed.sum('itemTotalPrices'),
  @computed('totalItemPrice') fmtTotalItemPrice(p) {
    return p.toFixed(2);
  }
});
