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
  this.route('order', function() {
    this.route('view', { path: '/:id'});
  });
  this.route('account', function() {
    this.route('addresses');
    this.route('payments');
  });
});

export default Router;
