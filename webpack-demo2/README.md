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

我们在index.html文件中写入最基础的html代码,它在这里的目的在于引入打包后的js文件(这里我们先把打包后的js文件命名为bundle.js)

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
    <script src="bundle.js"></script>
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
const greeter = require('./Greeter.js');
document.querySelector("#root").appendChild(greeter());
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
# webpack非全局安装的情况
node_moduls/.bin/webpack app/main.js
```

