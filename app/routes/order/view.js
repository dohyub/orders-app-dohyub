import Route from '@ember/routing/route';
import { action } from 'ember-decorators/object';

export default Route.extend({
  model(params) {
    return this.store.findRecord('request', params.id);
  },
  @action requestCancel() {
    this.controller.set('cancelLoading', true);
    const url = 'https://us-central1-npl-dev-fbbd9.cloudfunctions.net/get_moniebin';
    const order = this.currentModel;
    const oid = order.get('id');
    const payload = { oid, aid: '9ple' };
    Ember.$.get(url, payload).then(({ Response: { Result, Status } }) => {
      if(Status.TrackingNo === "") { return; }
      else { reject(); }
    }).then(() => {
      order.set('reqCancel', true);
      order.set('icon', 'yellow warning');
      const messages=order.get('messages');
      let message = this.store.createRecord('message', {
        icon: 'yellow warning',
        type: 'positive',
        body: 'Your cancellation request has been received.'
      });
      messages.pushObject(message);
      this.controller.set('cancelLoading', false);
      UIkit.modal('#modal-cancel').hide();
      UIkit.modal('#modal-cancel-success').show();  
      return order.save();
    }).catch(err => {
      console.log(err);
      this.controller.set('cancelLoading', false);
      UIkit.modal('#modal-cancel').hide();
      UIkit.modal('#modal-cancel-error').show();  
    })
  },
  setupController(controller, model) {
    this._super(...arguments);
    switch (model.get('icon')) {
      case "crosshairs" :
        controller.set('progress', 20);
        break;
      case "yellow cube" :
        controller.set('progress', 40);
        break;
      case "green shipping" :
        controller.set('progress', 60);
        break;
      case "green plane" :
        controller.set('progress', 80);
        break;
      case "green check" :
        controller.set('progress', 100);
        break;
      default :
        controller.set('progress', 0);  
    }
  }
});
