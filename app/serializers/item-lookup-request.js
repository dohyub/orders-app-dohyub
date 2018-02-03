import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  primaryKey: 'RequestId',
  extractRelationship(relationshipModelName, relationshipHash) {
    return {
      id: relationshipHash.ASIN,
      type: relationshipModelName,
      attributes: relationshipHash
    };
  },
  // normalizeCreateRecordResponse(/*store, primaryModelClass, payload, id, requestType*/) {
  //   const jad = this._super(...arguments);
  //   jad.included.pushObject(jad.data.relationships.Item.data);
  //   return jad;
  // },
  normalizeQueryRecordResponse(/*store, primaryModelClass, payload, id, requestType*/) {
    const jad = this._super(...arguments);
    if (jad.data.relationships.Item) {
      jad.included.pushObject(jad.data.relationships.Item.data);
    }
    jad.included.pushObject(jad.data.relationships.VariationParent.data);
    try {
      jad.included.pushObjects(jad.data.relationships.VariationItems.data);
    } catch(err) {
    }
    return jad;
  },
});
