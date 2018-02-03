import FirebaseAdapter from 'emberfire/adapters/firebase';

export default FirebaseAdapter.extend({
  shouldReloadRecord: function(store, snapshot) {
    return true;
  },

  shouldReloadAll: function(store, snapshot) {
    return true;
  },

  shouldBackgroundReloadRecord: function(store, snapshot) {
    return true;
  },

  shouldBackgroundReloadAll: function(store, snapshot) {
    return true;
  }
});
