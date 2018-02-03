import DS from 'ember-data';

const ResponseGroup = [
  'Variations'
];

export default DS.RESTAdapter.extend({
  host: 'https://us-central1-npl-dev-fbbd9.cloudfunctions.net',
  namespace: 'meta-lookupVariations/',
  queryRecord(store, type, query) {
    const url = this.buildURL();
    const data = this.sortQueryParams(query);
    return this.ajax(url, 'POST', { data });
  }
});
