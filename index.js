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
    const content = `Ember.libraries.register('Ember CKEditor', '${version}');`;
    const registerVersionTree = writeFile('ember-ckeditor/register-version.js', content);

    return mergeTrees([registerVersionTree]);
  },
};
