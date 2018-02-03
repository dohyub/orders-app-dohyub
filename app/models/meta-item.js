import DS from 'ember-data';

export default DS.Model.extend({
  parentId: DS.attr('string'),
  market: DS.attr('string'),
  category: DS.attr('string'),
  title: DS.attr('string'),
  manufacturer: DS.attr('string'),
  image: DS.attr('string'),
  linkToMarket: DS.attr('string'),
  others: DS.attr(),
  createMetaCartItem(data) {
    const payload = this.serialize();
    payload.productId = this.get('id');
    this.supplyMetaCartItemPayload(payload);
    return this.store.createRecord('meta-cart-item', { ...payload, ...data });
  },
  supplyMetaCartItemPayload(payload) {
    throw { message:
      'Concrete MetaItem did not specify details when creating meta-cart-item'
    };
  }
});
