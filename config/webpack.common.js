const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

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
      '@pages': path.resolve(root, 'src/pages/'),
      'react-virtualized/List': 'react-virtualized/dist/es/List',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.scss$/,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]__[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
      }, {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: path.join(root, '../node_modules'),
      }, {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|svg|ttf|eot|md)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(root, 'src/index.html'),
      inject: true,
      meta: {
        viewport: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
      },
    }),
  ],
};
