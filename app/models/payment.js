import DS from 'ember-data';

export default DS.Model.extend({
  cardholder: DS.attr('string'),
  number: DS.attr('string'),
  security_code: DS.attr('string'),
  expiration_month: DS.attr('string'),
  expiration_year: DS.attr('string'),
  isDefault: DS.attr('boolean'),
  user: DS.belongsTo('user'),
  note: DS.attr('string', { defaultValue: 'DEBUG PURPOSE ONLY' })
});
