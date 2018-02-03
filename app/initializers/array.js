export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');
  Array.prototype.groupBy = function(prop) {
    const groups = this.reduce(function(groups, item) {
      const val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
    return Object.keys(groups).map(key => ({ group: key, items: groups[key] }));
  }
}

export default {
  name: 'array',
  initialize
};
