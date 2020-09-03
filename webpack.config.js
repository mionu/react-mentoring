module.exports = (env) => env.NODE_ENV === 'development'
    ? require('./webpack.config.dev')
    : require('./webpack.config.prod');
