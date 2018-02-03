import DS from 'ember-data';
import computed from '@ember-decorators/auto-computed';
import MetaItem from 'orders-app/models/meta-item';

const paths = {
  lowestNewPrice: 'others.OfferSummary.LowestNewPrice.Amount',
  fmtPrice: 'others.OfferSummary.LowestNewPrice.FormattedPrice',
  hasPrime: 'others.Offers.Offer.OfferListing.IsEligibleForPrime'
}

export default MetaItem.extend({
  description: DS.attr('string'),
  feature: DS.attr('string'),
  dimensions: DS.attr('amazon-dimension'),
  variations: DS.attr(),
  @computed(paths.lowestNewPrice) lowestNewPrice(amount) {
    return parseFloat(amount) / 100;
  },
  @computed(paths.fmtPrice) fmtPrice(price) {
    return price;
  },
  @computed(paths.hasPrime) hasPrime(flag) {
    return flag === '1' ? true : false;
  },
  supplyMetaCartItemPayload(payload) {
    payload.variations = this.get('variations');
    payload.price = this.get('lowestNewPrice');
  },
});
