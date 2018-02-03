import DS from 'ember-data';
import * as attrs from 'orders-app/models/attrs';

export default DS.Model.extend({
  method: DS.attr('string'),
  createdAt: attrs.firebaseTimestamp,
  requestedAt: attrs.firebaseTimestamp,
  triggeredAt: DS.attr('date'),
  finishedAt: DS.attr('date')
});
