import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super();

    if (window.process) {
      this.set('isElectron', true);
    }
  }
});
