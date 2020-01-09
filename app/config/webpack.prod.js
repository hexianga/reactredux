const webpackMerge = require('webpack-merge'); // eslint-disable-line
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  mode: 'production',
  output: {
    publicPath: '/', // 这里可以配置路径，最终打包进 html 的url = publicPath + 文件名
  },
});
