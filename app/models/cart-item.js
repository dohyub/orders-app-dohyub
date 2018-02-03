import DS from 'ember-data';
import * as attrs from 'orders-app/models/attrs';
import computed from '@ember-decorators/auto-computed';
import shipCalc from 'orders-app/utils/ship-calc';

export default DS.Model.extend({
  createdAt: attrs.firebaseTimestamp,
  offerListingId: DS.attr('string'),
  detailPageUrl: DS.attr('string'),
  ASIN: DS.attr('string'),
  PASIN: DS.attr('string'),
  title: DS.attr('string'),
  binding: DS.attr('string'),
  manufacturer: DS.attr('string'),
  author: DS.attr('string'),
  modelItem: DS.attr('string'),
  image: DS.attr('string'),
  quantity: DS.attr('number'),
  price: DS.attr('number'),
  cart: DS.belongsTo('cart'),
  retailer: DS.attr('string'),
  addToCartUrl: DS.attr('string'),
  packageDimensions: DS.attr(),
  variationAttributes: DS.attr('object'),
  // these two will be used to estimate actual shipping fee.
  @computed('packageDimensions', 'quantity') volumeByQty({ height, width, length }, q) {
    return ((height * width * length) / 139) * q;
  },
  @computed('packageDimensions', 'quantity') weightByQty({ weight }, q) {
    return weight * q;
  },

  // below two will be used at checkout route to determine shippable status for each item.
  @computed('packageDimensions', 'quantity') shippingFeeByQty({ height, width, length, weight }, q) {
    const amount = Math.max(weight, (height * width * length)/139);
    const rounded = Math.ceil(amount * q);
    const fee = shipCalc[rounded] * 1.1;
    return fee;
  },
  @computed('shippingFeeByQty') isShippable(fee) {
    return !isNaN(fee);
  },
  // @computed('shippingFee') formattedShippingFee(f) {
  //   return '$' + f.toFixed(2);
  // },
  @computed('price') formattedPrice(p) {
    return `$${p/100}`;
  },
  @computed('price', 'quantity') totalPrice(p, q) {
    return p * q;
  },
  // @computed('quantity', 'shippingFee') totalShippingFee(q, s) {
  //   return q * s;
  // },
  // @computed('price', 'quantity', 'shippingFee') totalPriceWithShip(p, q, s) {
  //   return (p * q / 100) + (s * q);
  // },
  @computed('totalPrice') formattedTotalPrice(tp) {
    return (tp/100).toFixed(2);
  },
  // @computed('quantity', 'shippingFee', 'totalPrice') formattedEstTotalPrice(q, s, tp) {
  //   return (tp/100 + q*s).toFixed(2);
  // },
});
