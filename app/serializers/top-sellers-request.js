import DS from 'ember-data';

// extractPolymorphicRelationship(relationshipModelName, relationshipHash, relationshipOptions)

export default DS.JSONSerializer.extend({
  primaryKey: 'RequestId',
  extractRelationship(relationshipModelName, relationshipHash) {

    return {
      id: relationshipHash.ASIN,
      type: relationshipModelName,
      attributes: relationshipHash
    };
  },
  normalizeQueryRecordResponse(/*store, primaryModelClass, payload, id, requestType*/) {
    const jad = this._super(...arguments); // JSON-API Document
    jad.included.pushObjects(jad.data.relationships.Items.data);
    // json api related link usage
    // **inside serializer
    // const related = jad.data.attributes.MoreSearchResultsUrl;
    // jad.data.relationships.More = { links: { related } };
    // **inside Model
    // More: DS.belongsTo('item-search-request'),
    return jad;
  },
  attrs: { // Model => Raw
    'Items': 'Item'
  }
});
