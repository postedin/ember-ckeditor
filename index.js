/* eslint-env node */
'use strict';

const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
  name: require('./package').name,

  options: {
    autoImport: {
      webpack: {
        plugins: [
          new CKEditorWebpackPlugin({ language: 'es' }),
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
