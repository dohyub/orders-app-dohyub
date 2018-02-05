import Controller from '@ember/controller';
import computed from '@ember-decorators/auto-computed';

export default Controller.extend({
   itemSubTotals: Ember.computed.mapBy('model.amazonOrderInformations', 'amazonSubTotal'),
   itemTotalPrices: Ember.computed.sum('itemSubTotals'),
   itemSalesTaxes: Ember.computed.mapBy('model.amazonOrderInformations', 'amazonSalesTax'),
   itemTotalTaxes: Ember.computed.sum('itemSalesTaxes'),
   itemShippingFees: Ember.computed.mapBy('model.amazonOrderInformations', 'amazonShippingFee'),
   itemTotalFees: Ember.computed.sum('itemShippingFees'),
   progress: null,
   @computed('itemTotalPrices', 'itemTotalTaxes', 'itemTotalFees') sumTotalItemPrice(p,t,f) {
       let sum = Number(p)+Number(t)+Number(f);
       if(sum === 0) { return; }
       return sum.toFixed(2);
   },
   @computed('sumTotalItemPrice', 'model') totalCharge(p,model) {
       let shippingFee = model.get('moniebinFeeTotal');
       let totalSum = Number(p) + Number(shippingFee);
       if(isNaN(totalSum)) { return; }
       return Number(totalSum).toFixed(2);
   }
});