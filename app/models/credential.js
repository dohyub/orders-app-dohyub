import DS from 'ember-data';
import * as attrs from 'orders-app/models/attrs';

export default DS.Model.extend({
  createdAt: attrs.firebaseTimestamp,
  user: DS.belongsTo('user')
});
