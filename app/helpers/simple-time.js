import Ember from 'ember';

export function simpleTime([time]/*, hash*/) {
  try {
    return moment(time).format('YYYY-MM-DD hh:mm');
  } catch(err) {
    return 'Now';
  }
}

export default Ember.Helper.helper(simpleTime);