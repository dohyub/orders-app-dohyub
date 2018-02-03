import DS from 'ember-data';
import Credential from 'orders-app/models/credential';

export default Credential.extend({
  // username: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
});
