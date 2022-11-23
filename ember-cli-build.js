const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function (defaults) {
  const app = new EmberAddon(defaults, {
    postcssOptions: {
      compile: {
        cacheInclude: [/.*\.(css|hbs)$/, /.tailwind\/config\.js$/],
        plugins: [
          require('autoprefixer'),
          {
            module: require('tailwindcss'),
            options: {
              config: 'tailwind.config.js'
            },
          },
        ],
      },
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  app.import('node_modules/@postedin/ckeditor5-build-combined/build/translations/es.js');
  app.import('node_modules/@postedin/ckeditor5-build-combined/build/ckeditor-lark.css');

  return app.toTree();
};
