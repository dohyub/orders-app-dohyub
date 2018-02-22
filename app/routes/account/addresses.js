import Route from '@ember/routing/route';
import { action } from 'ember-decorators/object';

export default Route.extend({
  model() {
    const user = this.get('session.currentUser');
    const shippings = user.get('shippingAddresses');
    const billings = user.get('billingAddresses');
    return Ember.RSVP.hash({
      user, shippings, billings
    });
  },
  @action createShipping(firstName, lastName, street1, street2, city, state, zipcode, country, phoneNumber) {
    if (Ember.isEmpty(firstName)) { return alert('Please type your firstName.'); }
    if (Ember.isEmpty(lastName)) { return alert('Please type your lastName.'); }
    if (Ember.isEmpty(street1)) { return alert('Please type your street1.'); }
    if (Ember.isEmpty(city)) { return alert('Please type your city.'); }
    if (Ember.isEmpty(state)) { return alert('Please type your state.'); }
    if (Ember.isEmpty(zipcode)) { return alert('Please type your zipcode.'); }
    if (Ember.isEmpty(country)) { return alert('Please type your country.'); }
    if (Ember.isEmpty(phoneNumber)) { return alert('Please type your phoneNumber.'); }
    const user = this.get('session.currentUser');
    const model = this.currentModel;    
    const shippingAddressObj = {
      user: user,
      firstname: firstName,
      lastname: lastName,
      address1: street1,
      address2: street2,
      city: city,
      country: country,
      phonenumber: phoneNumber,
      state: state,
      zipcode: zipcode
    };
    this.get('store').createRecord('shippingAddress', shippingAddressObj).save().then(addr => {
      user.get('shippingAddresses').pushObject(addr);
      return user.save();
    }).then(() => {
      alert("save success");
      UIkit.modal('#show-input-shipping').hide(); 
    })
  },
  @action createBilling(firstName, lastName, street1, street2, city, state, zipcode, country, phoneNumber) {
    if (Ember.isEmpty(firstName)) { return alert('Please type your firstName.'); }
    if (Ember.isEmpty(lastName)) { return alert('Please type your lastName.'); }
    if (Ember.isEmpty(street1)) { return alert('Please type your street1.'); }
    if (Ember.isEmpty(city)) { return alert('Please type your city.'); }
    if (Ember.isEmpty(state)) { return alert('Please type your state.'); }
    if (Ember.isEmpty(zipcode)) { return alert('Please type your zipcode.'); }
    if (Ember.isEmpty(country)) { return alert('Please type your country.'); }
    if (Ember.isEmpty(phoneNumber)) { return alert('Please type your phoneNumber.'); }
    const user = this.get('session.currentUser');
    const model = this.currentModel;    
    const billingAddressObj = {
      user: user,
      firstname: firstName,
      lastname: lastName,
      address1: street1,
      address2: street2,
      city: city,
      country: country,
      phonenumber: phoneNumber,
      state: state,
      zipcode: zipcode
    };
    this.get('store').createRecord('billingAddress', billingAddressObj).save().then(addr => {
      user.get('billingAddresses').pushObject(addr);
      return user.save();
    }).then(() => {
      alert("save success");
      UIkit.modal('#show-input-billing').hide(); 
    })
  },
  @action showShippingDelete(address) {
    this.controller.set('shipping', address);
    UIkit.modal('#modal-shipping-delete').show();
  },
  @action showBillingDelete(address) {
    this.controller.set('billing', address);
    UIkit.modal('#modal-billing-delete').show();
  },
  @action deleteShippingAddress() {
    const user = this.get('session.currentUser');
    let address = this.controller.get('shipping');
    address.destroyRecord().then(() => {
      user.get('shippingAddresses').removeObject(address);
      return user.save();
    }).then(res => {
      UIkit.modal('#modal-shipping-delete').hide();
      alert("delete success");
    })
  },
  @action deleteBillingAddress() {
    const user = this.get('session.currentUser');
    let address = this.controller.get('billing');
    address.destroyRecord().then(() => {
      user.get('billingAddresses').removeObject(address);
      return user.save();
    }).then(res => {
      UIkit.modal('#modal-billing-delete').hide();
      alert("delete success");
    })
  },
  @action shippingModalHide() {
    UIkit.modal('#show-input-shipping').hide();
  },
  @action billingModalHide() {
    UIkit.modal('#show-input-billing').hide();
  },
  @action editModalHide() {
    UIkit.modal('#show-modify').hide();
  },
  @action modifyAddress(address) {
    this.controller.set('address', address);
    UIkit.modal('#show-modify').show();
  },
  @action editAddress(firstName, lastName, street1, street2, city, state, zipcode, country, phoneNumber) {
    let address = this.controller.get('address');
    address.set('firstname',firstName);
    address.set('lastname',lastName);
    address.set('address1',street1);
    address.set('address2',street2);
    address.set('zipcode',zipcode);
    address.set('city',city);
    address.set('state',state);
    address.set('country',country);
    address.set('phonenumber',phoneNumber);
    address.save().then(() => {
      UIkit.modal('#show-modify').hide();
      alert("save success");
    });
  }
});
