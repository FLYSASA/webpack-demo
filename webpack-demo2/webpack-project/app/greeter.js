//greeter.js 模块
//commonjs规范

// module.exports = function(){
//     var greet = document.createElement('div')
//     greet.textContent = "hi memeda"
//     return greet
// }

// var config = require('./config.json')   //config是一个对象

// module.exports = function(){
//   var greet = document.createElement('div')
//   greet.textContent = config.greetText
//   return greet
// }

import React, {Component} from 'react';
import config from './config.json';
import styles from './greeter.css';  //导入

class Greeter extends Component{
  render() {
    return (                              //styles.root使用cssModule添加类名的方法
      <div className={styles.root}>  
        {config.greetText}
      </div>
    );
  }
}

export default Greeter