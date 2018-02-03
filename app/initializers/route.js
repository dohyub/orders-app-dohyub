import Ember from 'ember';
import config from '../config/environment';

export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');
  // if (config.environment !== 'development') { return; }
  Ember.Route.reopen({
    activate() {
      this._super(...arguments);
      Ember.runInDebug(() => {
        window.R = this;
      });
      var cssClass = this.toCssClass();
      Ember.$('body').addClass(cssClass);
    },
    deactivate: function() {
      Ember.$('body').removeClass(this.toCssClass());
    },
    toCssClass: function() {
      return this.routeName.replace(/\./g, '-').dasherize();
    }
  });
}

export default {
  name: 'route',
  initialize
};
