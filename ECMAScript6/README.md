This is the record of ECMAScript 2016 learning.
It's base the course of [Ruanyf](https://github.com/ruanyf)
[阮一峰在线教程](http://es6.ruanyifeng.com/)
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
如果某些代码需要调用babel的API进行转码，就要使用babel-core模块。

### babel-polyfill
Babel默认只转换新的JavaScript句法（syntax） ， 而不转换新的API， 比如Iterator、 Generator、 Set、 Maps、 Proxy、 Reflect、 Symbol、 Promise等全
局对象， 以及一些定义在全局对象上的方法（比如Object.assign） 都不会转码。

### 浏览器环境
Babel也可以用于浏览器环境。 但是， 从Babel 6.0开始， 不再直接提供浏览器版本， 而是要用构建工具构建出来。 如果你没有或不想使用构建工具， 可
以通过安装5.x版本的babel-core模块获取。
`
$ npm install babel-core@5
`
运行上面的命令以后， 就可以在当前目录的node_modules/babel-core/子目录里面， 找到babel的浏览器版本browser.js（未精简）
和browser.min.js（已精简） 。
然后， 将下面的代码插入网页。
`
<script src="node_modules/babel-core/browser.js"></script>
<script type="text/babel">
// Your ES6 code
</script>
`
### 在线转换
Babel提供一个REPL在线编译器， 可以在线将ES6代码转为ES5代码。 转换后的代码， 可以直接作为ES5代码插入网页运行.

### 与其他工具的配合
许多工具需要Babel进行前置转码， 这里举两个例子： ESLint和Mocha。
ESLint用于静态检查代码的语法和风格， 安装命令如下。
```
npm install --save-dev eslint babel-eslint

```
然后， 在项目根目录下， 新建一个配置文件.eslintrc， 在其中加入parser字段。
```
{
"parser": "babel-eslint",
"rules": {
...
}
}

```
再在package.json之中， 加入相应的scripts脚本。
```
{
"name": "my-module",
"scripts": {
"lint": "eslint my-files.js"
},
"devDependencies": {
"babel-eslint": "...",
"eslint": "..."
}
}
```
Mocha则是一个测试框架， 如果需要执行使用ES6语法的测试脚本， 可以修改package.json的scripts.test。
```
"scripts": {
"test": "mocha --ui qunit --compilers js:babel-core/register"
}
```

## ECMAScript7

# `let` and `const` command(let和const命令)
## `let`(let命令)
### 基本用法
ES6新增了let命令， 用来声明变量。 它的用法类似于var， 但是所声明的变量， 只在let命令所在的代码块内有效。

### 不存在变量提升
let不像var那样会发生“变量提升”现象。 所以， 变量一定要在声明后使用， 否则报错。

### 暂时性死区
let不像var那样会发生“变量提升”现象。 所以， 变量一定要在声明后使用， 否则报错。
```
var tmp = 123;
if (true) {
tmp = 'abc'; // ReferenceError
let tmp;
}
```
ES6明确规定， 如果区块中存在let和const命令， 这个区块对这些命令声明的变量， 从一开始就形成了封闭作用域。 凡是在声明之前就使用这些变
量， 就会报错。

总之， 在代码块内， 使用let命令声明变量之前， 该变量都是不可用的。 这在语法上， 称为“暂时性死区”（temporal dead zone， 简称TDZ） 。

“暂时性死区”也意味着typeof不再是一个百分之百安全的操作。

### 不允许重复声明
let不允许在相同作用域内， 重复声明同一个变量.因此， 不能在函数内部重新声明参数。

## block scope(块级作用域)
### 为什么需要块级作用域？
ES5只有全局作用域和函数作用域， 没有块级作用域， 这带来很多不合理的场景。
第一种场景， 内层变量可能会覆盖外层变量。
```
var tmp = new Date();
function f() {
console.log(tmp);
if (false) {
var tmp = "hello world";
}
}
f(); // undefined
```
上面代码中， 函数f执行后， 输出结果为undefined， 原因在于变量提升， 导致内层的tmp变量覆盖了外层的tmp变量。
第二种场景， 用来计数的循环变量泄露为全局变量。
```
var s = 'hello';
for (var i = 0; i < s.length; i++) {
console.log(s[i]);
}
console.log(i); // 5
```

### ES6的块级作用域
块级作用域的出现， 实际上使得获得广泛应用的立即执行匿名函数（IIFE） 不再必要了。
```
// IIFE写法
(function () {
var tmp = ...;
...
}());
// 块级作用域写法
{
let tmp = ...;
...
}
```
### 块级作用域与函数声明
函数能不能在块级作用域之中声明， 是一个相当令人混淆的问题。
ES5规定， 函数只能在顶层作用域和函数作用域之中声明， 不能在块级作用域声明。
```
// 情况一
if (true) {
function f() {}
} /
/ 情况二
try {
function f() {}
} catch(e) {
}
```
上面代码的两种函数声明， 根据ES5的规定都是非法的。
但是， 浏览器没有遵守这个规定， 还是支持在块级作用域之中声明函数， 因此上面两种情况实际都能运行， 不会报错。 不过， “严格模式”下还是会报
错。
```
// ES5严格模式
'use strict';
if (true) {
function f() {}
}
// 报错
```
ES6引入了块级作用域， 明确允许在块级作用域之中声明函数。
```
// ES6严格模式
'use strict';
if (true) {
function f() {}
}
// 不报错
```
并且ES6规定， 块级作用域之中， 函数声明语句的行为类似于let， 在块级作用域之外不可引用。
```
function f() { console.log('I am outside!'); }
(function () {
if (false) {
// 重复声明一次函数f
function f() { console.log('I am inside!'); }
} f();
}());
```
上面代码在ES5中运行， 会得到“I am inside!”， 因为在if内声明的函数f会被提升到函数头部， 实际运行的代码如下。
```
// ES5版本
function f() { console.log('I am outside!'); }
(function () {
function f() { console.log('I am inside!'); }
if (false) {
}
f();
}());
```
ES6的运行结果就完全不一样了， 会得到“I am outside!”。 因为块级作用域内声明的函数类似于let， 对作用域之外没有影响， 实际运行的代码如下。
```
// ES6版本
function f() { console.log('I am outside!'); }
(function () {
f();
}());
```
很显然， 这种行为差异会对老代码产生很大影响。 为了减轻因此产生的不兼容问题， ES6在附录B里面规定， 浏览器的实现可以不遵守上面的规定， 有
自己的行为方式。
允许在块级作用域内声明函数。
函数声明类似于var， 即会提升到全局作用域或函数作用域的头部。
同时， 函数声明还会提升到所在的块级作用域的头部。
注意， 上面三条规则只对ES6的浏览器实现有效， 其他环境的实现不用遵守， 还是将块级作用域的函数声明当作let处理。
## `const`
const声明一个只读的常量。 一旦声明， 常量的值就不能改变。

const声明的变量不得改变值， 这意味着， const一旦声明变量， 就必须立即初始化， 不能留到以后赋值。

const的作用域与let命令相同： 只在声明所在的块级作用域内有效。

const声明的常量， 也与let一样不可重复声明。

对于复合类型的变量， 变量名不指向数据， 而是指向数据所在的地址。 const命令只是保证变量名指向的地址不变， 并不保证该地址的数据不变， 所以
将一个对象声明为常量必须非常小心。
```
const foo = {};
foo.prop = 123;
foo.prop
// 123
foo = {}; // TypeError: "foo" is read-only
```

```
const a = [];
a.push('Hello'); // 可执行
a.length = 0; // 可执行
a = ['Dave']; // 报错
```
上面代码中， 常量a是一个数组， 这个数组本身是可写的， 但是如果将另一个数组赋值给a， 就会报错。
如果真的想将对象冻结， 应该使用Object.freeze方法。

除了将对象本身冻结， 对象的属性也应该冻结。 下面是一个将对象彻底冻结的函数。
```
var constantize = (obj) => {
Object.freeze(obj);
Object.keys(obj).forEach( (key, value) => {
if ( typeof obj[key] === 'object' ) {
constantize( obj[key] );
}
});
};
```

## the attribute of global object(全局对象的属性)
全局对象是最顶层的对象， 在浏览器环境指的是window对象， 在Node.js指的是global对象。 ES5之中， 全局对象的属性与全局变量是等价的。


# 变量的解构赋值
## 数组
### 基本用法
ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
以前， 为变量赋值， 只能直接指定值。
```
var a = 1;
var b = 2;
var c = 3;
```
ES6允许写成下面这样。
```
var [a, b, c] = [1, 2, 3];
```
本质上， 这种写法属于“模式匹配”， 只要等号两边的模式相同， 左边的变量就会被赋予对应的值。 下面是一些使用嵌套数组进行解构的例子。

解构赋值不仅适用于var命令， 也适用于let和const命令。
对于Set结构， 也可以使用数组的解构赋值。

### 默认值
解构赋值允许指定默认值。
```
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```
注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。
```
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```
上面代码中，如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
```
function f() {
  console.log('aaa');
}

let [x = f()] = [1];
```
上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码。
```
let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}
```
默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
```
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError
```
上面最后一个表达式之所以会报错，是因为x用到默认值y时，y还没有声明。

## 对象
解构不仅可以用于数组， 还可以用于对象。
```
var { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
```
对象的解构与数组有一个重要的不同。 数组的元素是按次序排列的， 变量的取值由它的位置决定； 而对象的属性没有次序， 变量必须与属性同名， 才
能取到正确的值。
```
var { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
var { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```
上面代码的第一个例子， 等号左边的两个变量的次序， 与等号右边两个同名属性的次序不一致， 但是对取值完全没有影响。 第二个例子的变量没有对
应的同名属性， 导致取不到值， 最后等于undefined。
如果变量名与属性名不一致， 必须写成下面这样。
```
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```
这实际上说明， 对象的解构赋值是下面形式的简写（参见《对象的扩展》 一章） 。
```
var { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
```
也就是说， 对象的解构赋值的内部机制， 是先找到同名属性， 然后再赋给对应的变量。 真正被赋值的是后者， 而不是前者。
```
var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
```
上面代码中， 真正被赋值的是变量baz， 而不是模式foo。
注意， 采用这种写法时， 变量的声明和赋值是一体的。 对于let和const来说， 变量不能重新声明， 所以一旦赋值的变量以前声明过， 就会报错。
```
let foo;
let {foo} = {foo: 1}; // SyntaxError: Duplicate declaration "foo"
let baz;
let {bar: baz} = {bar: 1}; // SyntaxError: Duplicate declaration "baz"
```
上面代码中， 解构赋值的变量都会重新声明， 所以报错了。 不过， 因为var命令允许重新声明， 所以这个错误只会在使用let和const命令时出现。 如果
没有第二个let命令， 上面的代码就不会报错。
```
let foo;
({foo} = {foo: 1}); // 成功
let baz;
({bar: baz} = {bar: 1}); // 成功
```
上面代码中， let命令下面一行的圆括号是必须的， 否则会报错。 因为解析器会将起首的大括号， 理解成一个代码块， 而不是赋值语句。
和数组一样， 解构也可以用于嵌套结构的对象。
```
var obj = {p: [
'Hello',
{ y: 'World' }
]
};
var { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
```
注意， 这时p是模式， 不是变量， 因此不会被赋值。
```
var node = {
loc: {
start: {
line: 1,
column: 5
}
}
};
var { loc: { start: { line }} } = node;
line // 1
loc // error: loc is undefined
start // error: start is undefined
```
上面代码中， 只有line是变量， loc和start都是模式， 不会被赋值。
下面是嵌套赋值的例子。
```

```
## 字符串
字符串也可以解构赋值。 这是因为此时， 字符串被转换成了一个类似数组的对象。
```
const [a, b, c, d, e] = 'hello';
a // "h"b // "e"
c // "l"
d // "l"
e // "o"
```
类似数组的对象都有一个length属性， 因此还可以对这个属性解构赋值。
```
let {length : len} = 'hello';
len // 5
```
## 数值和布尔值
解构赋值时， 如果等号右边是数值和布尔值， 则会先转为对象。
```
let {toString: s} = 123;
s === Number.prototype.toString // true
let {toString: s} = true;
s === Boolean.prototype.toString // true
```
上面代码中， 数值和布尔值的包装对象都有toString属性， 因此变量s都能取到值。
解构赋值的规则是， 只要等号右边的值不是对象， 就先将其转为对象。 由于undefined和null无法转为对象， 所以对它们进行解构赋值， 都会报错。
```
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```
## 函数参数
函数的参数也可以使用解构赋值。
```
function add([x, y]){
return x + y;
}
add([1, 2]); // 3
```

## 圆括号
解构赋值虽然很方便， 但是解析起来并不容易。 对于编译器来说， 一个式子到底是模式， 还是表达式， 没有办法从一开始就知道， 必须解析到（或解
析不到） 等号才能知道。
由此带来的问题是， 如果模式中出现圆括号怎么处理。 ES6的规则是， 只要有可能导致解构的歧义， 就不得使用圆括号。
但是， 这条规则实际上不那么容易辨别， 处理起来相当麻烦。 因此， 建议只要有可能， 就不要在模式中放置圆括号。
### 不能使用圆括号的情况
1. 变量声明语句中，不能带有圆括号。
```
// 全部报错
var [(a)] = [1];
var {x: (c)} = {};
var ({x: c}) = {};
var {(x: c)} = {};
var {(x): c} = {};
var { o: ({ p: p }) } = { o: { p: 2 } };
```
2. 函数参数中，模式不能带有圆括号。
函数参数也属于变量声明， 因此不能带有圆括号。
```
// 报错
function f([(z)]) { return z; }
```

3. 赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中。
```
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
```
### 可以使用圆括号的情况
可以使用圆括号的情况只有一种： 赋值语句的非模式部分， 可以使用圆括号。
```
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```

## 用途
1. 交换变量的值
```
[x, y] = [y, x];
```
2. 从函数返回多个值
函数只能返回一个值， 如果要返回多个值， 只能将它们放在数组或对象里返回。 有了解构赋值， 取出这些值就非常方便。
```
// 返回一个数组
function example() {
return [1, 2, 3];
} v
ar [a, b, c] = example();
// 返回一个对象
function example() {
return {
foo: 1,
bar: 2
};
}
var { foo, bar } = example();
```
3. 函数参数的定义
解构赋值可以方便地将一组参数与变量名对应起来。
```
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);
// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```
4. 提取JSON数据
解构赋值对提取JSON对象中的数据， 尤其有用。
```
var jsonData = {
id: 42,
status: "OK",
data: [867, 5309]
};
let { id, status, data: number } = jsonData;console.log(id, status, number);
// 42, "OK", [867, 5309]
```
5. 函数参数的默认值
```
jQuery.ajax = function (url, {
async = true,
beforeSend = function () {},
cache = true,
complete = function () {},
crossDomain = false,
global = true,
// ... more config
}) {
// ... do stuff
};
```
6. 遍历MAP结构
任何部署了Iterator接口的对象， 都可以用for...of循环遍历。 Map结构原生支持Iterator接口， 配合变量的解构赋值， 获取键名和键值就非常方便。
```
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {
console.log(key + " is " + value);
} /
/ first is hello
// second is world
```
如果只想获取键名， 或者只想获取键值， 可以写成下面这样。
```
// 获取键名
for (let [key] of map) {
// ...
} /
/ 获取键值
for (let [,value] of map) {
// ...
}
```

7. 输入模块的指定方法
加载模块时， 往往需要指定输入那些方法。 解构赋值使得输入语句非常清晰。
```
const { SourceMapConsumer, SourceNode } = require("source-map");
```
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
