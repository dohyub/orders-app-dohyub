import DS from 'ember-data';
import firebase from 'firebase';

export const firebaseTimestamp = DS.attr('date', {
  defaultValue: () => firebase.database.ServerValue.TIMESTAMP
});
