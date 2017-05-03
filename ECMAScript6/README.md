This is the record of ECMAScript 2016 learning.
It's base the course of [Ruanyf](https://github.com/ruanyf)
If you want to use es6 in your program, you should install
```
npm install babel-cli -g
```
# basic(基础)
[babel](http://babeljs.cn/)

## babel transcoder(转码器)
### 配置文件
babel的配置文件是.babelrc，存放在项目的根目录下，该文件用来设置转码规则和插件，基本格式如下：
```
{
"presets":[],
"plugins":[]
}
```
### 命令行转码babel-cli
安装
`
npm install --global babel-cli
`
基本用法:
```
# 转码结果输出到标准输出
$ babel example.js
# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js
# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib
# -s 参数生成source map文件
$ babel src -d lib -s
```
### babel-node
支持node的REPL环境的所有功能，执行babel-node就进入REPL环境
### babel-register
babel-register模块改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用babel进行转码。
```
npm install --save-dev babel-register
```
```
require('babel-register');
require('./index.js');
```
### babel-core


### babel-polyfill

### 浏览器环境

### 在线转换

### 与其他工具的配合



## ECMAScript7

# `let` and `const` command(let和const命令)
## `let`(let命令)
## block scope(块级作用域)
## `const`
## the attribute of global object(全局对象的属性)

# 变量的解构赋值
## 数组
## 对象
## 字符串
## 数值和布尔值
## 函数参数
## 圆括号
## 用途

# 字符串的扩展
## 字符的Unicode表示法
## codePointAt()
## String.fromCodePoint()
## 字符串的遍历器接口
## at()
## normalize()
## includes(),startsWith(),endsWith()
## repeat()
## padStart(),padEnd()
## 模板字符串
## 模板编译
## 标签模板
## String.raw()

# 正则的扩展
## RegExp构造函数
## 字符串的正则方法
## 修饰符
## y修饰符
## sticky属性
## flags属性
## RegExp.escape()
## 后行断言

# 数值的扩展
## 二进制和八进制的表示法
## Number.isFinite(), Number.isNaN()
## Number.parseInt(), Number.parseFloat()
## Number.isInteger()
## Number.EPSILON
## 安全整数和Number.isSafeInteger()
## Math对象的扩展
## 指数运算符

# 数组的扩展
## Array.from()
## Array.of()
##
##
##
##
##
##

# 函数的扩展
##
##
##
##
##
##
##
##

# 对象的扩展
##
##
##
##
##
##
##
##
##
##
##
##

# Symbol
##
##
##
##
##
##
##
##
##
##
##
##

# Proxy和Reflect
##
##
##
##
##
##
##
##

# 二进制数组
##
##
##
##
##
##
##
##

# Set和Map数据结构
##
##
##
##

# Iterator和for...of循环
##
##
##
##
##
##
##
##

# Generator函数
##
##
##
##
##
##
##
##
##
##
##
##

# Promise对象
##
##
##
##
##
##
##
##
##
##
##
##

# 异步操作和Async函数
##
##
##
##
##
##
##
##

# Class
##
##
##
##
##
##
##
##
##
##
##
##

# 修饰器
##
##
##
##
##
##
##
##

# Module
##
##
##
##
##
##
##
##
##
##
##
##

# 编码风格
##
##
##
##
##
##
##
##
##
##
##
##

# ECMAScript规格
##
##
##
##
