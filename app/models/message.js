import DS from 'ember-data';
import * as attrs from 'orders-app/models/attrs';

export default DS.Model.extend({
  createdAt: attrs.firebaseTimestamp,
  body: DS.attr('string'),
  icon: DS.attr('string'),
  time: DS.attr('date'),
  type: DS.attr('string'),
  isEvent: DS.attr('boolean'),
  exceptionCompleted: DS.attr('boolean'),
  isShipping: DS.attr('boolean'),
  internationalShipping: DS.attr('boolean')
});
