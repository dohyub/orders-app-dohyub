import DS from 'ember-data';

export function initialize(/* application */) {
  DS.Store.reopen({
    _push(/*payload*/) {
      const pushed = this._super(...arguments);
      // for possible bug emberfire/addon/initializers/emberfire.js#66
      return pushed || [];
    }
  });
}

export default {
  name: 'emberfire-patch',
  before: 'emberfire',
  initialize
};
