import DS from 'ember-data';

const ResponseGroup = [
  'Small', 'SearchBins', 'Variations', 'OfferSummary', 'Images'
];

export default DS.RESTAdapter.extend({
  host: 'https://us-central1-npl-dev-fbbd9.cloudfunctions.net',
  namespace: 'legacy-searchAdditionalItems',
  queryRecord(store, type, query) {
    const url = this.buildURL();
    const data = this.sortQueryParams(query);
    return this.ajax(url, 'POST', { data }).then((response)=>{
      return response;
    })
  },
  sortQueryParams({ SearchIndex, ...params }) {
    const defaults = {
      ResponseGroup,
      Availability: 'Available',
      Condition: 'New',
    };
    return {
      operation: 'ItemSearch',
      arguments: [SearchIndex, {...params, ...defaults}]
    };
  }
});
