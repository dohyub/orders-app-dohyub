import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForRelationship(key) {
    return key;
  },
  normalizeQueryRecordResponse(store, primaryModelClass, payload, id, requestType) {
    if (payload.meta) { // current version of ember data does not handle metadata
      store.set('meta', payload.meta);
    }
    const included = payload.included.copy();
    const jad = this._super(...arguments);
    jad.included.forEach((i, index) => {
      i.attributes = included[index].attributes;
    });
    return jad;
  }
});
