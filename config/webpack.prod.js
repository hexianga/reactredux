const webpackMerge = require('webpack-merge'); // eslint-disable-line
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
});
