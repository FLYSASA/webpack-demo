//greeter.js 模块
//commonjs规范
module.exports = function(){
    var greet = document.createElement('div')
    greet.textContent = "Hi greet to you"
    return greet;
}