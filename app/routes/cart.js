import Route from '@ember/routing/route';
import { action } from 'ember-decorators/object';

export default Route.extend({
  model() {
    const user = this.get('session.currentUser');
    const cart = user.get('cart');
    var url = "http://dev.nineple.com/api/getfavori?user="+user.email;
    const favorite = Ember.$.getJSON(url + "&callback=?").then(response => {
      return response;
    }).catch(err => {
      console.log(err);
    });
    return Ember.RSVP.hash({
      user, cart, favorite
    });
  },
  beforeModel() {
    this.session.redirectGuestTo('signin');
  },
  @action minus(item) {
    if (item.get('quantity') < 2) { return; }
    item.decrementProperty('quantity');
    item.save();
  },
  @action plus(item) {
    item.incrementProperty('quantity');
    item.save();
  },
  @action deleteItem(cartRef, item) {
    cartRef.get('metaCartItems').removeObject(item);
    cartRef.then(cart => cart.save()).then(() => {
      return item.destroyRecord();
    });
  },
  @action showDeleteModal(cart, item) {
    this.controller.set("item",item);
    this.controller.set("cart",cart);
  },
  @action saveOption(item) {
    item.save().then(res => {
      alert("save success");
    })
  },
  @action addToCart(item) {
    const user = this.get('session.currentUser');
    const cart = user.get('cart');
    let metaCart;
    let metaCartRes;
    const favoriteItem = {
      category: item.category,
      email: item.user_email,
      image: item.image,
      linkToMarket: item.linkToMarket,
      manufacturer: item.manufacturer,
      market: item.market,
      owner: user.get('fullName'),
      parentId: item.parentid,
      price: item.price,
      productId: item.productid,
      quantity: 1,
      title: item.title
      // createdAt: moment(new Date()).format('YYYY-MM-DD hh:mm')
    };
    Ember.RSVP.hash({ user, cart }).then(data => {
      data.mci = this.get('store').createRecord('metaCartItem', favoriteItem);
      data.cart.get('metaCartItems').pushObject(data.mci);
      return Ember.RSVP.all([ data.mci.save(), data.cart.save() ]);
    })
  },
  @action toCheckout() {
    this.session.redirectUserTo('checkout');
  },
});
