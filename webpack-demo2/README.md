### 为什么要使用webpack?
现在很多网页功能丰富,它们拥有者复杂的JavaScript代码和一大堆依赖包,为了简化开发的复杂度,前端社区涌现了很多好的实践方法
- 模块化 我们把复杂的程序细化为小的文件
- 类似于TypeScirpt这种在JavaScript基础上拓展的开发语言:使我们能够实现目前版本的JavaScript不能直接使用的特性.并且之后还能转换为JavaScript文件使浏览器可以识别
- scss,less等css预处理器
- ...

这些改进大大提高了我们的开发效率,但是利用它们开发的文件往往需要进行额外的处理才能让浏览器识别,而动手处理有非常的繁琐,这就为webpack类的工具的出现提供了需求.

### 什么是webpack?
webpack可以看做是模块打包机:它做的事情,分析你的项目结构,找到JavaScript模块以及其他的一些浏览器不能直接运行的扩展语言(scss,TypeScript等),并将其转换和打包为合适的格式供浏览器使用

webpack的工作方式是: 把你的项目当做一个整体,通过一个给定的主文件(如index.js),webpack将从这个文件开始找到你的项目的所有依赖文件,使用loaders处理它们,最后打包为一个()或多个浏览器可识别的JavaScript文件.
![](https://upload-images.jianshu.io/upload_images/1031000-160bc667d3b6093a.png?imageMogr2/auto-orient/)

### 开始使用webpack
#### 安装
webpack可以使用npm安装,新建一个空练习文件夹(命名webpack-project),在终端中转到该文件夹目录,执行下述指令就可以完成安装:
```avascript
//全局安装
npm install -g webpack
//安装到你的项目目录
npm install --save-dev webpack
```

#### 使用前的准备
1.在文件夹中创建一个package.json文件,这是一个标准的npm说明文件,里面蕴含了丰富的信息,包括当前项目的依赖模块,自定义的脚本任务等等.在使用`npm init`命令可以自动创建这个package.json文件
```
npm init
//如果不准备在npm上传项目的话可以直接使用默认设置
npm init -y
```

2.package.json文件以及就绪,我们在本项目中安装webpack作为依赖包
```javascript
//安装webpack
npm install --save-dev webpack
```

3.回到之前的空文件,并在里面创建两个文件夹,app和pubulic,app文件夹用来存放原始数据和我们将写的JavaScript模块,dest文件夹用来存放之后供浏览器读取的文件(包括使用webpack打包生成的js文件以及一个`index.html`文件).接下来我们再创建三个文件
- index.html --放在dest文件夹中
- Greeter.js --放在app文件夹中
- main.js --放在app文件夹中
项目结构如图所示:
![](https://upload-images.jianshu.io/upload_images/1031000-976ba1a06fd0702f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/347)

我们在index.html文件中写入最基础的html代码,它在这里的目的在于引入打包后的js文件(这里我们先把打包后的js文件命名为main.js)

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Webpack Sample Project</title>
  </head>
  <body>
    <div id='root'>
    </div>
    <script src="main.js"></script>
  </body>
</html>
```

我们在`greeter.js`中定义一个返回包含问候信息的html元素的函数,并依据commonjs规范导出这个函数为一个模块:
```javascript
// Greeter.js
module.exports = function() {
  var greet = document.createElement('div');
  greet.textContent = "Hi there and greetings!";
  return greet;
};
```

main.js文件中我们写入下述代码,可以用greeter模块返回的节点插入页面
```javascript
//main.js 
const greeter = require('./Greeter.js');   //require()得到的是一个函数
document.querySelector("#root").appendChild(greeter());   //所以greeter需要加括号
```

### 正式使用webpack
webpack可以在终端使用,基本的使用方法如下:
```javascript
# {extry file}处填写入口文件的路径,本文中就是上述main.js的路径
# {destination for bundle file}处填写打包文件的存放路径,这个路径是相对webpack-project的路径
# 填写路径的时候不用添加{}
webpack {entry file} {destination for bundle file}
```

指定入口文件后,webpack将自动识别项目所依赖的其他文件,不过需要注意的是如果你的webpack不是全局安装,那么当你在终端中使用此命令时,需要额外指定其在node_modules中的地址,继续上面的例子,在终端输入命令
```javascript
# webpack非全局安装的情况(会在dist文件下自动生成main.js合并文件)
node_moduls/.bin/webpack app/main.js  
```
可以看出`webpack`同时编译了main.js和creeter.js,打开index.html,可以看到结果
![微信截图_20180330153644](/assets/微信截图_20180330153644_me5jr3gr9.png)

这样就成功使用webpack打包好一个文件.不过在终端进行复杂的操作,其实不是太方便并且容易出错,接下来看看webpack的另一种更常见的使用方法.

### 通过配置文件类使用`webpack`
webpack拥有许多其他的比较高级的功能(比如后文会介绍的`loaders`和`plugins`),这些功能其实都可以通过命令行模式实现,但是正如前面提到的,这样不太方便且容易出错,更好的办法是定义一个配置文件,这个文件其实也是一个简单的JavaScript模块,我们可以把所有的与打包相关的信息放在里面.

继续上面的例子来说明如何写这个配置文件,在当前练习文件夹的根目录下新建一个名为`webpack.config.js`的文件,我们在其中写入如下所示的简单配置代码,目前的配置主要涉及到的内容是入口文件路径和打包后文件的存放路径.
```javascript
const path = require('path')   //引入path模块,否则会报错
module.exports = {
  entry : './app/main.js', //这是唯一入口文件,与webpack.config.js的相对路径
  output: {
    path: path.resolve(__dirname,'dist'), //打包后的文件存放的地方
    filename:  "bundle.js"  //打包后输出文件的文件名
  }
}
```
> 注意: "__dirname"是node.js中的一个全局变量,它指向执行脚本所在的文件目录

有了这个配置后,再打包文件,只需在终端里运行webpack(非全局安装需使用node_modules/.bin/webpack)命令就可以了,这条命令会自动引用`webpack.config.js`文件中的配置选项,实例如下:
![微信截图_20180330174012](/assets/微信截图_20180330174012.png)

右学会一种`webpack`的方法,这种方法不要管那烦人的命令行参数,感觉非常爽.如果我们可以连`webpack(非全局安装需使用node_module/.bin/webpack)`这条命令都可以不要,那感觉岂不是更爽,继续看下文.

### 更快捷的执行打包任务
在命令行输入命令需要代码类似于`node_modules/.bin/webpack`这样的路径其实是比较麻烦的,不过值得庆幸的是`npm`可以引导任务执行,对`npm`进行配置后可以在命令行中使用简单的`npm start`命令来替代上面略微繁琐的命令.在`package.json`中对`script`对象进行相关设置即可,设置方法如下:
```
{
  "name": "webpack-sample-project",
  "version": "1.0.0",
  "description": "Sample webpack project",
  "scripts": {
    "start": "webpack" // 修改的是这里，JSON文件不支持注释，引用时请清除
  },
  "author": "zhang",
  "license": "ISC",
  "devDependencies": {
    "webpack": "3.10.0"
  }
}
```
> 注意: `package.json`中的`scripts`会按照一定顺序寻找命令对应位置,本地的`node_modules/.bin`路径就在这个寻找清单中,它会优先在本项目文件目录node_modules里寻找webpack程序,如果找不到会一直逐级找到user根目录,所以无论是全局还是局部安装的webpack,你都不需要写前面那种指明详细的路径了.

npm的`start`命令是一个特殊的脚本名称,其特殊性表现在,在命令行中使用`npm satrt`就可以执行其对应的命令,如果对应此的脚本名称不是`start`,想要在命令行中运行时,需要使用`npm run{scripts name}`如`npm run build`,此处我们在命令行输入: `npm start`
![微信截图_20180330183927](/assets/微信截图_20180330183927.png)

现在只需要使用`npm start`就可以打包文件了,有没有觉得`webpack`也不过如此嘛,不过不要小瞧它,要充分发挥其强大的功能我们需要修改配置文件的其它选项,一项项来看.

### webpack的强大功能
生成Source Maps(使调试更容易)
开发总是离不开调试,方便的调试能极大的提高开发效率,不过有时候通过打包后的文件,你是不容易知道错了的地方,对应的你写的代码的位置的,`source maps`就是来帮我们解决这个问题的.

通过简单的配置,`webpack`就可以在打包时为我们生成`source maps`,这为我们提供了一种对应编译文件和源文件的方法,使得编译后的代码可读性更高,也更容易调试.

在`webpack`的配置文件中配置`source maps`,需要配置`devtool`,它有以下四种不同的配置选项,各具缺点,描述如下:
devtool| 配置结果
---|---
`source-map`|在一个单独的文件中产生一个完整且功能完全的文件,这个文件具有最好的`source map`,但是他会减慢打包速度
`cheap-module-source-map`|在一个单独的文件中生成一个不带列映射的`map`,不带列映射提高了打包速度,但是也使得浏览器开发者工具只能对应到具体的行,不能对应到具体的列(符号),会对调试造成不便
`eval-source-map`|使用`eval`打包源文件模块,在同一个文件中生成干净完整的`source map`.这个选项可以在不影响构建速度的前提下生成完整的`source map`,但是对打包后输出的js文件的执行具有性能和安全的隐患,在开发阶段这是一个非常好的选项,在生成阶段则一定不要启用这个选项,
`cheap-module-eval-source-map`|这是在打包文件是最快的生成`source map`的方法,生成的`source map`回合打包后的js文件同行显示,没有列映射,和`eval-source-map`选项具有相似的缺点

正如上表所述,由上到下打包速度越来越快,不过也具有越来越多的负面作用,较快的打包速度的后果就是对打包后的文件的执行有一定的影响.


对小到中型的项目中,`eval-source-map`是一个很好的选项,再次强调你只应该在开发阶段使用它,我们继续对上文新建的`webpack.config.js`,进行如下的配置:
```javascript
const path = require('path')
module.exports = {
  devtool: 'eval-source-map',
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js'
  }
}
```
> `cheap-module-eval-source-map`方法构建速度更快,但是不利于调试,推荐大型项目考虑时间成本时使用.


### 使用webpack构建本地服务器
想不想让你的浏览器监听你的代码的修改,并自动刷新显示修改后的结果,其实`webpack`提供一个可选的本地开发服务器,这个本地服务器基于node.js构建,可以实现你想要的这些功能,不过他是一个单独的组件,在webpack中进行配置之前需要单独安装它作为项目依赖
```npm install --save-dev webpack-dev-server```
devserver作为webpack配置选项中的一项,以下是它的一些配置选项,更多配置参考[这里](https://link.jianshu.com/?t=https://webpack.js.org/configuration/dev-server/)
devserve的配置选项|功能描述
---|---
contentBase|默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“dist"目录）
port|设置默认监听端口，如果省略，默认为”8080“
inline|设置为true，当源文件改变时会自动刷新页面
historyApiFallback|在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html

把这些命令加到webpack的配置文件中,现在的配置文件`webpack.config.js`如下所示
```javascript
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
    historyApiFallback: true, //不跳转到
    inline: true //实时刷新
  }
}
```

在`package.json`中的`scripts`对象中添加如下命令,用以开启本地服务器:
```json
"scripts" {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "webpack",
  "server": "webpack-dev-server --open"
}
```

在终端输入`npm run server`即可在本地`8080`端口查看结果
![开启本地服务器](/assets/微信截图_20180330201132.png)

### Loaders
#### 鼎鼎大名的loaders登场!
`loaders`是`webpack`提供的最激动人心的功能之一了,通过使用不同的`loader`,`webpack`有能力调用外部的脚本或工具,实现对不同格式的文件的处理,比如说分析转换scss为css,或把下一代的js文件(ES6 ES7)转换为现代兼容浏览器的js文件,对React的开发而言,合适的Loaders可以把React中用到的JSX文件转换为js文件

loaders需要单独安装并且需要在`webpack.config.js`中的module.rules关键字下进行配置,Loaders的配置包括以下几个方面: 

- `test`: 一个用于匹配loaders所处理文件的扩展名的正则表达式(必须)
- `use`: loader的名称(必须)
- `include/exclude`: 手动添加必须处理的文件(文件夹)或屏蔽不需要处理的文件(文件夹)(可选)
- `query`: 为loaders提供额外的设置选项(可选)

不过在配置loader之前,我们把`greeter.js`里的问候消息放在单独的JSON文件里,并通过合适的配置是greeter.js可以读取该JSON文件的值,各文件修改后的代码如下:

在app文件夹中创建带有问候信息的JSON文件(命名为config.json)
```json
{
  "greetText": "Hi memeda from JSON!"
}
```

更新后的greeter.js

```javascript
var config = require('./config.json')   //config是一个对象
module.exports = function(){
  var greet = document.createElement('div')
  greet.textContent = config.greetText
  return greet
}
```
> 注意:由于`webpack3.*/webpack2.*`已经内置可处理JSON文件,这里我们无需在添加`webpack1.*`需要的`json-loader`。在看如何具体使用loader之前我们先看看Babel是什么？

### Babel
Babel其实是一个编译javascript的平台,他可以编译代码帮你达到以下目的:
- 让你能使用最新的javascript代码(ES6 ES7...),而不用关心标准是否被当前的浏览器完全支持
- 让你能使用基于javascript进行了拓展的语言,比如React的JSX

#### Bable的安装与配置
Babel其实是几个模块化的包,其核心功能位于称为`babel-core`的npm包中,webpack可以把其不同的包整合在一起使用,对于每一个你需要的功能或拓展,你都需要安装单独的包(用的最多的是解析ES6的`babel-preset-env`包和解析JSX的`babel-preset-react`)

我们先来一次性安装这些依赖包
```
//npm一次性安装多个依赖模块,模块之间用空格隔开
npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react
```

在`webpack`中配置Babel的方法如下:
```javascript
const path = require('path')
module.exports = {
  devtool: 'eval-source-map',   //调试工具 
  entry: './app/main.js',     //唯一入口文件
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js'
  },
  devServer: {
      contentBase: "./dist", //本地服务器所加载的页面所在的目录,
      historyApiFallback: true,  //不跳转
      inline: true   //实时刷新
  },
  module: {
    rules: [
      {
        test: /\.jsx|\.js$/,
        use:{loader: 'babel-loader',options: { presets: ['env','react']} },
        exclude: /node_modules/
      }
    ]
  }
}
```
现在你的webpack的配置已经允许你使用ES6以及JSX的语法了,继续使用上面的例子进行测试,不过这次我们会使用React,记得先安装React和React-DOM
```
npm install --save react react-dom
```
接下来我们使用ES6的语法,更新`greeter.js`并返回一个React组件
```javascript
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

```

修改`main.js`如下,使用ES6的模板定义和渲染greeter模块
```javascript
import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';

render(<Greeter />, document.getElementById('root'));
```
重新使用`npm start`打包,如果之前打开的本地服务器没有关闭,你应该可以在localhost:8080下看到与之前一样的内容,这说明,react和es6被正常打包了.


### Babel的配置
babel其实完全可以在`webpack.config.js`中进行配置,但是考虑到babel具有非常多的配置选项,在单一的`webpack.config.js`文件中进行配置往往使得这个文件闲的太复杂,因此一些开发者支持把babel的配置选项放在一个单独的名为".babelrc"的配置文件中.我们现在的babel的配置并不软复杂,不过之后我们会再加一些东西,因此我们就提取出相关部分,分两个配置文件进行配置(webpack会自动调用`.babelrc`里的babel配置选项),如下:
```javascript
const path = require('path')
module.exports = {
  devtool: 'eval-source-map',
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新    
  },
  module: {
    rules: [
      {test: /(\.jsx|\.js)$/ ,use: {'babel-loader'},exclude: /node_modules/ }
    ]
  }
}
```

```
//.babelrc
{
  "presets": ["react","env"]
}
```
`npm start`启动

到目前为止,我们已经知道了,对于模块,webpack能提供非常强大的处理功能,那么哪些是模块呢?

### 一切皆模块
webpack有一个不可不说的有点,他把所有的文件都当做模块处理,JavaScript代码,css和fonts以及图片等等通过合适的loader都可以被处理.

#### CSS
webpack提供两个工具处理样式表,`css-loader`和`style-loader`,二者处理的任务不同,`css-loader`使你能后使用类似`@import`和`url(...)`的方法实现`require`的功能,`style-loader`将所有的计算后的样式加入页面中,二者组合在一起使你能够把样式表嵌入webpack打包后的js文件中.

继续上面的例子
```
//安装
npm install --save-dev style-loader css-loader
```

```javascript
//使用
const path = require('path')
module.exports = {
  ...
  module: {
    rules: [
      {test:/(\.jsx|\.js)$/,use: 'babel-loader',exclude: /node_modules/},
      {test:/\.css$/,use: ['babel-loader','css-loader']}
    ]
  }
}
```
> 注意这里同一个文件引入多个loader的方法

接下来在app文件夹里创建一个名为`main.css`的文件,对一些元素设置样式
```css
/* main.css */
html {
  box-sizing: border-box;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

h1, h2, h3, h4, h5, h6, p, ul {
  margin: 0;
  padding: 0;
}
```
我们这里例子用到的`webpack`只有单一的入口,其他的模块需要通过`import`,`require`,`url`等于入口文件建立其关联,为了让webpack能找到`main.css`文件,我们把它导入`main.js`中,如下:
```js
//main.js
import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';

import './main.css';  //使用import实现require的功能

render(<Greeter />, document.getElementById('root'));
```
> 通常情况下css和js打包到同一个文件中,并不会打包到一个单独的css文件,不过通过合适的配置webpack也可以把css打包为单独的文件.

上面的代码说明webpack是怎么把css当做模块看待的,咱们继续看一个更加真实的css模块实践.

### css module
在过去的一些年里,javascript通过一些新的语言特性,更好的工具已经更好的事件方法(比如说模块化)
发展的非常迅速.模块是的开发者把复杂的代码转化为小的,干净的,依赖声明明确的单元,配合优化工具,依赖管理和加载管理可以自动完成.

不过前端的另外一部分,css发展就相对慢一些,大多的样式表却充满了全局类别,维护和修改都非常困难.

被称为`css modules`的技术意在把js的模块化思想带入css中来,通过css模块,所有的类名,动画名默认都只作用于当前模块.webpack对css模块化提供了非常好的支持,只需要在`css-loader`中进行简单配置即可,然后就可以直接把css类名传递到组件的代码中,这样做有效避免了全局污染,具体代码如下:

```js
const path = require('path')
module.exports = {
  ...
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
```
