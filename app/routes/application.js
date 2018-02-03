import Route from '@ember/routing/route';
import { action } from 'ember-decorators/object';
import config from 'orders-app/config/environment';
import { service } from 'ember-decorators/service';

export default Route.extend({
  beforeModel() {
    return this.get('session.prefetch');
  },
  @action didTransition() {
    window.r = this;
    window.c = config
  }
});
