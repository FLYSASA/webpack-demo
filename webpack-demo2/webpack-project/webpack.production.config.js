const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'null',             //注意修改了这里,这能大大压缩我们的打包代码
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname,'build'),  //绝对路径
    filename: 'bundle-[hash].js'
  },
  devServer: {
    contentBase: "./build",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true, //实时刷新    
    hot: true
  },
  module: {
    rules: [
      {test: /(\.jsx|\.js)$/,use:'babel-loader',exclude:/node_modules/},
      {test: /\.css$/,use:[{loader:'style-loader'},{loader: 'css-loader',options:{modules: true}},{loader: 'postcss-loader'}]}
    ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有,翻版必究'),    //new数组实例
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"
    }),
    new webpack.HotModuleReplacementPlugin(),//热加载插件
    new ExtractTextPlugin('style.css'),      //分离css
    new CleanWebpackPlugin('build/*.*',{
        root: __dirname,
        verbose: true,
        dry: false
    })
  ]
}

