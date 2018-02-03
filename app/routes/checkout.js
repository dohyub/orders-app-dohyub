import Route from '@ember/routing/route';
import { action } from 'ember-decorators/object';

export default Route.extend({
  model() {
    const user = this.get('session.currentUser');
    const shippings = user.get('shippingAddresses');
    const cart = user.get('cart');
    return Ember.RSVP.hash({
      user, shippings, cart
    });
  },
  @action inputPayment() {
    console.log("inputPayment");
    this.controller.set('inputPaymentView', true);
  },
  @action inputAddress() {
    this.controller.set('inputAddressView', true);
  },
  @action inputPaymentClose() {
    this.controller.set('inputPaymentView', false);
  },
  @action inputAddressClose() {
    this.controller.set('inputAddressView', false);
  },
  @action createPayment(number, cvc, zipcode, name, month, year) {
    console.log("createPayment");
  },
  @action createAddress(firstName, lastName, street1, street2, city, state, zipcode, country, phoneNumber) {
    console.log("createAddress");
    // let newShippingAddress;
    // let user = this.session.currentUser;
    // let sessionUser;
    // let sessionUserShippingAddresses;    
    // let shippingAddressObj = {
    //   user: user,
    //   firstname: firstName,
    //   lastname: lastName,
    //   address1: street1,
    //   address2: street2,
    //   city: city,
    //   country: country,
    //   phonenumber: phoneNumber,
    //   state: state,
    //   zipcode: zipcode
    // };
    let user = this.session.currentUser;
    let shippingAddressObj = { firstName, lastName, street1, street2, city, state, zipcode, country, phoneNumber };
    this.get('store').createRecord('shippingAddress', shippingAddressObj).save().then(addr => {
      //user.get('shippingAddresses').pushObject(addr);
      //return user.save();
    }).then(res => {
      debugger;
    })
    // this.get('store').createRecord('shippingAddress', shippingAddressObj).save().then(res => {
    //   return res
    // }).then(res => {
    //   sessionUserShippingAddresses = user.get('shippingAddresses');
    //   sessionUserShippingAddresses.pushObject(res);
    //   return user.save();
    // }).then(res => {
    //   return sessionUserShippingAddresses.get('currentState.lastObject.id');
    // }).then(res => {
    //   return this.get('store').findRecord('shippingAddress', res);
    // }).then(res => {
    //   return user.set('selectedShippingAddress', res);
    // }).then(res => {
    //   return user.save();
    // }).then(res => {
    //   console.log("create");
    // })
  },
  @action deletePayment() {
    console.log("delete");
  },
  @action deleteAddress() {
    console.log("delete");
  },
  @action requestOrder() {
    console.log('requestOrder');
    
    // this.session.redirectUserTo('reflex-page.order');
  },
  setupController(controller, model) {
    this._super(...arguments);
    controller.set('shipping', model.shippings.get('firstObject'));
  }
});
