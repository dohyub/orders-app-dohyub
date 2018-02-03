import Route from '@ember/routing/route';
import { action } from 'ember-decorators/object';

export default Route.extend({
  @action signUp(newName, newEmail, newPassword, reEnterPassword) {
    if (Ember.isEmpty(newName)) {
      return alert('Name is missing.');
    }
    if (Ember.isEmpty(newEmail)) {
      return alert('Email is missing.');
    }
    if (Ember.isEmpty(newPassword)) {
      return alert('Password is missing.');
    }
    if (Ember.isEmpty(reEnterPassword)) {
      return alert('ReEnterPassword is missing.');
    }
    if (newPassword !== reEnterPassword) {
      return alert("Reentered Password does not match Password");
    }
    this.controller.set('showLoading', true);
    this.session.signUp(newEmail,newPassword,newName).then(r => {
      alert("success");
      return r;
    }).then(r => {
      this.controller.set('showLoading', false);
      this.session.redirectUserTo('signin');
    }).catch(c => {
      alert(c.message);
      this.controller.set('showLoading', false);
    });
  }
});
