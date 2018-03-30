const path = require('path')
module.exports = {
  devtool: 'eval-source-map',
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle'
  },
  devServer: {
    contentBase: './dist',  //本地服务器所加载的页面所在的页面
    historyApiFallback: true, //跳转到html
    inline: true //实时刷新
  }
}