import DS from 'ember-data';

const ResponseGroup = [
  'Small', 'SearchBins', 'Variations', 'Images',
  'OfferSummary', 'Offers',
  // 'OfferListings'
];

export default DS.RESTAdapter.extend({
  host: 'https://us-central1-npl-dev-fbbd9.cloudfunctions.net',
  namespace: 'legacy-searchItems',
  queryRecord(store, type, query) {
    const url = this.buildURL();
    const data = this.sortQueryParams(query);
    // console.log('data:', data)
    return this.ajax(url, 'POST', { data }).then((response)=>{
      console.log('response',response);
      if (response.Item.length === 10) { 
        // not the right way, ht
        response.Item.length = 9;
      }
      return response;
    })
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
