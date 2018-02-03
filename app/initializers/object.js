import config from '../config/environment';

export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');
  if (!Object.entries) {
    console.log('polyfill Object.entries');
    Object.entries = function(obj) {
      var ownProps = Object.keys(obj),
          i = ownProps.length,
          resArray = new Array(i); // preallocate the Array
      while (i--)
        resArray[i] = [ownProps[i], obj[ownProps[i]]];
      return resArray;
    };
  }
  if (config.environment !== 'development') { return; }
  // Object.defineProperty(Object.prototype, '_t', {
  //   get() {
  //     const name = this.toString();
  //     const data = {};
  //     Object.keys(this).forEach(key => {
  //       data[key] = { [name]: this[key] };
  //     });
  //     console.table(data);
  //     return this;
  //   },
  //   enumerable: false
  // });
}

export default {
  name: 'object',
  initialize
};
