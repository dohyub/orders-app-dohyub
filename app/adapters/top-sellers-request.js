import DS from 'ember-data';

const ResponseGroup = [
  'Large', 'BrowseNodes'
];

export default DS.RESTAdapter.extend({
  host: 'http://localhost:3000/api',
  namespace: 'topSellers',
  queryRecord(store, type, query) {
    const url = this.buildURL();
    const data = this.sortQueryParams(query);
    console.log('query--->',query, 'data--->',data);
    return this.ajax(url, 'POST', { data }).then((response)=>{
      console.log('response',response);
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
