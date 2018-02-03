import DS from 'ember-data';
import * as attrs from 'orders-app/models/attrs';
import computed from '@ember-decorators/auto-computed';

export default DS.Model.extend({
  createdAt: attrs.firebaseTimestamp,
  firstname: DS.attr('string'),
  lastname: DS.attr('string'),
  address1: DS.attr('string'),
  address2: DS.attr('string'),
  zipcode: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  country: DS.attr('string'),
  phonenumber: DS.attr('string'),
  user: DS.belongsTo('user'),
  @computed('firstname', 'lastname') fullName(f, l) {
    return `${f} ${l}`;
  },
  @computed('country', 'state', 'city', 'zipcode', 'address1', 'address2', 'phonenumber') fullAddress(cont, s, city, z, a1, a2, p) {
    return `${cont} ${s} ${city} ${z} ${a1} ${a2}`;
  }
});
