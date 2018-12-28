const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

// root 目录表示 app 目录
const root = path.resolve(__dirname, '..');

// webpack 的公共配置,其实就是一个对象
module.exports = {
  entry: {
    app: path.join(root, 'src/app.jsx'),
  },
  output: {
    filename: '[name].[hash:5].js', // 打包后的文件名
    path: path.join(root, 'dist/'), // 所有打包后文件存放的目录
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      utils: path.resolve(root, 'src/utils/'),
      components: path.resolve(root, 'src/components/'),
      modules: path.resolve(root, 'src/modules/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }, {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: path.join(root, '../node_modules'),
      }, {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|svg|ttf|eot)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      meta: {
        viewport: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
      },
    }),
  ],
};