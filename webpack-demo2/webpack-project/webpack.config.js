// const path = require('path')
// module.exports = {
//   devtool: 'eval-source-map',
//   entry: './app/main.js',
//   output: {
//     path: path.resolve(__dirname,'dist'),
//     filename: 'bundle.js'
//   },
//   devServer: {
//     contentBase: './dist',  //本地服务器所加载的页面所在的页面
//     historyApiFallback: true, //不跳转到
//     inline: true //实时刷新
//   }
// }


// 第三次
// const path = require('path')
// module.exports = {
//   devtool: 'eval-source-map',   //调试工具 
//   entry: './app/main.js',     //唯一入口文件
//   output: {
//     path: path.resolve(__dirname,'dist'),
//     filename: 'bundle.js'
//   },
//   devServer: {
//       contentBase: "./dist", //本地服务器所加载的页面所在的目录,
//       historyApiFallback: true,  //不跳转
//       inline: true   //实时刷新
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx|\.js$/,
//         use:{loader: 'babel-loader',options: {presets: ['env','react']} }, //babel配置在use里面
//         exclude: /node_modules/
//       }
//     ]
//   }
// }

//第四次
// const path = require('path')
// module.exports = {
//   devtool: 'eval-source-map',
//   entry: './app/main.js',
//   output: {
//     path: path.resolve(__dirname,'dist'),
//     filename: 'bundle.js'
//   },
//   devServer: {
//     contentBase: "./public",//本地服务器所加载的页面所在的目录
//     historyApiFallback: true,//不跳转
//     inline: true//实时刷新    
//   },
//   module: {
//     rules: [
//       {test: /(\.jsx|\.js)$/,use: 'babel-loader',exclude: /node_modules/}
//     ]
//   }
// }

//第五次
// const path = require('path')
// module.exports = {
//   devtool: 'eval-source-map',
//   entry: './app/main.js',
//   output: {
//     path: path.resolve(__dirname,'dist'),  //绝对路径
//     filename: 'bundle.js'
//   },
//   devServer: {
//     contentBase: "./public",//本地服务器所加载的页面所在的目录
//     historyApiFallback: true,//不跳转
//     inline: true//实时刷新    
//   },
//   module: {
//     rules: [
//       {test:/(\.jsx|\.js)$/,use: 'babel-loader',exclude: /node_modules/},
//       {test:/\.css$/,use: ['babel-loader','css-loader']}
//     ]
//   }
// }

//第六次
const path = require('path')
module.exports = {
  devtool: 'eval-source-map',
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname,'dist'),  //绝对路径
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新    
  },
  module: {
    rules: [
      {test:/(\.jsx|\.js)$/,use:'babel-loader',exclude: /node_modules/},
      {
        test:/\.css$/,
        use:[
          {
            loader: 'style-loader',
          },{
            loader:'css-loader',
            options:{
              modules: true,  //指定启用css modules
              localIdentName: '[name]__[local]--[hash:base64:5]' //指定css类名的格式
            }
          }
        ]
      }
    ]
  }
}


