import Controller from '@ember/controller';
import computed from '@ember-decorators/auto-computed';
import Ember from 'ember';

export default Controller.extend({
  // selectedItems: Ember.computed.filterBy('model.metaCartItems', 'selectedItem', true),
  selectedItemQuantities: Ember.computed.mapBy('model.cart.metaCartItems', 'quantity'),
  selectedItemsCount: Ember.computed.sum('selectedItemQuantities'),
  itemTotalPrices: Ember.computed.mapBy('model.cart.metaCartItems', 'totalPrice'),
  totalItemPrice: Ember.computed.sum('itemTotalPrices'),
  @computed('totalItemPrice') fmtTotalItemPrice(p) {
    return p.toFixed(2);
  }
});
