import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['ms-ListItem'],
  classNameBindings: ['item.isUnread', 'item.isSelectable'],
});
