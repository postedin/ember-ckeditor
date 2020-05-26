/* eslint-env node */
'use strict';

const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
let mergeTrees = require('broccoli-merge-trees');
let create = require('broccoli-file-creator');
let pkg = require('./package.json');

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('node_modules/@ckeditor/ckeditor5-build-classic/build/translations/es.js');
    app.import('node_modules/@ckeditor/ckeditor5-build-decoupled-document/build/translations/es.js');
    app.import('vendor/@postedin/ember-ckeditor/register-version.js');
  },

  treeForVendor(vendorTree) {
    let trees = [];
    if(vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(create(
      '@postedin/ember-ckeditor/register-version.js',
      `Ember.libraries.register('CKEditor 5 (${pkg.name})', '${pkg.version}');`
    ));

    return mergeTrees(trees);
  },

  options: {
    autoImport: {
      webpack: {
        plugins: [
          // new CKEditorWebpackPlugin({
          //   language: 'en',
          //   additionalLanguages: ['es'],
          //   verbose: true,
          //   buildAllTranslationsToSeparateFiles: true,
          //   addMainLanguageTranslationsToAllAssets: true,
          //   strict: true,
          // }),
          new MiniCssExtractPlugin({
            filename: 'ckeditor-lark.css'
          }),
        ],
        module: {
          rules: [
            {
              test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
              use: ['raw-loader'],
            },
            {
              test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: styles.getPostCssConfig({
                    themeImporter: {
                      themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
                    },
                    minify: true,
                  }),
                },
              ],
            },
          ],
        },
      },
    },
  },
};
