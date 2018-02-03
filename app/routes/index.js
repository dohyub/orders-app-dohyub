import Route from '@ember/routing/route';
import { action } from 'ember-decorators/object';

export default Route.extend({
  beforeModel() {
    this.session.redirectGuestTo('signin');
    this.session.redirectUserTo('cart');
  }
});
