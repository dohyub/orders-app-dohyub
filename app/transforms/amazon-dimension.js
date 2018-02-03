import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return serialized;
  },
  serialize(deserialized) {
    try {
      const height = parseFloat(deserialized.Height._) / 100;
      const length = parseFloat(deserialized.Length._) / 100;
      const weight = parseFloat(deserialized.Weight._) / 100;
      const width =  parseFloat(deserialized.Width._) / 100;
      return { height, length, weight, width };
    } catch(err) {
      return {};
    }
  }
});
