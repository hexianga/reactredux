const path = require('path');
const webpack = require('webpack'); // eslint-disable-line
const webpackMerge = require('webpack-merge'); // eslint-disable-line
const commonConfig = require('./webpack.common.js');
const root = path.resolve(__dirname, '..');

module.exports = webpackMerge(commonConfig, {
  devtool: 'none',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8060,
    hot: true,
    // quiet: true,
    contentBase: path.join(root, 'dist'),
    historyApiFallback: true, // 使用 BrowerRouter 组件
    proxy: {
      '/v1': 'http://localhost:8080'
    }
  },
});
// contentBase 中的资源将会通过域名 + publicPath + 文件名访问到。
