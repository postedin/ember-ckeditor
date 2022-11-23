/* eslint-env node */

const writeFile = require('broccoli-file-creator');
const mergeTrees = require('broccoli-merge-trees');
const version = require('./package.json').version;

module.exports = {
  name: require('./package').name,
};
