import Controller from '@ember/controller';
import { action } from 'ember-decorators/object';
import computed from '@ember-decorators/auto-computed';
import shipCalc from 'orders-app/utils/ship-calc';
import Ember from 'ember';

export default Controller.extend({
  // itemQuantities: Ember.computed.mapBy('model.cart.metaCartItems', 'quantity'),
  // totalItemCount: Ember.computed.sum('itemQuantities'),
  selectedItems: Ember.computed.filterBy('model.cart.metaCartItems', 'selectedItem', true),
  selectedItemQuantities: Ember.computed.mapBy('selectedItems', 'quantity'),
  selectedItemsCount: Ember.computed.sum('selectedItemQuantities'),
  itemTotalPrices: Ember.computed.mapBy('selectedItems', 'totalPrice'),
  totalItemPrice: Ember.computed.sum('itemTotalPrices'),
  @computed('totalItemPrice') fmtTotalItemPrice(p) {
    return p.toFixed(2);
  },
  @computed('selectedItems') totalShippingFee(items) {
    const vs = this.get('selectedItems').getEach('volumeByQty').reduce((x, y) => x + y);
    const ws = this.get('selectedItems').getEach('weightByQty').reduce((x, y) => x + y);
    const index = Math.ceil(Math.max(vs, ws));
    const fee = shipCalc[index] * 1.1;
    return parseFloat(fee.toFixed(2));
  },
  @computed('selectedItems') isAllShippable(items) {
    return this.get('selectedItems').every(i => i.get('isShippable'));
  },
  @action setPayment(p) {
    this.set('payment', p);
  },
  @action setShipping(s) {
    this.set('shipping', s);
  },
  @action setBilling(b) {
    this.set('billing', b);
  }
});
