import FirebaseSerializer from 'emberfire/serializers/firebase';

export default FirebaseSerializer.extend({
  attrs: {
    messages: { embedded: 'always' },
    functions: { embedded: 'always' },
    authorizations: { embedded: 'always' },
    trackingInformations: { embedded: 'always' },
    amazonOrderInformations: { embedded: 'always' }
  }
});
