import { isPresent } from '@ember/utils';
import Service from '@ember/service';
import { Promise } from 'rsvp';
import { getOwner } from '@ember/application';
import { run } from '@ember/runloop';
import { service } from 'ember-decorators/service';
import computed from '@ember-decorators/auto-computed';

export default class extends Service {
  @service router;
  @service store;
  @service firebase;
  @service firebaseApp;
  @computed('currentUser') isValid(u) {
    return isPresent(u);
  }
  @computed('firebaseApp') fbauth(fbapp) {
    return fbapp.auth();
  }
  @computed('fbauth') prefetch(fbauth) {
    let off;
    return new Promise((resolve, reject) => {
      off = fbauth.onAuthStateChanged(auth => resolve(this.onAuth(auth)), reject);
    }).then(off);
  }
  onAuth(auth) {
    return auth ? this.onSignIn(auth) : this.onSignOut(auth);
  }
  onSignIn(auth) {
    const json = { online: true, ...auth.toJSON() };
    return this.get('store').findRecord('user', auth.uid).catch(() => {
      return this.get('store').createRecord('user', { id: auth.uid });
    }).then(user => {
      user.setProperties(json);
      return user.save();
    }).then(user => {
      // user.ref().child('online').onDisconnect().set(null);
      user.set('auth', auth.toJSON());
      this.set('currentUser', user);
      return user;
    });
  }
  onSignOut() {
    const user = this.get('currentUser');
    if (!user) return;
    user.unloadRecord(); // store.unloadAll does the job? or not?
    // user.ref().child('online').set(null);
    this.get('store').unloadAll();
    this.set('currentUser', null);
  }
  signIn(email, password) {
    return this.get('fbauth').signInWithEmailAndPassword(
      email, password).then(run.bind(this, 'onSignIn'));
  }
  signUp(email, password, displayName) {
    return this.get('fbauth').createUserWithEmailAndPassword(
      email, password
    ).then(auth => auth.updateProfile({ displayName }).then(() => auth)
    ).then(run.bind(this, 'onSignIn'));
  }
  signOut() {
    return this.get('fbauth').signOut().then(run.bind(this, 'onSignOut'));
  }
  refreshAppRoute() {
    return getOwner(this).lookup('route:application').refresh();
  }
  redirectGuestTo(route, transition) {
    if (transition) {
      this.set('previousTransition', transition);
    }
    if (this.get('currentUser')) return;
    return this.get('router').transitionTo(route);
  }
  redirectUserTo(route) {
    if (this.get('currentUser')) {
      return this.get('router').transitionTo(route);
    }
  }
  sendPasswordResetEmail(email) {
    return this.get('fbauth').sendPasswordResetEmail(email);
  }
  confirmPasswordReset(oobCode, password) {
    return this.get('fbauth').confirmPasswordReset(oobCode, password);
  }
};
