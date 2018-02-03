import DS from 'ember-data';
import * as attrs from 'orders-app/models/attrs';

export default DS.Model.extend({
  createdAt: attrs.firebaseTimestamp,
  requestedAt: attrs.firebaseTimestamp,
  triggeredAt: DS.attr('date'),
  finishedAt: DS.attr('date'),
  isVoided: DS.attr('boolean'),
  isCaptured: DS.attr('boolean'),
  icon: DS.attr('string'),
  refTransId: DS.attr('string'),
  method: DS.attr('string'),
  amount: DS.attr('number'),
  descriptor: DS.attr('string'),
  captureFor: DS.attr('string'),
  transactionResponse: DS.attr('object'),
  messages: DS.attr('object')
});
