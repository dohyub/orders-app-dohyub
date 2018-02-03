import DS from 'ember-data';

// extractPolymorphicRelationship(relationshipModelName, relationshipHash, relationshipOptions)

export default DS.JSONSerializer.extend({
  primaryKey: 'RequestId',
  attrs: { // Model => Raw
    'ItemsFirst': 'ItemsFirst',
    'ItemsSecond': 'ItemsSecond'
  }
});
