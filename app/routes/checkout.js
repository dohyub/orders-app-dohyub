import Route from '@ember/routing/route';
import { action } from 'ember-decorators/object';

function extractOrGetUserToken(response) {
  const user = this.get('session.currentUser');
  if (user.get('anetUserToken') === null) {
    user.set('anetUserToken', response.customerProfileId);
  }
  return user.save();
}
function createPaymentProfile(anetUrl,requestData) {
  const user = this.get('session.currentUser');
  requestData.customerProfileId = user.get('anetUserToken');
  return Ember.$.ajax({
    type: "POST",
    url: anetUrl + "payment/",
    data: requestData,
    success: function(data){
      console.log(data);
    }
  });
}

export default Route.extend({
  beforeModel() {
    this.session.redirectGuestTo('signin');
  },
  model() {
    const postUrl = "https://us-central1-npl-dev-fbbd9.cloudfunctions.net/anetProfile-getPayment/";
    const user = this.get('session.currentUser');
    const shippings = user.get('shippingAddresses');
    const billings = user.get('billingAddresses');
    const cart = user.get('cart');
    const items = cart.then(cart => cart.get('metaCartItems'));
    const anetToken = user.get('anetUserToken');
    const payments = Ember.$.post(postUrl+"?customerProfileId="+anetToken).then(customer => {
      return customer.profile.paymentProfiles;
    }).catch(() => { return false; });    
    return Ember.RSVP.hash({
      user, shippings, cart, payments, billings, items
    });
  },
  updatePaymentsList() {
    const user = this.get('session.currentUser');
    const postUrl = "https://us-central1-npl-dev-fbbd9.cloudfunctions.net/anetProfile-getPayment/";
    const anetToken = user.get('anetUserToken');
    return Ember.$.post(postUrl+"?customerProfileId="+anetToken);
  },
  @action inputPayment() {
    this.controller.set('inputPaymentView', true);
  },
  @action inputShippingAddress() {
    this.controller.set('inputShippingAddressView', true);
  },
  @action inputBillingAddress() {
    this.controller.set('inputBillingAddressView', true);
  },
  @action inputPaymentClose() {
    this.controller.set('inputPaymentView', false);
  },
  @action inputShippingAddressClose() {
    this.controller.set('inputShippingAddressView', false);
  },
  @action inputBillingAddressClose() {
    this.controller.set('inputBillingAddressView', false);
  },
  @action createPayment(cardNumber, cardCode, zip, cardholder, expiration_month, expiration_year) {
    if (Ember.isEmpty(cardNumber)) { return alert('Enter cardNumber.'); }
    if (Ember.isEmpty(cardCode)) { return alert('Enter CVC.'); }
    if (Ember.isEmpty(zip)) { return alert('Enter zipcode.'); }
    if (Ember.isEmpty(cardholder)) { return alert('Enter cardholder.'); }
    if (Ember.isEmpty(expiration_month)) { return alert('Enter month.'); }
    if (Ember.isEmpty(expiration_year)) { return alert('Enter year.'); }
    this.controller.set('paymentSaveLoading', true);
    const model = this.currentModel;
    const user = this.get('session.currentUser');
    let errorCheck;
    let anetUrl = 'https://us-central1-npl-dev-fbbd9.cloudfunctions.net/anetProfile-';
    let requestData = { cardNumber, cardCode, zip, cardholder, expiration_month, expiration_year };
    const merchantCustomerId = user.get('id').slice(0,20);
    return Ember.$.post(anetUrl + 'customer/'+"?merchantCustomerId="+merchantCustomerId)
      .then(extractOrGetUserToken.bind(this))
      .then(createPaymentProfile.bind(this, anetUrl, requestData))
      .then(response => {
        errorCheck = response
        return this.updatePaymentsList().then(response => {
          return this.controller.set('model.payments', response.profile.paymentProfiles);
        });
      })
      .then(() => {
        if (errorCheck.messages.resultCode !== "Ok") { 
          alert("error");
        } else {
          alert("save success");
        }
        this.controller.set('paymentSaveLoading', false);
        this.controller.set('inputPaymentView', false);
        this.controller.set('payment', model.payments.get('firstObject'));
        console.log(errorCheck);
      });
  },
  @action createShippingAddress(firstName, lastName, street1, street2, city, state, zipcode, country, phoneNumber) {
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
      this.controller.set('inputShippingAddressView', false);
      this.controller.set('shipping', model.shippings.get('lastObject'));
    })
  },
  @action createBillingAddress(firstName, lastName, street1, street2, city, state, zipcode, country, phoneNumber) {
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
      this.controller.set('inputBillingAddressView', false);
      this.controller.set('billing', model.billings.get('lastObject'));
    })
  },
  @action deletePayment() {
    this.controller.set('paymentDeleteLoading', true);
    const user = this.get('session.currentUser');
    let payment = this.controller.get('payment');
    const postUrl = 'https://us-central1-npl-dev-fbbd9.cloudfunctions.net/anetProfile-deletePayment/';
    const anetPaymentId = payment.customerPaymentProfileId;
    const anetToken = user.get('anetUserToken');
    Ember.$.post(postUrl +"?customerProfileId="+anetToken+"&customerPaymentProfileId="+anetPaymentId).then(res => {
      if (res.messages.resultCode === 'Ok') {
        return this.updatePaymentsList();
      }    
    }).then(response => {
      this.controller.set('model.payments', response.profile.paymentProfiles);
      this.controller.set('paymentDeleteLoading', false);
      alert("Deleted.");
    })
  },
  @action deleteShippingAddress() {
    const user = this.get('session.currentUser');
    let address = this.controller.get('shipping');
    address.destroyRecord().then(() => {
      user.get('shippingAddresses').removeObject(address);
      user.save();
    });
  },
  @action deleteBillingAddress() {
    const user = this.get('session.currentUser');
    let address = this.controller.get('billing');
    address.destroyRecord().then(() => {
      user.get('billingAddresses').removeObject(address);
      user.save();
    });
  },
  @action requestOrder(model) {
    if (!this.controller.get('billing') || !this.controller.get('shipping') || !this.controller.get('payment')) {
      alert("Please select information");
      return;
    }
    const paymentProfile = this.controller.get('payment');
    const shipping = this.controller.get('shipping').toJSON();
    const billing = this.controller.get('billing').toJSON();
    // const metaCartItems = model.items.map(i => i.toJSON());
    // const selectedItems = model.items.filterBy('selectedItem',true);
    const metaCartItems = model.items.map(i => i.toJSON());
    const user = this.get('session.currentUser');
    const cart = model.cart;
    const email = this.currentModel.user.get('auth.email');
    const fullName = this.currentModel.user.get('fullName');
    const debug = false;
    delete shipping.createdAt;
    delete shipping.user;
    delete billing.createdAt;
    delete billing.user;
    const requestObj = {
      user: user,
      paymentProfile: paymentProfile,
      shipping: shipping,
      billing: billing,
      metaCartItems: metaCartItems,
      email: email,
      fullName: fullName,
      debug: debug
    };
    this.get('store').createRecord('request', requestObj).save().then(addr => {
      user.get('requests').pushObject(addr);
      return user.save();
    }).then(() => {
      cart.get('metaCartItems').removeObjects(model.items.toArray());
      cart.save().then(c => {
        return model.items.map(i => i.destroyRecord());
      })
    }).then(res => {
      this.session.redirectUserTo('order');
    });
  },
  setupController(controller, model) {
    this._super(...arguments);
    if (model.payments) {
      controller.set('payment', model.payments.get('firstObject'));
    }
    controller.set('shipping', model.shippings.get('firstObject'));
    controller.set('billing', model.billings.get('firstObject'));
  }
});
