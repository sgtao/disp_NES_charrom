// CommonJs style
// - module.exports = {...} にルールを記述する
//   * 似たようなものにES6から、import/exportというのがある
// 実行方法は：
//   yarn run webpack
// 
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpackMerge = require('webpack-merge'); // 変数を「merge」にしないとビルドができない。。。
const { merge } = require('webpack-merge')
const commonConf = require('./webpack.common.js');
const outputFile = '[name].[chunkhash]';
const assetFile = '[contenthash]';
const htmlMinifyOption = false;

module.exports = () => merge(commonConf({ outputFile, assetFile, htmlMinifyOption }), {
    mode: 'production',
    plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.html',
          inject: 'body',
          minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          }
      })
    ],
    optimization: {
      minimizer: [
            new TerserPlugin(),
            new OptimizeCssPlugin()
      ]
    }
});