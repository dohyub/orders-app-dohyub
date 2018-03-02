import Route from '@ember/routing/route';
import { action } from 'ember-decorators/object';

export default Route.extend({
  model() {
    const user = this.get('session.currentUser');
    const cart = user.get('cart');
    var url = "https://dev.nineple.com/api/getfavori?user="+user.email;
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
  updateFavorite() {
    const user = this.get('session.currentUser');
    var url = "https://dev.nineple.com/api/getfavori?user="+user.email;
    return Ember.$.getJSON(url + "&callback=?").then(response => {
      return response;
    }).catch(err => {
      console.log(err);
    });
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
    let url = "https://dev.nineple.com/api/updatefavori";
    let data = "?user="+item.get('email')+"&productid="+item.get('productId')+"&market="+item.get('market')+"&mode=outcart"
    return Ember.$.getJSON(url + data + "&callback=?").then(response => {
      return response;
    }).catch(err => {
      console.log(err);
    }).then(() => {
      return this.updateFavorite();
    }).then(res => {
      return this.controller.set('model.favorite', res);
    }).then(() => {
      cartRef.get('metaCartItems').removeObject(item);
      return cartRef;
    }).then(cart => {
      return cart.save();
    }).then(() => {
      return item.destroyRecord();
    })
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
    let url = "https://dev.nineple.com/api/updatefavori";
    let data = "?user="+item.user_email+"&productid="+item.productid+"&market="+item.market
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
    return Ember.$.getJSON(url + data + "&mode=incart" + "&callback=?").then(response => {
      if (response.result_code === "00") { return; }
      else {
        throw response.result_text;
      }
    }).then(() => {
      debugger;
      return Ember.RSVP.hash({ user, cart });
    }).then(data => {
      debugger;
      data.mci = this.get('store').createRecord('metaCartItem', favoriteItem);
      data.cart.get('metaCartItems').pushObject(data.mci);
      return Ember.RSVP.all([ data.mci.save(), data.cart.save() ]);
    }).then(() => {
      return this.updateFavorite();
    }).then(res => {
      return this.controller.set('model.favorite', res);
    }).catch(err => {
      console.log(err);
      return Ember.$.getJSON(url + data + "&mode=outcart" + "&callback=?");
    })
  },
  @action toCheckout() {
    this.session.redirectUserTo('checkout');
  },
});
