import Route from '@ember/routing/route';
import { action } from 'ember-decorators/object';

export default Route.extend({
  model() {
    return this.get("session.currentUser.cart");
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
  @action toCheckout() {
    this.session.redirectUserTo('checkout');
  },
});
