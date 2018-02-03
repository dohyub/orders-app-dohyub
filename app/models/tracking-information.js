import DS from 'ember-data';
import * as attrs from 'orders-app/models/attrs';

export default DS.Model.extend({
  trackingObtained: DS.attr('boolean'),
  trackingCarrier: DS.attr('string'),
  trackingNumber: DS.attr('string'),
  trackingURL: DS.attr('string'),
});
