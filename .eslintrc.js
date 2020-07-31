module.exports = {
  extends: 'airbnb-base',
  env: {
    es6: true,
    mocha: true,
  },
  globals: {
    expect: true,
    sinon: true,
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'no-underscore-dangle': 0,
    'max-len': 0,
    'no-shadow': 0,
  },
};
