import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('signin');
  this.route('signup');
  this.route('cart');
  this.route('checkout');
  this.route('order');
});

export default Router;
