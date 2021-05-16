// CommonJs style
// - module.exports = {...} にルールを記述する
//   * 似たようなものにES6から、import/exportというのがある
// 実行方法は：
//   yarn run webpack
// 
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpackMerge = require('webpack-merge'); // 変数を「merge」にしないとビルドができない。。。
const { merge } = require('webpack-merge')
const commonConf = require('./webpack.common.js');
const outputFile = '[name]';
const assetFile = '[name]';
const htmlMinifyOption = false;

module.exports = () => merge(commonConf({ outputFile, assetFile, htmlMinifyOption }), {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      open: true,
      host: '0.0.0.0',
      contentBase: path.join(__dirname, 'public'),
      watchOptions: {
          ignored: /node_modules/
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.html',
          inject: 'body'
      })
    ]
});