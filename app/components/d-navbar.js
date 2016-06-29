import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    if (Ember.$.fn.NavBar) {
        Ember.$('.ms-NavBar').NavBar();
    }
  }
});
