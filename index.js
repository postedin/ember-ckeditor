/* eslint-env node */

const writeFile = require('broccoli-file-creator');
const mergeTrees = require('broccoli-merge-trees');
const version = require('./package.json').version;

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);

    this.import('vendor/ember-ckeditor/register-version.js');
  },

  treeForVendor() {
    const content = `
      Ember.libraries.register('Ember CKEditor', '${version}');

      if (document) {
        document.addEventListener('DOMContentLoaded', function() {
          if (CKEDITOR_VERSION) {
            Ember.libraries.register('CKEditor 5', CKEDITOR_VERSION);
          }
        });
      }
    `;
    const registerVersionTree = writeFile('ember-ckeditor/register-version.js', content);

    return mergeTrees([registerVersionTree]);
  },
};
