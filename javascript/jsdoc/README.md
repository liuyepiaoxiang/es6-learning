[TOC]
# 注释规范
## JSDOC
[中文文档](http://www.css88.com/doc/jsdoc/index.html)
### 安装
```npm
npm i jsdoc -g
```
### 命令行参数
- -c, --configure 指定configuration file
- -d, --destination 指定输出路径，默认./out
- -e, --encoding 设定encoding，默认utf8
- -p, --private 将private注释输出到文档，默认不输出
- -P, --package 指定package.json file
- -r, --recurse 查询子目录
- -t, --template 指定输出文档template
- -u, --tutorials 指定教程路径，默认无

### JSDoc配置文件
同许多js工具一样，JSDoc也有配置文件，可以通过设定配置文件来定制JSDoc。如果没有指定configuration file，将会使用一下配置。
```js
{
    "tags": {
        "allowUnknownTags": true, // 允许使用自定义tag
        "dictionaries": ["jsdoc","closure"] // 定义tag集
    },
    "source": {
        "includePattern": ".+\\.js(doc)?$", // 将以.js, .jsdoc结尾的文件作为源文件
        "excludePattern": "(^|\\/|\\\\)_" // 忽略以_开头的文件夹及文件
    },
    "plugins": [],
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    }
}
```
- source：顾名思义是用来指定源文件的，在其之下包含了4个属性，其中两个已经在默认配置中出现过了。\
  |- include: [ array of paths to files to generate documentation for ], // 源文件路径数组\
  |- exclude: [ array of paths to exclude ], // 排除文件路径数组\
  |- includePattern: a regular expression, // 接受一个正则表达式，当文件名匹配这个正则时，执行JSDoc\
  |- excludePattern: a regular expression, // 接受一个正则表达式，当文件名匹配这个正则时，JSDoc忽略该文件\
  JSDoc以以下的顺序执行这些属性：
  1. 根据include获取目标文件
  2. 根据includePattern筛选由第一步得到的目标文件
  3. 根据excludePattern筛选由第二步得到的文件
  4. 最后根据exclude属性，排除由第三步得到的文件结果集，排除之后的文件便是JSDoc需要执行的源文件。
- tags: 用来指定tag库，tags下面有2个属性，分别是\
  |- allowUnknownTags: 用来告诉JSDoc如何处理标签库以外的tag，设为false时，JSDoc不会处理标签库以外的tag，但会记录一个警告，默认为true\
  |- dictionaries: 数组格式，指定标签库，标签库越靠前，优先度越高\
  
- opts: 命定行参数可以在此属性下配置
```js
"opts": {
  "template": "templates/default",  // same as -t templates/default
  "encoding": "utf8",               // same as -e utf8
  "destination": "./out/",          // same as -d ./out/
  "recurse": true,                  // same as -r
  "tutorials": "path/to/tutorials", // same as -u path/to/tutorials
}
```
- plugins: 配置额外的插件，如markdown插件，与此同时，JSDoc也可以编写自定义插件做额外的处理。
- templates: 可以用来配置默认template的格式，或另外指定自定义的template

### Tags
JSDoc中将tag分为两类，`Block tag`和`Inline tag`。
- Block tag: 在JSDoc中是最高级别的注释，通常用来提供代码的详细信息。它以@开头，除了位于注释最后的Block tag，其他Block tag必须紧跟换行符
- Inline tag: 通常是Block tag的文字内容或描述，它用一对{}包裹。

Block tag也就是我们平时最常用的注释标签，在此列举一些常用的tag
- @abstact: 抽象
- @access: 也可以直接使用@private, @protect, @public来替代
- @alias: 别名
- @augments | @extends: 继承
- @author: 作者
- @borrows: 引用，用来引用文档中的另一个记录
- @callback: 回调
- @class | @constructor: 类，ES2015规范下不用显示添加该tag，JSDoc会默认将注释第一段转换为@class
- @classdesc: 类描述
- @const | @constant: 常量，ES2015规范下使用const定义变量，不用显示添加该tag
- @copyright: 版权
- @default | @defaultvalue: 默认值，JSDoc会自动识别简单类型的值：string, number, boolean and null.
- @deprecated: 废弃
- @desc | @description: 描述
- @emits | @fires: 发出，函数内部会触发自定义事件，即包含@eventtag
- @enum: 枚举
- @event: 事件，自定义事件触发处，父方法应添加@firestag
- @example: 举例
- @exports: 导出，ES2015规范下使用exports不用显示添加该tag
- @external | @host: 外部引用
- @file | @fileoverview | @overview: 文件
- @func | @function | @method: 方法
- @global: 全局变量
- @license: 许可证
- @member | @var: 成员变量
- @mixin: 混合
- @module: 模型
- @name: 名称，用于抽象方法或匿名函数，变更现有方法的方法名使用@aliastag
- @namespace: 命名空间
- @override: 重写
- @param | @arg | @argument: 参数
- @property | @prop: 属性，多用于静态对象，区别于@enum标签，property标签可以设定不用类型，而@enum标签是同一类型的值的集合
- @readonly: 只读
- @requires: 依赖
- @return | @returns: 返回
- @see: 参阅，ref
- @since: 添加版本
- @summary: 总结
- @this: 声明方法中的this指代
- @throws | @exception: 异常
- @type: 类型