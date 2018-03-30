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

import React, {Component} from 'react'
import config from './config.json';

class Greeter extends Component{
  render() {
    return (
      <div>
        {config.greetText}
      </div>
    );
  }
}

export default Greeter