/* eslint-disable global-require, no-confusing-arrow */
module.exports = (env) => env.NODE_ENV === 'development'
  ? require('./webpack.config.dev')
  : require('./webpack.config.prod');

/* eslint-enable global-require, no-confusing-arrow */
