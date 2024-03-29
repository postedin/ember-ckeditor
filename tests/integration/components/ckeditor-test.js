import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | ckeditor', (hooks) => {
	setupRenderingTest(hooks);

	test('it renders', async function (assert) {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.set('myAction', function(val) { ... });

		await render(hbs`<CKEditor />`);

		assert.strictEqual(this.element.textContent.trim(), '');

		// Template block usage:
		/* await render(hbs`
      <CKEditor>
        template block text
      </CKEditor>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');*/
	});
});
