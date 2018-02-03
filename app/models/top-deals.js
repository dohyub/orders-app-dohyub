import DS from 'ember-data';
import * as attrs from 'orders-app/models/attrs';

export default DS.Model.extend({
  // createdAt: attrs.firebaseTimestamp,
  title: DS.attr('string'),
  description: DS.attr('string'),
  retailer: DS.attr('string'),
  lookupLink: DS.attr('string'),
  imgUrl: DS.attr('string'),
  // createdOnFormatted: format(locale(momentComputed('createdAt'), 'moment.locale'), 'MMMM DD, YYYY')
});
