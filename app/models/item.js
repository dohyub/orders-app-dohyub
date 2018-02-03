import DS from 'ember-data';
import computed from '@ember-decorators/auto-computed';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  // Basic fields
  idStorage: attr(),
  ASIN: attr(),
  DetailPageURL: attr(),
  AddToCartUrl: attr(),
  ItemAttributes: attr(),
  ItemLinks: attr(),
  OfferSummary: attr(),
  ParentASIN: attr(),
  SmallImage: attr(),
  LargeImage: attr(),
  MediumImage: attr(),
  ImageSets: attr(),
  // Advanced fields
  Offers: attr(),
  BrowseNodes: attr(),
  SimilarProducts: attr(),
  EditorialReviews: attr(),
  @computed('Offers.Offer.OfferListing.IsEligibleForPrime') isPrime(prime) {
    return prime === "1" ? true : false;
  },
  Retailer: attr(),
  // variations if any
  // variation prototype will have the following three
  TotalVariationPages: attr(),
  TotalVariations: attr(),
  VariationDimensions: attr(),
  VariationMatrix: attr(),
  // each variation will have this instead
  VariationAttributes: attr()

});
