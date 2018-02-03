import DS from 'ember-data';

const ResponseGroup = [
  // 'Large', 'Variations'
  'Images', 'ItemAttributes', 'Offers', 'EditorialReview',
  'Variations'
];
const defaults = {
  ResponseGroup
};

export default DS.RESTAdapter.extend({
  host: 'https://us-central1-npl-dev-fbbd9.cloudfunctions.net',
  namespace: 'legacy-lookupItems',
  // createRecord(store, type, snapshot) {
  //   const url = this.buildURL();
  //   const data = {
  //     operation: 'ItemLookup',
  //     arguments: [snapshot.adapterOptions.ID,snapshot.adapterOptions.Retailer, defaults]
  //   };
  //   return this.ajax(url, 'POST', { data }).then((response)=>{
  //     console.log('response',response);
  //     return response;
  //   });
  // },
  queryRecord(store, type, query) {
    const url = this.buildURL();
    var id;
    if (query.Retailer === 'amazon') {
      id = query.PASIN;
      if (!query.PASIN || query.PASIN === undefined || query.PASIN === 'undefined') {
       id = query.ID;
      }
    } else {
      id = query.ID;
    }
    const data = {
      operation: 'ItemLookup',
      arguments: [id, query.Retailer, defaults]
    };
    return this.ajax(url, 'POST', { data }).then((response)=>{
      response.VariationParent = response.Item;
      const vs = response.Item.Variations;
      if (!!vs) {
        vs.Item = Ember.$.makeArray(vs.Item);
        const vMatrix = {};
        const vds = Ember.$.makeArray(vs.VariationDimensions.VariationDimension);
        // for (let vd of vds) {
        //   vMatrix[vd] = [];
        // }
        vds.forEach(vd => {
          vMatrix[vd] = [];
        });
        // for (let vi of vs.Item) {
        //   let vas = Ember.$.makeArray(vi.VariationAttributes.VariationAttribute);
        //   vi.VariationAttributes = {};
        //   for (let va of vas) {
        //     vMatrix[va.Name].addObject(va.Value);
        //     vi.VariationAttributes[va.Name] = va.Value;
        //   }
        // }
        vs.Item.forEach(vi => {
          let vas = Ember.$.makeArray(vi.VariationAttributes.VariationAttribute);
          vi.VariationAttributes = {};
          vas.forEach(va => {
            vMatrix[va.Name].addObject(va.Value);
            vi.VariationAttributes[va.Name] = va.Value;
          });
        });
        response.VariationItems = vs.Item;
        response.hasVariation = !!vs;
        response.Item = vs.Item.findBy('ASIN', query.ID); // main
        response.VariationParent.TotalVariationPages = vs.TotalVariationPages;
        response.VariationParent.TotalVariations = vs.TotalVariations;
        response.VariationParent.VariationDimensions = vds;
        response.VariationParent.VariationMatrix = vMatrix;
      } else {
      }
      return response;
    })
  },
});
