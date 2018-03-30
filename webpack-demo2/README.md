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