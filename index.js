/* eslint-env node */
'use strict';

const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
  name: require('./package').name,

  options: {
    autoImport: {
      webpack: {
        plugins: [
          new CKEditorWebpackPlugin({ language: 'en' }),
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
                {
                  loader: 'style-loader',
                  options: {
                    injectType: 'singletonStyleTag',
                  },
                },
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
