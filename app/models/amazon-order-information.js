import DS from 'ember-data';
import * as attrs from 'orders-app/models/attrs';

export default DS.Model.extend({
  amazonFinalized: DS.attr('boolean'),
  amazonOrderNumber: DS.attr('string'),
  amazonSubTotal: DS.attr('number'),
  amazonSalesTax: DS.attr('number'),
  amazonShippingFee: DS.attr('number'),
  amazonETA: DS.attr('string')
});
