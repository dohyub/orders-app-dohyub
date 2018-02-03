import DS from 'ember-data';
import computed from '@ember-decorators/auto-computed';
import * as attrs from 'orders-app/models/attrs';

export default DS.Model.extend({
  debug: DS.attr('boolean'),
  createdAt: attrs.firebaseTimestamp,
  user: DS.belongsTo('user'),
  items: DS.attr(),
  messages: DS.hasMany('message'),
  cardinfo: DS.attr(),
  billing: DS.attr(),
  shipping: DS.attr(),
  credential: DS.attr(),
  estShipFee: DS.attr('object'),
  fullName: DS.attr('string'),
  email: DS.attr('string'),
  all_tracking_obtained: DS.attr('boolean'),
  status_updates: DS.attr('object'),
  screenshot_urls: DS.attr('object'),
  tracking: DS.attr('object'),
  tracking_images: DS.attr('object'),
  anetDone: DS.attr('boolean'),
  anetFail: DS.attr('boolean'),
  zincDone: DS.attr('object'),
  zincFail: DS.attr('boolean'),
  zincSuccess: DS.attr('object'),
  zincErrorCode: DS.attr('object'),
  zincErrormessage: DS.attr('object'),
  price_components: DS.attr('object'),
  caseClosed: DS.attr('boolean'),
  caseMarked: DS.attr('boolean'),
  @computed('all_tracking_obtained', 'anetDone', 'anetFail', 'zincFail',
      'zincSuccess', 'zincErrorCode') icon(ato, aDone, aFail, zFail, zSucc, zError) {
    if (ato) {
      return 'shipping';
    }
    if (aFail || zFail || zError) {
      return 'bug'
    }
    if (aDone === null || zSucc === null) {
      return 'loading setting'
    }
    return aDone && zSucc ? 'handshake' : 'bug';
  },
  @computed('zincErrorCode') amazonAccountLocked(ec) {
    return ec === 'account_locked_verification_required';
  },
  anetResponse: DS.attr('object'),
  zincResponse: DS.attr('object'),
  auth: DS.attr('object'),
});
