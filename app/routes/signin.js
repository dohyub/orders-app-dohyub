import Route from '@ember/routing/route';
import { action } from 'ember-decorators/object';

export default Route.extend({
  @action login(loginId, loginPassword) {
    this.controller.set('showLoading', true);
    this.session.signIn(loginId, loginPassword).then(r => {
      return r;
    }).then(r => {
      this.controller.set('showLoading', false);
      this.session.redirectUserTo('cart');
    }).catch(c => {
      alert(c.message);
      this.controller.set('showLoading', false);
    })
  }
});
