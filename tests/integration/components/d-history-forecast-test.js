import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d-history-forecast', 'Integration | Component | d history forecast', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{d-history-forecast}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#d-history-forecast}}
      template block text
    {{/d-history-forecast}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
