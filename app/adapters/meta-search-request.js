import DS from 'ember-data';

const ResponseGroup = [
  'Medium', 'SearchBins', 'Variations', 'Images',
  'OfferSummary', 'Offers',
  'OfferListings'
];

export default DS.RESTAdapter.extend({
  host: 'https://us-central1-npl-dev-fbbd9.cloudfunctions.net',
  namespace: 'meta-searchItems/',
  queryRecord(store, type, query) {
    const url = this.buildURL();
    const data = this.sortQueryParams(query);
    return this.ajax(url, 'POST', { data });
  },
  sortQueryParams({ SearchIndex, ...params }) {
    const defaults = {
      ResponseGroup,
      Availability: 'Available',
      Condition: 'New',
    };
    if (params.TopSellers == '') delete params.TopSellers;
    if (params.BrowseNode == '') delete params.BrowseNode;
    if (params.Keywords == '') delete params.Keywords;
    if (params.Retailer == '') delete params.Retailer;
    return {
      operation: 'ItemSearch',
      arguments: [SearchIndex, {...params, ...defaults}]
    };
  }
});
