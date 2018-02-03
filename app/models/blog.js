import DS from 'ember-data';
import * as attrs from 'orders-app/models/attrs';
import momentComputed from 'ember-moment/computeds/moment';
import format from 'ember-moment/computeds/format';
import locale from 'ember-moment/computeds/locale';

export default DS.Model.extend({
  createdAt: attrs.firebaseTimestamp,
  title: DS.attr('string'),
  shortText: DS.attr('string'),
  longText: DS.attr('string'),
  smallImage: DS.attr('string'),
  largeImage: DS.attr('string'),
  createdOnFormatted: format(locale(momentComputed('createdAt'), 'moment.locale'), 'MMMM DD, YYYY')
});
