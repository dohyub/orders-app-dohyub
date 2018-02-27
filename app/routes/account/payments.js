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
  model() {
    const user = this.get('session.currentUser');
    const postUrl = "https://us-central1-npl-dev-fbbd9.cloudfunctions.net/anetProfile-getPayment/";
    const anetToken = user.get('anetUserToken');
    const payments = Ember.$.post(postUrl+"?customerProfileId="+anetToken).then(response => {
      return response.profile.paymentProfiles;
    }).catch(err => { console.log(err); });
    let cardInfo;
    let cardNumber;
    const requestInfo = this.get('session.currentUser.requests').then(res => {
      cardInfo = res.filterBy('reqCancel',true);
      cardNumber = cardInfo.map(function(i) {
        if (i.get('paymentProfile')) {
          return  i.get('paymentProfile').payment.creditCard.cardNumber;
        }
      });
      return cardNumber;
    });
    return Ember.RSVP.hash({
      user, payments, requestInfo
    });
  },
  updatePaymentsList() {
    const user = this.get('session.currentUser');
    const postUrl = "https://us-central1-npl-dev-fbbd9.cloudfunctions.net/anetProfile-getPayment/";
    const anetToken = user.get('anetUserToken');
    return Ember.$.post(postUrl+"?customerProfileId="+anetToken);
  },
  @action showDeleteModal(payment) {
    this.controller.set('payment', payment);
    UIkit.modal('#modal-payment-delete').show();
  },
  @action modalPayment() {
    UIkit.modal('#show-input-payment').show()
  },
  @action createPayment(cardNumber, cardCode, zip, cardholder, expiration_month, expiration_year) {
    if (Ember.isEmpty(cardNumber)) { return alert('Enter cardNumber.'); }
    if (Ember.isEmpty(cardCode)) { return alert('Enter CVC.'); }
    if (Ember.isEmpty(zip)) { return alert('Enter zipcode.'); }
    if (Ember.isEmpty(cardholder)) { return alert('Enter cardholder.'); }
    if (Ember.isEmpty(expiration_month)) { return alert('Enter month.'); }
    if (Ember.isEmpty(expiration_year)) { return alert('Enter year.'); }
    this.controller.set('paymentSaveLoading', true);
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
          return this.controller.set('model', response.profile.paymentProfiles);
        });
      })
      .then(() => {
        if (errorCheck.messages.resultCode !== "Ok") { 
          alert("error");
        } else {
          alert("save success");
        }
        this.controller.set('paymentSaveLoading', false);
        UIkit.modal('#show-input-payment').hide()
        
        console.log(errorCheck);
      });
  },
  @action inputPaymentClose() {
    UIkit.modal('#show-input-payment').hide();
  },
  @action deletePayment() {
    this.controller.set('deleteLoading', true);
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
      this.controller.set('model', response.profile.paymentProfiles);
      this.controller.set('deleteLoading', false);
      UIkit.modal('#modal-payment-delete').hide();
      alert("Deleted.");
    })
  }
});
