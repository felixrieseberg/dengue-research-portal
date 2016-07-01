import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  init() {
    this._super();
    this.set('today', moment().format('D MMMM, YYYY'))
  },

  didInsertElement() {
    Ember.$('.ms-DatePicker').DatePicker();
  }
});
