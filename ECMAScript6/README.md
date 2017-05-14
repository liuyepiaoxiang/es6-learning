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
JavaScript允许采用\uxxxx形式表示一个字符，并且扩展了字符串对象。\
但是这种表示法只限于\u0000-\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表达。
```javascript
"\uD842\uDFB7"

"\u20BB7"
//" 7"
```
上面代码表示，如果直接在"\u"后面跟上超过0xFFFF的数值(比如\u20BB7)，JavaScript会理解成"\u20BB+7"。由于/u20BB是一个不可打印字符，所以只会显示一个空格，后面跟着一个7。\
ES6对这一点做出了改进，只要将码点放入大括号，就能正确读取该字符。
```javascript
"\u{20BB7}"
```
有了这种表示法之后，JavaScript共有6种方法可以表示一个字符：
```javascript
'\z' === 'z' // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```
## codePointAt()
JavaScript内部， 字符以UTF-16的格式储存， 每个字符固定为2个字节。 对于那些需要4个字节储存的字符（Unicode码点大于0xFFFF的字
符） ， JavaScript会认为它们是两个字符。\

对于这种4个字节的字
符， JavaScript不能正确处理， 字符串长度会误判为2， 而且charAt方法无法读取整个字符， charCodeAt方法只能分别返回前两个字节和后两个字节的
值。

ES6提供了codePointAt方法， 能够正确处理4个字节储存的字符， 返回一个字符的码点。
## String.fromCodePoint()
ES6提供了String.fromCodePoint方法， 可以识别0xFFFF的字符， 弥补了String.fromCharCode方法的不足。 在作用上， 正好与codePointAt方法相
反。

## 字符串的遍历器接口
ES6为字符串添加了遍历器接口（详见《Iterator》 一章） ， 使得字符串可以被for...of循环遍历
## at()

## normalize()
许多欧洲语言有语调符号和重音符号。 为了表示它们， Unicode提供了两种方法。 一种是直接提供带重音符号的字符， 比如Ǒ（\u01D1） 。 另一种是提
供合成符号（combining character） ， 即原字符与重音符号的合成， 两个字符合成一个字符， 比如O（\u004F） 和ˇ（\u030C） 合
成Ǒ（\u004F\u030C） 。\
ES6提供字符串实例的normalize()方法， 用来将字符的不同表示方法统一为同样的形式， 这称为Unicode正规化。\
normalize方法可以接受一个参数来指定normalize的方式， 参数的四个可选值如下。\
- NFC， 默认参数， 表示“标准等价合成”（Normalization Form Canonical Composition） ， 返回多个简单字符的合成字符。 所谓“标准等价”指的是视
觉和语义上的等价。
- NFD， 表示“标准等价分解”（Normalization Form Canonical Decomposition） ， 即在标准等价的前提下， 返回合成字符分解的多个简单字符。
- NFKC， 表示“兼容等价合成”（Normalization Form Compatibility Composition） ， 返回合成字符。 所谓“兼容等价”指的是语义上存在等价， 但视觉
上不等价， 比如“囍”和“喜喜”。 （这只是用来举例， normalize方法不能识别中文。 ）
- NFKD ， 表示“兼容等价分解”（Normalization Form Compatibility Decomposition） ， 即在兼容等价的前提下， 返回合成字符分解的多个简单字符。

## includes(),startsWith(),endsWith()
传统上， JavaScript只有indexOf 方法， 可以用来确定一个字符串是否包含在另一个字符串中。 ES6又提供了三种新方法。
+ includes()： 返回布尔值， 表示是否找到了参数字符串。
+ startsWith()： 返回布尔值， 表示参数字符串是否在源字符串的头部。
+ endsWith()： 返回布尔值， 表示参数字符串是否在源字符串的尾部。
```javascript
var s = 'Hello world!';
s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
```
这三个方法都支持第二个参数，表示开始搜索的位置。
```javascript
var s = 'Hello world!';
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

## repeat()
repeat 方法返回一个新字符串， 表示将原字符串重复n 次。\
参数如果是小数， 会被取整。\
如果repeat 的参数是负数或者Infinity ， 会报错。\
但是， 如果参数是0到-1之间的小数， 则等同于0， 这是因为会先进行取整运算。 0到-1之间的小数， 取整以后等于-0 ， repeat 视同为0。\
参数NaN 等同于0。\
如果repeat的参数是字符串， 则会先转换成数字。
## padStart(),padEnd()
ES7推出了字符串补全长度的功能。 如果某个字符串不够指定长度， 会在头部或尾部补全。 padStart用于头部补全， padEnd用于尾部补全。
```javascript
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'
'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```
上面代码中， padStart和padEnd一共接受两个参数， 第一个参数用来指定字符串的最小长度， 第二个参数是用来补全的字符串。
如果原字符串的长度， 等于或大于指定的最小长度， 则返回原字符串
```javascript
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx
```
如果用来补全的字符串与原字符串， 两者的长度之和超过了指定的最小长度， 则会截去超出位数的补全字符串。
```javascript
'abc'.padStart(10, '0123456789')
// '0123456abc
```
如果省略第二个参数， 则会用空格补全长度
```javascript
'x'.padStart(4) // ' x'
'x'.padEnd(4) // 'x '
```
padStart的常见用途是为数值补全指定位数。 下面代码生成10位的数值字符串。
```javascript
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
```
另一个用途是提示字符串格式。
```javascript
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```
## 模板字符串
模板字符串（template string） 是增强版的字符串， 用反引号（`） 标识。 它可以当作普通字符串使用， 也可以用来定义多行字符串， 或者在字符串中
嵌入变量。
```javascript
// 普通字符串
`In JavaScript '\n' is a line-feed.`
// 多行字符串
`In JavaScript this is
not legal.`
console.log(`string text line 1
string text line 2`);
// 字符串中嵌入变量
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```
如果使用模板字符串表示多行字符串， 所有的空格和缩进都会被保留在输出之中。
```javascript
$('#list').html(`
<ul>
<li>first</li>
<li>second</li>
</ul>
`);
```
上面代码中， 所有模板字符串的空格和换行， 都是被保留的， 比如<ul>标签前面会有一个换行。 如果你不想要这个换行， 可以使用trim方法消除它。
```javascript
$('#list').html(`
<ul>
<li>first</li>
<li>second</li>
</ul>
`.trim());
```
模板字符串中嵌入变量， 需要将变量名写在${}之中。
```javascript
function authorize(user, action) {
if (!user.hasPrivilege(action)) {
throw new Error(
// 传统写法为
// 'User '
// + user.name
// + ' is not authorized to do '
// + action
// + '.'
`User ${user.name} is not authorized to do ${action}.`);
}
}
```
大括号内部可以放入任意的JavaScript表达式， 可以进行运算， 以及引用对象属性。

模板字符串之中还能调用函数。

如果大括号中的值不是字符串， 将按照一般的规则转为字符串。 比如， 大括号中是一个对象， 将默认调用对象的toString方法。
如果模板字符串中的变量没有声明， 将报错。\
由于模板字符串的大括号内部， 就是执行JavaScript代码， 因此如果大括号内部是一个字符串， 将会原样输出。\
模板字符串甚至还能嵌套。
```javascript
const tmpl = addrs => `
<table>
${addrs.map(addr => `
<tr><td>${addr.first}</td></tr>
<tr><td>${addr.last}</td></tr>
`).join('')}
</table>
`;
```

## 模板编译
```javascript
var template = `
<ul>
<% for(var i=0; i < data.supplies.length; i++) { %>
<li><%= data.supplies[i] %></li>
<% } %>
</ul>
`;
```
上面代码在模板字符串之中， 放置了一个常规模板。 该模板使用<%...%>放置JavaScript代码， 使用<%= ... %>输出JavaScript表达式。
怎么编译这个模板字符串呢？
一种思路是将其转换为JavaScript表达式字符串。
```javascript
echo('<ul>');
for(var i=0; i < data.supplies.length; i++) {
echo('<li>');
echo(data.supplies[i]);
echo('</li>');
};
echo('</ul>');
```
这个转换使用正则表达式就行了。
```javascript
var evalExpr = /<%=(.+?)%>/g;
var expr = /<%([\s\S]+?)%>/g;
template = template
.replace(evalExpr, '`); \n echo( $1 ); \n echo(`')
.replace(expr, '`); \n $1 \n echo(`');
template = 'echo(`' + template + '`);';
```
然后， 将template封装在一个函数里面返回， 就可以了。
```javascript
var script =
`(function parse(data){
var output = "";
function echo(html){
output += html;
} $
{ template }
return output;
})`;
return script;
```
将上面的内容拼装成一个模板编译函数compile。
```javascript
function compile(template){
var evalExpr = /<%=(.+?)%>/g;
var expr = /<%([\s\S]+?)%>/g;template = template
.replace(evalExpr, '`); \n echo( $1 ); \n echo(`')
.replace(expr, '`); \n $1 \n echo(`');
template = 'echo(`' + template + '`);';
var script =
`(function parse(data){
var output = "";
function echo(html){
output += html;
} $
{ template }
return output;
})`;
return script;
}
```
compile函数的用法如下。
```javascript
var parse = eval(compile(template));
div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });
// <ul>
// <li>broom</li>
// <li>mop</li>
// <li>cleaner</li>
// </ul>
```

## 标签模板
模板字符串的功能， 不仅仅是上面这些。 它可以紧跟在一个函数名后面， 该函数将被调用来处理这个模板字符串。 这被称为“标签模板”功能（tagged
template） 。\
```javascript
alert`123`
// 等同于
alert(123)
```
标签模板其实不是模板， 而是函数调用的一种特殊形式。 “标签”指的就是函数， 紧跟在后面的模板字符串就是它的参数。
但是， 如果模板字符里面有变量， 就不是简单的调用了， 而是会将模板字符串先处理成多个参数， 再调用函数。

## String.raw()
ES6还为原生的String对象， 提供了一个raw方法。
String.raw方法， 往往用来充当模板字符串的处理函数， 返回一个斜杠都被转义（即斜杠前面再加一个斜杠） 的字符串， 对应于替换变量后的模板字
符串。
```javascript
String.raw`Hi\n${2+3}!`;
// "Hi\\n5!"
String.raw`Hi\u000A!`;
// 'Hi\\u000A!
```
如果原字符串的斜杠已经转义， 那么String.raw不会做任何处理。
```javascript
String.raw`Hi\\n`
// "Hi\\n
```

# 正则的扩展

## RegExp构造函数
在ES5中， RegExp构造函数的参数有两种情况。
第一种情况是， 参数是字符串， 这时第二个参数表示正则表达式的修饰符（flag） 。
```javascript
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;
```
第二种情况是， 参数是一个正则表示式， 这时会返回一个原有正则表达式的拷贝。
```javascript
var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;
```
但是， ES5不允许此时使用第二个参数， 添加修饰符， 否则会报错。\
ES6改变了这种行为。 如果RegExp构造函数第一个参数是一个正则对象， 那么可以使用第二个参数指定修饰符。 而且， 返回的正则表达式会忽略原有
的正则表达式的修饰符， 只使用新指定的修饰符。
```javascript
new RegExp(/abc/ig, 'i').flags
// "i
```
## 字符串的正则方法
字符串对象共有4个方法， 可以使用正则表达式： match()、 replace()、 search()和split()。

ES6将这4个方法， 在语言内部全部调用RegExp的实例方法， 从而做到所有与正则相关的方法， 全都定义在RegExp对象上。
- String.prototype.match 调用 RegExp.prototype[Symbol.match]
- String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
- String.prototype.search 调用 RegExp.prototype[Symbol.search]
- String.prototype.split 调用 RegExp.prototype[Symbol.split]

## u修饰符
ES6对正则表达式添加了u修饰符， 含义为“Unicode模式”， 用来正确处理大于\uFFFF的Unicode字符。 也就是说， 会正确处理四个字节的UTF-16编
码。
```javascript
/^\uD83D/u.test('\uD83D\uDC2A')
// false
/^\uD83D/.test('\uD83D\uDC2A')
// true
```
上面代码中， \uD83D\uDC2A是一个四个字节的UTF-16编码， 代表一个字符。 但是， ES5不支持四个字节的UTF-16编码， 会将其识别为两个字符， 导致第二行代码结果为true。 加了u修饰符以后， ES6就会识别其为一个字符， 所以第一行代码结果为false。
一旦加上u修饰符号， 就会修改下面这些正则表达式的行为。

1. 点字符
点（.） 字符在正则表达式中， 含义是除了换行符以外的任意单个字符。 对于码点大于0xFFFF的Unicode字符， 点字符不能识别， 必须加上u修饰符。
```javascript
var s = '';
/^.$/.test(s) // false
/^.$/u.test(s) // true
```
2. Unicode字符表示法
ES6新增了使用大括号表示Unicode字符， 这种表示法在正则表达式中必须加上u修饰符， 才能识别。

3. 量词
使用u修饰符后， 所有量词都会正确识别码点大于0xFFFF的Unicode字符。

另外， 只有在使用u修饰符的情况下， Unicode表达式当中的大括号才会被正确解读， 否则会被解读为量词。

4. 预定义模式
u修饰符也影响到预定义模式， 能否正确识别码点大于0xFFFF的Unicode字符。

5. i修饰符
有些Unicode字符的编码不同， 但是字型很相近， 比如， \u004B与\u212A都是大写的K
```javascript
/[a-z]/i.test('\u212A') // false
/[a-z]/iu.test('\u212A') // true
```
上面代码中， 不加u修饰符， 就无法识别非规范的K字符。

## y修饰符
除了u修饰符， ES6还为正则表达式添加了y修饰符， 叫做“粘连”（sticky） 修饰符。\
y修饰符的作用与g修饰符类似， 也是全局匹配， 后一次匹配都从上一次匹配成功的下一个位置开始。 不同之处在于， g修饰符只要剩余位置中存在匹配
就可， 而y修饰符确保匹配必须从剩余的第一个位置开始， 这也就是“粘连”的涵义。
```javascript
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;
r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]
r1.exec(s) // ["aa"]
r2.exec(s) // null
```
上面代码有两个正则表达式， 一个使用g修饰符， 另一个使用y修饰符。 这两个正则表达式各执行了两次， 第一次执行的时候， 两者行为相同， 剩余字
符串都是_aa_a。 由于g修饰没有位置要求， 所以第二次执行会返回结果， 而y修饰符要求匹配必须从头部开始， 所以返回null。
如果改一下正则表达式， 保证每次都能头部匹配， y修饰符就会返回结果了。
```javascript
var s = 'aaa_aa_a';
var r = /a+_/y;
r.exec(s) // ["aaa_"]
r.exec(s) // ["aa_"]
```
上面代码每次匹配， 都是从剩余字符串的头部开始。
使用lastIndex属性， 可以更好地说明y修饰符。
```javascript
const REGEX = /a/g;
// 指定从2号位置（y） 开始匹配
REGEX.lastIndex = 2;
// 匹配成功
const match = REGEX.exec('xaya');
// 在3号位置匹配成功
match.index // 3
// 下一次匹配从4号位开始
REGEX.lastIndex // 4
// 4号位开始匹配失败
REGEX.exec('xaxa') // null
```

## sticky属性
与y修饰符相匹配， ES6的正则对象多了sticky属性， 表示是否设置了y修饰符。
```javascript
var r = /hello\d/y;
r.sticky // true
```
## flags属性
ES6为正则表达式新增了flags属性， 会返回正则表达式的修饰符。
```javascript
// ES5的source属性
// 返回正则表达式的正文
/abc/ig.source
// "abc"
// ES6的flags属性
// 返回正则表达式的修饰符
/abc/ig.flags
// 'gi
```
## RegExp.escape()
字符串必须转义， 才能作为正则模式。
```javascript
function escapeRegExp(str) {
return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
} 
let str = '/path/to/resource.html?search=query';
escapeRegExp(str)
// "\/path\/to\/resource\.html\?search=query"
```
## 后行断言
JavaScript语言的正则表达式， 只支持先行断言（lookahead） 和先行否定断言（negative lookahead） ， 不支持后行断言（lookbehind） 和后行否定
断言（negative lookbehind） 。
目前， 有一个提案， 在ES7加入后行断言。 V8引擎4.9版已经支持， Chrome浏览器49版打开”experimental JavaScript features“开关（地址栏键
入about:flags） ， 就可以使用这项功能。
”先行断言“指的是， x只有在y前面才匹配， 必须写成/x(?=y)/。 比如， 只匹配百分号之前的数字， 要写成/\d+(?=%)/。 ”先行否定断言“指的是， x只有
不在y前面才匹配， 必须写成/x(?!y)/。 比如， 只匹配不在百分号之前的数字， 要写成/\d+(?!%)/。
```javascript
/\d+(?=%)/.exec('100% of US presidents have been male') // ["100"]
/\d+(?!%)/.exec('that’s all 44 of them') // ["44"]
```

# 数值的扩展

## 二进制和八进制的表示法
ES6提供了二进制和八进制数值的新的写法， 分别用前缀0b（或0B） 和0o（或0O） 表示。
```javascript
0b111110111 === 503 // true
0o767 === 503 // true
```
从ES5开始， 在严格模式之中， 八进制就不再允许使用前缀0表示， ES6进一步明确， 要使用前缀0o表示。
如果要将0b和0o前缀的字符串数值转为十进制， 要使用Number方法。
```javascript
Number('0b111') // 7
Number('0o10') // 8
```
## Number.isFinite(), Number.isNaN()
ES6在Number对象上， 新提供了Number.isFinite()和Number.isNaN()两个方法。
Number.isFinite()用来检查一个数值是否为有限的（finite） 。

Number.isNaN()用来检查一个值是否为NaN。

它们与传统的全局方法isFinite()和isNaN()的区别在于， 传统方法先调用Number()将非数值的值转为数值， 再进行判断， 而这两个新方法只对数值有
效， 非数值一律返回false。
## Number.parseInt(), Number.parseFloat()
ES6将全局方法parseInt()和parseFloat()， 移植到Number对象上面， 行为完全保持不变。
```javascript
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45
// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
```

## Number.isInteger()
Number.isInteger()用来判断一个值是否为整数。 需要注意的是， 在JavaScript内部， 整数和浮点数是同样的储存方法， 所以3和3.0被视为同一个值。
ES5可以通过下面的代码， 部署Number.isInteger()。
```javascript
(function (global) {
var floor = Math.floor,
isFinite = global.isFinite;
Object.defineProperty(Number, 'isInteger', {
value: function isInteger(value) {
return typeof value === 'number' && isFinite(value) &&
value > -9007199254740992 && value < 9007199254740992 &&
floor(value) === value;
},
configurable: true,
enumerable: false,
writable: true});
})(this);
```
## Number.EPSILON
ES6在Number对象上面， 新增一个极小的常量Number.EPSILON。
```javascript
Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// '0.00000000000000022204'
```
引入一个这么小的量的目的， 在于为浮点数计算， 设置一个误差范围。 我们知道浮点数计算是不精确的。
但是如果这个误差能够小于Number.EPSILON， 我们就可以认为得到了正确结果。

## 安全整数和Number.isSafeInteger()
JavaScript能够准确表示的整数范围在-2^53到2^53之间（不含两个端点） ， 超过这个范围， 无法精确表示这个值。
```javascript
Math.pow(2, 53) // 9007199254740992
9007199254740992 // 9007199254740992
9007199254740993 // 9007199254740992
Math.pow(2, 53) === Math.pow(2, 53) + 1
// true
```
ES6引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量， 用来表示这个范围的上下限。

## Math对象的扩展
ES6在Math对象上新增了17个与数学相关的方法。 所有这些方法都是静态方法， 只能在Math对象上调用。

### Math.trunc()
Math.trunc方法用于去除一个数的小数部分， 返回整数部分。\
对于非数值， Math.trunc内部使用Number方法将其先转为数值。\
对于空值和无法截取整数的值， 返回NaN。\
```javascript
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0
Math.trunc('123.456')
// 123
Math.trunc(NaN); // NaN
Math.trunc('foo'); // NaN
Math.trunc(); // NaN
```
对于没有部署这个方法的环境， 可以用下面的代码模拟。
```javascript
Math.trunc = Math.trunc || function(x) {
return x < 0 ? Math.ceil(x) : Math.floor(x);
};
```

### Math.sign()
Math.sign方法用来判断一个数到底是正数、 负数、 还是零。
它会返回五种值。
- 参数为正数， 返回+1；
- 参数为负数， 返回-1；
- 参数为0， 返回0；
- 参数为-0， 返回-0;
- 其他值， 返回NaN

### Math.cbrt()
Math.cbrt方法用于计算一个数的立方根。\
对于非数值， Math.cbrt方法内部也是先使用Number方法将其转为数值。\
```javascript
Math.cbrt(-1) // -1
Math.cbrt(0) // 0
Math.cbrt(1) // 1
Math.cbrt(2) // 1.2599210498948734
Math.cbrt('8') // 2
Math.cbrt('hello') // NaN
```

### Math.clz32()
JavaScript的整数使用32位二进制形式表示， Math.clz32方法返回一个数的32位无符号整数形式有多少个前导0。
```javascript
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2
```
上面代码中， 0的二进制形式全为0， 所以有32个前导0； 1的二进制形式是0b1， 只占1位， 所以32位之中有31个前导0； 1000的二进制形式
是0b1111101000， 一共有10位， 所以32位之中有22个前导0。
clz32这个函数名就来自”count leading zero bits in 32-bit binary representations of a number“（计算32位整数的前导0） 的缩写。

左移运算符（<<） 与Math.clz32方法直接相关。
```javascript
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1 << 1) // 30
Math.clz32(1 << 2) // 29
Math.clz32(1 << 29) // 2
```
对于小数， Math.clz32方法只考虑整数部分。
```javascript
Math.clz32(3.2) // 30
Math.clz32(3.9) // 30
```
对于空值或其他类型的值， Math.clz32方法会将它们先转为数值， 然后再计算
```javascript
Math.clz32() // 32
Math.clz32(NaN) // 32
Math.clz32(Infinity) // 32
Math.clz32(null) // 32
Math.clz32('foo') // 32
Math.clz32([]) // 32
Math.clz32({}) // 32
Math.clz32(true) // 31
```

### Math.imul()
Math.imul方法返回两个数以32位带符号整数形式相乘的结果， 返回的也是一个32位的带符号整数。

如果只考虑最后32位， 大多数情况下， Math.imul(a, b)与a * b的结果是相同的， 即该方法等同于(a * b)|0的效果（超过32位的部分溢出） 。 之所
以需要部署这个方法， 是因为JavaScript有精度限制， 超过2的53次方的值无法精确表示。 这就是说， 对于那些很大的数的乘法， 低位数值往往都是不
精确的， Math.imul方法可以返回正确的低位数值。\
```javascript
Math.imul(2, 4) // 8
Math.imul(-1, 8) // -8
Math.imul(-2, -2) // 4
(0x7fffffff * 0x7fffffff)|0 // 0
```
上面这个乘法算式， 返回结果为0。 但是由于这两个二进制数的最低位都是1， 所以这个结果肯定是不正确的， 因为根据二进制乘法， 计算结果的二进
制最低位应该也是1。 这个错误就是因为它们的乘积超过了2的53次方， JavaScript无法保存额外的精度， 就把低位的值都变成了0。 Math.imul方法可
以返回正确的值1。
```javascript
Math.imul(0x7fffffff, 0x7fffffff) // 1
```

### Math.fround()
Math.fround方法返回一个数的单精度浮点数形式。

### Math.hypot()
Math.hypot方法返回所有参数的平方和的平方根。
如果参数不是数值， Math.hypot方法会将其转为数值。 只要有一个参数无法转为数值， 就会返回NaN。
```javascript
Math.hypot(3, 4); // 5
Math.hypot(3, 4, 5); // 7.0710678118654755
Math.hypot(); // 0
Math.hypot(NaN); // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5'); // 7.0710678118654755
Math.hypot(-3); // 3
```
### 对数方法
#### Math.expm1()
Math.expm1(x)返回ex - 1， 即Math.exp(x) - 1。
```javascript
Math.expm1(-1) // -0.6321205588285577
Math.expm1(0) // 0
Math.expm1(1) // 1.718281828459045
```
#### Math.log1p()
Math.log1p(x)方法返回1 + x的自然对数， 即Math.log(1 + x)。 如果x小于-1， 返回NaN。
```javascript
Math.log1p(1) // 0.6931471805599453
Math.log1p(0) // 0
Math.log1p(-1) // -Infinity
Math.log1p(-2) // NaN
```
#### Math.log10()
Math.log10(x)返回以10为底的x的对数。 如果x小于0， 则返回NaN。
```javascript
Math.log10(2) // 0.3010299956639812
Math.log10(1) // 0
Math.log10(0) // -Infinity
Math.log10(-2) // NaN
Math.log10(100000) // 5
```
#### Math.log2()
Math.log2(x)返回以2为底的x的对数。 如果x小于0， 则返回NaN。
```javascript
Math.log2(3) // 1.584962500721156
Math.log2(2) // 1
Math.log2(1) // 0
Math.log2(0) // -Infinity
Math.log2(-2) // NaN
Math.log2(1024) // 10
Math.log2(1 << 29) // 29
```
对于没有部署这个方法的环境， 可以用下面的代码模拟。
```javascript
Math.log2 = Math.log2 || function(x) {
return Math.log(x) / Math.LN2;
};
```
### 三角函数方法
ES6新增了6个三角函数方法。
- Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
- Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
- Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
- Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
- Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
- Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）

## 指数运算符
ES7新增了一个指数运算符（**） ， 目前Babel转码器已经支持。\

指数运算符可以与等号结合， 形成一个新的赋值运算符（**=） 。
```javascript
2 ** 2 // 4
2 ** 3 // 8
let a = 2;
a **= 2;
// 等同于 a = a * a;
let b = 3;
b **= 3;
// 等同于 b = b * b * b;
```

---
# 数组的扩展

## Array.from()
Array.from方法用于将两类对象转为真正的数组： 类似数组的对象（array-like object） 和可遍历（iterable） 的对象（包括ES6新增的数据结构Set和
Map） 。
下面是一个类似数组的对象， Array.from将它转为真正的数组。
```javascript
let arrayLike = {
'0': 'a',
'1': 'b',
'2': 'c',
length: 3
};
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```
实际应用中， 常见的类似数组的对象是DOM操作返回的NodeList集合， 以及函数内部的arguments对象。 Array.from都可以将它们转为真正的数组。

只要是部署了Iterator接口的数据结构， Array.from都能将其转为数组。
```javascript
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']
let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']
```
如果参数是一个真正的数组， Array.from会返回一个一模一样的新数组。
值得提醒的是， 扩展运算符（...） 也可以将某些数据结构转为数组。
```javascript
// arguments对象
function foo() {
var args = [...arguments];
}
// NodeList对象
[...document.querySelectorAll('div')]
```
扩展运算符背后调用的是遍历器接口（Symbol.iterator） ， 如果一个对象没有部署这个接口， 就无法转换。 Array.from方法则是还支持类似数组的对
象。 所谓类似数组的对象， 本质特征只有一点， 即必须有length属性。 因此， 任何有length属性的对象， 都可以通过Array.from方法转为数组， 而此
时扩展运算符就无法转换。

## Array.of()
Array.of方法用于将一组值， 转换为数组。\
这个方法的主要目的， 是弥补数组构造函数Array()的不足。 因为参数个数的不同， 会导致Array()的行为有差异。\
```javascript
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```

## 数组实例的copyWithin()
数组实例的copyWithin方法， 在当前数组内部， 将指定位置的成员复制到其他位置（会覆盖原有成员） ， 然后返回当前数组。 也就是说， 使用这个方
法， 会修改当前数组。
```javascript
Array.prototype.copyWithin(target, start = 0, end = this.length)
```
它接受三个参数。
- target（必需） ： 从该位置开始替换数据。
- start（可选） ： 从该位置开始读取数据， 默认为0。 如果为负值， 表示倒数。
- end（可选） ： 到该位置前停止读取数据， 默认等于数组长度。 如果为负值， 表示倒数。

## 数组实例的find()和findIndex()
数组实例的find方法， 用于找出第一个符合条件的数组成员。 它的参数是一个回调函数， 所有数组成员依次执行该回调函数， 直到找出第一个返回值
为true的成员， 然后返回该成员。 如果没有符合条件的成员， 则返回undefined。
```javascript
[1, 4, -5, 10].find((n) => n < 0)
// -5
```
数组实例的findIndex方法的用法与find方法非常类似， 返回第一个符合条件的数组成员的位置， 如果所有成员都不符合条件， 则返回-1。

这两个方法都可以接受第二个参数， 用来绑定回调函数的this对象。
另外， 这两个方法都可以发现NaN， 弥补了数组的IndexOf方法的不足。

## 数组实例的fill()
fill方法使用给定值， 填充一个数组。
fill方法还可以接受第二个和第三个参数， 用于指定填充的起始位置和结束位置。
```javascript
new Array(3).fill(7)
// [7, 7, 7]
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

## 数组实例的entries()， keys()和values()
ES6提供三个新的方法——entries()， keys()和values()——用于遍历数组。 它们都返回一个遍历器对象（详见《Iterator》 一章） ， 可以
用for...of循环进行遍历， 唯一的区别是keys()是对键名的遍历、 values()是对键值的遍历， entries()是对键值对的遍历。
```javascript
for (let index of ['a', 'b'].keys()) {
console.log(index);
} 
// 0
// 1
for (let elem of ['a', 'b'].values()) {
console.log(elem);
} 
// 'a'
// 'b'
for (let [index, elem] of ['a', 'b'].entries()) {
console.log(index, elem);
}
// 0 "a"
// 1 "b"
```
## 数组实例的includes()
Array.prototype.includes方法返回一个布尔值， 表示某个数组是否包含给定的值， 与字符串的includes方法类似。 该方法属于ES7， 但Babel转码器
已经支持。
该方法的第二个参数表示搜索的起始位置， 默认为0。 如果第二个参数为负数， 则表示倒数的位置， 如果这时它大于数组长度（比如第二个参数为-4，
但数组长度为3） ， 则会重置为从0开始。
```javascript
[1, 2, 3].includes(2); // true
[1, 2, 3].includes(4); // false
[1, 2, NaN].includes(NaN); // true
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true
```
没有该方法之前， 我们通常使用数组的indexOf方法， 检查是否包含某个值。
indexOf方法有两个缺点， 一是不够语义化， 它的含义是找到参数值的第一个出现位置， 所以要去比较是否不等于-1， 表达起来不够直观。 二是， 它内
部使用严格相当运算符（===） 进行判断， 这会导致对NaN的误判。

另外， Map和Set数据结构有一个has方法， 需要注意与includes区分。
- Map结构的has方法， 是用来查找键名的， 比
  如Map.prototype.has(key)、 WeakMap.prototype.has(key)、 Reflect.has(target, propertyKey)。
- Set结构的has方法， 是用来查找值的， 比如Set.prototype.has(value)、 WeakSet.prototype.has(value)。

## 数组的空位
数组的空位指， 数组的某一个位置没有任何值。 比如， Array构造函数返回的数组都是空位。\
注意， 空位不是undefined， 一个位置的值等于undefined， 依然是有值的。 空位是没有任何值， in运算符可以说明这一点。\
```javascript
0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false
```
上面代码说明， 第一个数组的0号位置是有值的， 第二个数组的0号位置没有值。
ES5对空位的处理， 已经很不一致了， 大多数情况下会忽略空位。
- forEach(), filter(), every() 和some()都会跳过空位。
- map()会跳过空位， 但会保留这个值
- join()和toString()会将空位视为undefined， 而undefined和null会被处理成空字符串。

ES6则是明确将空位转为undefined。
Array.from方法会将数组的空位， 转为undefined， 也就是说， 这个方法不会忽略空位。

扩展运算符（...） 也会将空位转为undefined。

copyWithin()会连空位一起拷贝。\
fill()会将空位视为正常的数组位置。\
for...of循环也会遍历空位。\
上面代码中， 数组arr有两个空位， for...of并没有忽略它们。 如果改成map方法遍历， 空位是会跳过的。
entries()、 keys()、 values()、 find()和findIndex()会将空位处理成undefined。

# 函数的扩展
## 函数参数的默认值
### 基础用法 
在ES6之前， 不能直接为函数的参数指定默认值， 只能采用变通的方法。\
```javascript
function log(x, y) {
y = y || 'World';
console.log(x, y);
} 
log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World
```
上面代码检查函数log的参数y有没有赋值， 如果没有， 则指定默认值为World。 这种写法的缺点在于， 如果参数y赋值了， 但是对应的布尔值
为false， 则该赋值不起作用。 就像上面代码的最后一行， 参数y等于空字符， 结果被改为默认值。
为了避免这个问题， 通常需要先判断一下参数y是否被赋值， 如果没有， 再等于默认值。
```javascript
if (typeof y === 'undefined') {
y = 'World';
}
```
ES6允许为函数的参数设置默认值， 即直接写在参数定义的后面。
```javascript
function log(x, y = 'World') {
console.log(x, y);
} 
log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```
### 与解构赋值默认值结合使用
参数默认值可以与解构赋值的默认值， 结合起来使用。
```javascript
function foo({x, y = 5}) {
console.log(x, y);
} 
foo({}) // undefined, 5
foo({x: 1}) // 1, 5
foo({x: 1, y: 2}) // 1, 2
foo() // TypeError: Cannot read property 'x' of undefined
```
### 参数默认值的位置
通常情况下， 定义了默认值的参数， 应该是函数的尾参数。 因为这样比较容易看出来， 到底省略了哪些参数。 如果非尾部的参数设置默认值， 实际上
这个参数是没法省略的。
```javascript
// 例一
function f(x = 1, y) {
return [x, y];
} f
() // [1, undefined]
f(2) // [2, undefined])
f(, 1) // 报错
f(undefined, 1) // [1, 1]
// 例二
function f(x, y = 5, z) {
return [x, y, z];
} 
f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]
```
上面代码中， 有默认值的参数都不是尾参数。 这时， 无法只省略该参数， 而不省略它后面的参数， 除非显式输入undefined。
如果传入undefined， 将触发该参数等于默认值， null则没有这个效果。

### 函数的默认值
指定了默认值以后， 函数的length属性， 将返回没有指定默认值的参数个数。 也就是说， 指定了默认值后， length属性将失真。
```javascript
(function (a) {}).length // 1(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
```
上面代码中， length属性的返回值， 等于函数的参数个数减去指定了默认值的参数个数。 比如， 上面最后一个函数， 定义了3个参数， 其中有一个参
数c指定了默认值， 因此length属性等于3减去1， 最后得到2。
这是因为length属性的含义是， 该函数预期传入的参数个数。 某个参数指定默认值以后， 预期传入的参数个数就不包括这个参数了。 同理， rest参数也
不会计入length属性。

### 作用域
一个需要注意的地方是， 如果参数默认值是一个变量， 则该变量所处的作用域， 与其他变量的作用域规则是一样的， 即先是当前函数的作用域， 然后
才是全局作用域。

### 应用
利用参数默认值， 可以指定某一个参数不得省略， 如果省略就抛出一个错误。
```javascript
function throwIfMissing() {
throw new Error('Missing parameter');
} 
function foo(mustBeProvided = throwIfMissing()) {
return mustBeProvided;
}foo()
// Error: Missing parameter
```
上面代码的foo函数， 如果调用的时候没有参数， 就会调用默认值throwIfMissing函数， 从而抛出一个错误。
从上面代码还可以看到， 参数mustBeProvided的默认值等于throwIfMissing函数的运行结果（即函数名之后有一对圆括号） ， 这表明参数的默认值不
是在定义时执行， 而是在运行时执行（即如果参数已经赋值， 默认值中的函数就不会运行） ， 这与python语言不一样。

## rest参数
ES6引入rest参数（形式为“...变量名”） ， 用于获取函数的多余参数， 这样就不需要使用arguments对象了。 rest参数搭配的变量是一个数组， 该变量将
多余的参数放入数组中。
```javascript
function add(...values) {
let sum = 0;
for (var val of values) {
sum += val;
} 
return sum;
} 
add(2, 5, 3) // 10
```
```javascript
// arguments变量的写法
function sortNumbers() {
return Array.prototype.slice.call(arguments).sort();
}
// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```
上面代码的两种写法， 比较后可以发现， rest参数的写法更自然也更简洁。
rest参数中的变量代表一个数组， 所以数组特有的方法都可以用于这个变量。 下面是一个利用rest参数改写数组push方法的例子。

注意， rest参数之后不能再有其他参数（即只能是最后一个参数） ， 否则会报错。

## 扩展运算符
### 含义
扩展运算符（spread） 是三个点（...） 。 它好比rest参数的逆运算， 将一个数组转为用逗号分隔的参数序列。
```javascript
console.log(...[1, 2, 3])
// 1 2 3
console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5
[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```
该运算符主要用于函数调用。
```javascript
function push(array, ...items) {
array.push(...items);
} 
function add(x, y) {
return x + y;
}
var numbers = [4, 38];
add(...numbers) // 42
```
扩展运算符与正常的函数参数可以结合使用， 非常灵活。
```javascript
function f(v, w, x, y, z) { }
var args = [0, 1];
f(-1, ...args, 2, ...[3]);
```
### 替代数组的apply方法
由于扩展运算符可以展开数组， 所以不再需要apply方法， 将数组转为函数的参数了。
```javascript
// ES5的写法
function f(x, y, z) {
// ...
} 
var args = [0, 1, 2];
f.apply(null, args);
// ES6的写法
function f(x, y, z) {
// ...
} 
var args = [0, 1, 2];
f(...args);
```

### 扩展运算符的应用
1. 合并数组
扩展运算符提供了数组合并的新写法。
```javascript
// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]
var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];
// ES5的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]
// ES6的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
```
2. 与解构赋值结合
扩展运算符可以与解构赋值结合起来， 用于生成数组。
```javascript
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list
```
```javascript
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest // [2, 3, 4, 5]
const [first, ...rest] = [];
first // undefined
rest // []:
const [first, ...rest] = ["foo"];
first // "foo"
rest // []
```
如果将扩展运算符用于数组赋值， 只能放在参数的最后一位， 否则会报错。

3. 函数的返回值
JavaScript的函数只能返回一个值， 如果需要返回多个值， 只能返回数组或对象。 扩展运算符提供了解决这个问题的一种变通方法。
```javascript
var dateFields = readDateFields(database);
var d = new Date(...dateFields);
```
4. 字符串
扩展运算符还可以将字符串转为真正的数组。
```javascript
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```

5. 实现了Iterator接口的对象
任何Iterator接口的对象， 都可以用扩展运算符转为真正的数组。
```javascript
var nodeList = document.querySelectorAll('div');
var array = [...nodeList];
```
上面代码中， querySelectorAll方法返回的是一个nodeList对象。 它不是数组， 而是一个类似数组的对象。 这时， 扩展运算符可以将其转为真正的数
组， 原因就在于NodeList对象实现了Iterator接口。
对于那些没有部署Iterator接口的类似数组的对象， 扩展运算符就无法将其转为真正的数组。
```javascript
let arrayLike = {
'0': 'a',
'1': 'b',
'2': 'c',
length: 3
};
// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];
```
上面代码中， arrayLike是一个类似数组的对象， 但是没有部署Iterator接口， 扩展运算符就会报错。 这时， 可以改为使用Array.from方法
将arrayLike转为真正的数组。

6. Map 和 Set 结构，Generator函数
扩展运算符内部调用的是数据结构的Iterator接口， 因此只要具有Iterator接口的对象， 都可以使用扩展运算符， 比如Map结构。
```javascript
let map = new Map([
[1, 'one'],
[2, 'two'],
[3, 'three'],
]);
let arr = [...map.keys()]; // [1, 2, 3]
```
Generator函数运行后， 返回一个遍历器对象， 因此也可以使用扩展运算符。
```javascript
var go = function*(){
yield 1;
yield 2;
yield 3;
};
[...go()] // [1, 2, 3]
```

## name属性
函数的name属性， 返回该函数的函数名。

## 箭头函数
### 基本用法
ES6允许使用“箭头”（=>） 定义函数。
```javascript
var f = v => v;
//上面的箭头函数等同于
var f = function(v) {
return v;
};
```
如果箭头函数不需要参数或需要多个参数， 就使用一个圆括号代表参数部分。
```javascript
var f = () => 5;
// 等同于
var f = function () { return 5 };
var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
return num1 + num2;
};
```
如果箭头函数的代码块部分多于一条语句， 就要使用大括号将它们括起来， 并且使用return语句返回。\
由于大括号被解释为代码块， 所以如果箭头函数直接返回一个对象， 必须在对象外面加上括号。\
箭头函数可以与变量解构结合使用。
```javascript
var sum = (num1, num2) => { return num1 + num2; }
var getTempItem = id => ({ id: id, name: "Temp" });
const full = ({ first, last }) => first + ' ' + last;
// 等同于
function full(person) {
return person.first + ' ' + person.last;
}
```
箭头函数的一个用处是简化回调函数。
```javascript
// 正常函数写法
[1,2,3].map(function (x) {
return x * x;
});
// 箭头函数写法
[1,2,3].map(x => x * x);
```
下面是rest参数与箭头函数结合的例子。
```javascript
const numbers = (...nums) => nums;
numbers(1, 2, 3, 4, 5)
// [1,2,3,4,5]
const headAndTail = (head, ...tail) => [head, tail];
headAndTail(1, 2, 3, 4, 5)
// [1,[2,3,4,5]]
```

### 使用注意点
箭头函数有几个使用注意点。
（1） 函数体内的this对象， 就是定义时所在的对象， 而不是使用时所在的对象。
（2） 不可以当作构造函数， 也就是说， 不可以使用new命令， 否则会抛出一个错误。
（3） 不可以使用arguments对象， 该对象在函数体内不存在。 如果要用， 可以用Rest参数代替。
（4） 不可以使用yield命令， 因此箭头函数不能用作Generator函数。

上面四点中， 第一点尤其值得注意。 this对象的指向是可变的， 但是在箭头函数中， 它是固定的。
```javascript
function foo() {
setTimeout(() => {
console.log('id:', this.id);
}, 100);
} 
var id = 21;
foo.call({ id: 42 });
// id: 42
```
上面代码中， setTimeout的参数是一个箭头函数， 这个箭头函数的定义生效是在foo函数生成时， 而它的真正执行要等到100毫秒后。 如果是普通函
数， 执行时this应该指向全局对象window， 这时应该输出21。 但是， 箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}） ， 所
以输出的是42。
箭头函数可以让setTimeout里面的this， 绑定定义时所在的作用域， 而不是指向运行时所在的作用域。 下面是另一个例子。
```javascript
function Timer() {
this.s1 = 0;
this.s2 = 0;
// 箭头函数
setInterval(() => this.s1++, 1000);
// 普通函数
setInterval(function () {
this.s2++;
}, 1000);
} 
var timer = new Timer();
setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0
```
上面代码中， Timer函数内部设置了两个定时器， 分别使用了箭头函数和普通函数。 前者的this绑定定义时所在的作用域（即Timer函数） ， 后者
的this指向运行时所在的作用域（即全局对象） 。 所以， 3100毫秒之后， timer.s1被更新了3次， 而timer.s2一次都没更新。\
箭头函数可以让this指向固定化， 这种特性很有利于封装回调函数。 下面是一个例子， DOM事件的回调函数封装在一个对象里面。\
```javascript
var handler = {
id: '123456',
init: function() {
document.addEventListener('click',
event => this.doSomething(event.type), false);
},
doSomething: function(type) {
console.log('Handling ' + type + ' for ' + this.id);
}
};
```
上面代码的init方法中， 使用了箭头函数， 这导致这个箭头函数里面的this， 总是指向handler对象。 否则， 回调函数运行时， this.doSomething这
一行会报错， 因为此时this指向document对象。\
this指向的固定化， 并不是因为箭头函数内部有绑定this的机制， 实际原因是箭头函数根本没有自己的this， 导致内部的this就是外层代码块
的this。 正是因为它没有this， 所以也就不能用作构造函数。\
所以， 箭头函数转成ES5的代码如下。\
```javascript
// ES6
function foo() {
setTimeout(() => {
console.log('id:', this.id);
}, 100);
} 
// ES5
function foo() {
var _this = this;
setTimeout(function () {
console.log('id:', _this.id);
}, 100);
}
```
上面代码中， 转换后的ES5版本清楚地说明了， 箭头函数里面根本没有自己的this， 而是引用外层的this。

除了this， 以下三个变量在箭头函数之中也是不存在的， 指向外层函数的对应变量： arguments、 super、 new.target。\
另外， 由于箭头函数没有自己的this， 所以当然也就不能用call()、 apply()、 bind()这些方法去改变this的指向。

### 嵌套的箭头函数
箭头函数内部， 还可以再使用箭头函数。 下面是一个ES5语法的多重嵌套函数。
```javascript
function insert(value) {
return {into: function (array) {
return {after: function (afterValue) {
array.splice(array.indexOf(afterValue) + 1, 0, value);
return array;
}};
}};
} 
insert(2).into([1, 3]).after(1); //[1, 2, 3]
```
上面这个函数， 可以使用箭头函数改写。
```javascript
let insert = (value) => ({into: (array) => ({after: (afterValue) => {
array.splice(array.indexOf(afterValue) + 1, 0, value);
return array;
}})});
insert(2).into([1, 3]).after(1); //[1, 2, 3]
```
下面是一个部署管道机制（pipeline） 的例子， 即前一个函数的输出是后一个函数的输入。
```javascript
const pipeline = (...funcs) =>
val => funcs.reduce((a, b) => b(a), val);
const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);
addThenMult(5)
// 12
```
如果觉得上面的写法可读性比较差， 也可以采用下面的写法。
```javascript
const plus1 = a => a + 1;
const mult2 = a => a * 2;
mult2(plus1(5))
// 12
```
箭头函数还有一个功能， 就是可以很方便地改写λ演算。
```javascript
// λ演算的写法
fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))
// ES6的写法
var fix = f => (x => f(v => x(x)(v)))
(x => f(v => x(x)(v)));
```
上面两种写法， 几乎是一一对应的。 由于λ演算对于计算机科学非常重要， 这使得我们可以用ES6作为替代工具， 探索计算机科学。

## 函数绑定
箭头函数可以绑定this对象， 大大减少了显式绑定this对象的写法（call、 apply、 bind） 。 但是， 箭头函数并不适用于所有场合， 所以ES7提出
了“函数绑定”（function bind） 运算符， 用来取代call、 apply、 bind调用。 虽然该语法还是ES7的一个提案， 但是Babel转码器已经支持。函数绑定运算符是并排的两个双冒号（::） ， 双冒号左边是一个对象， 右边是一个函数。 该运算符会自动将左边的对象， 作为上下文环境（即this对
象） ， 绑定到右边的函数上面。
```javascript
foo::bar;
// 等同于
bar.bind(foo);
foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
return obj::hasOwnProperty(key);
}
```
如果双冒号左边为空， 右边是一个对象的方法， 则等于将该方法绑定在该对象上面。
```javascript
var method = obj::obj.foo;
// 等同于
var method = ::obj.foo;
let log = ::console.log;
// 等同于
var log = console.log.bind(console);
```
由于双冒号运算符返回的还是原对象， 因此可以采用链式写法。
```javascript
// 例一
import { map, takeWhile, forEach } from "iterlib";
getPlayers()
::map(x => x.character())
::takeWhile(x => x.strength > 100)
::forEach(x => console.log(x));
// 例二
let { find, html } = jake;
document.querySelectorAll("div.myClass")
::find("p")
::html("hahaha");
```

## 尾调用优化
### 什么是尾调用
尾调用（Tail Call） 是函数式编程的一个重要概念， 本身非常简单， 一句话就能说清楚， 就是指某个函数的最后一步是调用另一个函数。
```javascript
function f(x){
return g(x);
}
```
上面代码中， 函数f的最后一步是调用函数g， 这就叫尾调用。\
以下三种情况， 都不属于尾调用。
```javascript
// 情况一
function f(x){
let y = g(x);
return y;
}
// 情况二
function f(x){
return g(x) + 1;
} 
// 情况三
function f(x){
g(x);
}
```
上面代码中， 情况一是调用函数g之后， 还有赋值操作， 所以不属于尾调用， 即使语义完全一样。 情况二也属于调用后还有操作， 即使写在一行内。 情
况三等同于下面的代码。
```javascript
function f(x){
g(x);
return undefined;
}
```

### 尾调用优化
尾调用之所以与其他调用不同， 就在于它的特殊的调用位置。\
我们知道， 函数调用会在内存形成一个“调用记录”， 又称“调用帧”（call frame） ， 保存调用位置和内部变量等信息。 如果在函数A的内部调用函数B，
那么在A的调用帧上方， 还会形成一个B的调用帧。 等到B运行结束， 将结果返回到A， B的调用帧才会消失。 如果函数B内部还调用函数C， 那就还有一
个C的调用帧， 以此类推。 所有的调用帧， 就形成一个“调用栈”（call stack） 。\
尾调用由于是函数的最后一步操作， 所以不需要保留外层函数的调用帧， 因为调用位置、 内部变量等信息都不会再用到了， 只要直接用内层函数的调
用帧， 取代外层函数的调用帧就可以了。\
```javascript
function f() {
let m = 1;
let n = 2;
return g(m + n);
} f
();
// 等同于
function f() {
return g(3);
} 
f();
// 等同于
g(3);
```
上面代码中， 如果函数g不是尾调用， 函数f就需要保存内部变量m和n的值、 g的调用位置等信息。 但由于调用g之后， 函数f就结束了， 所以执行到最后
一步， 完全可以删除 f(x) 的调用帧， 只保留 g(3) 的调用帧。\
这就叫做“尾调用优化”（Tail call optimization） ， 即只保留内层函数的调用帧。 如果所有函数都是尾调用， 那么完全可以做到每次执行时， 调用帧只有
一项， 这将大大节省内存。 这就是“尾调用优化”的意义。\
注意， 只有不再用到外层函数的内部变量， 内层函数的调用帧才会取代外层函数的调用帧， 否则就无法进行“尾调用优化”。
```javascript
function addOne(a){
var one = 1;
function inner(b){
return b + one;
}
return inner(a);
}
```

### 尾递归
函数调用自身， 称为递归。 如果尾调用自身， 就称为尾递归。\
递归非常耗费内存， 因为需要同时保存成千上百个调用帧， 很容易发生“栈溢出”错误（stack overflow） 。 但对于尾递归来说， 由于只存在一个调用
帧， 所以永远不会发生“栈溢出”错误。
```javascript
function factorial(n) {
if (n === 1) return 1;
return n * factorial(n - 1);
} 
factorial(5) // 120
```
上面代码是一个阶乘函数， 计算n的阶乘， 最多需要保存n个调用记录， 复杂度 O(n) 。
如果改写成尾递归， 只保留一个调用记录， 复杂度 O(1) 。
```javascript
function factorial(n, total) {
if (n === 1) return total;
return factorial(n - 1, n * total);
} 
factorial(5, 1) // 120
```
还有一个比较著名的例子， 就是计算fibonacci 数列， 也能充分说明尾递归优化的重要性
如果是非尾递归的fibonacci 递归方法。
```javascript
function Fibonacci (n) {
if ( n <= 1 ) {return 1};
return Fibonacci(n - 1) + Fibonacci(n - 2);
} 
Fibonacci(10); // 89
// Fibonacci(100)
// Fibonacci(500)
// 堆栈溢出了
```
如果我们使用尾递归优化过的fibonacci 递归算法
```javascript
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
if( n <= 1 ) {return ac2};
return Fibonacci2 (n - 1, ac2, ac1 + ac2);
} 
Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity
```
由此可见， “尾调用优化”对递归操作意义重大， 所以一些函数式编程语言将其写入了语言规格。 ES6也是如此， 第一次明确规定， 所有ECMAScript的实
现， 都必须部署“尾调用优化”。 这就是说， 在ES6中， 只要使用尾递归， 就不会发生栈溢出， 相对节省内存。

### 递归函数的改写
尾递归的实现， 往往需要改写递归函数， 确保最后一步只调用自身。 做到这一点的方法， 就是把所有用到的内部变量改写成函数的参数。 比如上面的
例子， 阶乘函数 factorial 需要用到一个中间变量 total ， 那就把这个中间变量改写成函数的参数。 这样做的缺点就是不太直观， 第一眼很难看出来， 为
什么计算5的阶乘， 需要传入两个参数5和1？\
两个方法可以解决这个问题。 方法一是在尾递归函数之外， 再提供一个正常形式的函数。
```javascript
function tailFactorial(n, total) {
if (n === 1) return total;
return tailFactorial(n - 1, n * total);
} 
function factorial(n) {
return tailFactorial(n, 1);
} 
factorial(5) // 120
```
上面代码通过一个正常形式的阶乘函数 factorial ， 调用尾递归函数 tailFactorial ， 看起来就正常多了。\
函数式编程有一个概念， 叫做柯里化（currying） ， 意思是将多参数的函数转换成单参数的形式。 这里也可以使用柯里化。
```javascript
function currying(fn, n) {
return function (m) {
return fn.call(this, m, n);
};
} 
function tailFactorial(n, total) {
if (n === 1) return total;
return tailFactorial(n - 1, n * total);
} 
const factorial = currying(tailFactorial, 1);
factorial(5) // 120
```
上面代码通过柯里化， 将尾递归函数 tailFactorial 变为只接受1个参数的 factorial 。
第二种方法就简单多了， 就是采用ES6的函数默认值。
```javascript
function factorial(n, total = 1) {
if (n === 1) return total;
return factorial(n - 1, n * total);
} 
factorial(5) // 120
```
总结一下， 递归本质上是一种循环操作。 纯粹的函数式编程语言没有循环操作命令， 所有的循环都用递归实现， 这就是为什么尾递归对这些语言极其
重要。 对于其他支持“尾调用优化”的语言（比如Lua， ES6） ， 只需要知道循环可以用递归代替， 而一旦使用递归， 就最好使用尾递归。

### 严格模式
ES6的尾调用优化只在严格模式下开启， 正常模式是无效的。\
这是因为在正常模式下， 函数内部有两个变量， 可以跟踪函数的调用栈。\
func.arguments： 返回调用时函数的参数。\
func.caller： 返回调用当前函数的那个函数。\
尾调用优化发生时， 函数的调用栈会改写， 因此上面两个变量就会失真。 \
严格模式禁用这两个变量， 所以尾调用模式仅在严格模式下生效。\
```javascript
function restricted() {
"use strict";
restricted.caller; // 报错
restricted.arguments; // 报错
} 
restricted();
```

### 尾递归优化的实现
尾递归优化只在严格模式下生效， 那么正常模式下， 或者那些不支持该功能的环境中， 有没有办法也使用尾递归优化呢？ 回答是可以的， 就是自己实
现尾递归优化。\
它的原理非常简单。 尾递归之所以需要优化， 原因是调用栈太多， 造成溢出， 那么只要减少调用栈， 就不会溢出。 怎么做可以减少调用栈呢？ 就是采
用“循环”换掉“递归”。
```javascript
function sum(x, y) {
if (y > 0) {
return sum(x + 1, y - 1);
} else {
return x;
}
} 
sum(1, 100000)
// Uncaught RangeError: Maximum call stack size exceeded(…)
```
上面代码中， sum是一个递归函数， 参数x是需要累加的值， 参数y控制递归次数。 一旦指定sum递归100000次， 就会报错， 提示超出调用栈的最大次
数。\
蹦床函数（trampoline） 可以将递归执行转为循环执行。\
```javascript
function trampoline(f) {
while (f && f instanceof Function) {
f = f();
} 
return f;
}
```
上面就是蹦床函数的一个实现， 它接受一个函数f作为参数。 只要f执行后返回一个函数， 就继续执行。 注意， 这里是返回一个函数， 然后执行该函
数， 而不是函数里面调用函数， 这样就避免了递归执行， 从而就消除了调用栈过大的问题。\
然后， 要做的就是将原来的递归函数， 改写为每一步返回另一个函数。\
```javascript
function sum(x, y) {
if (y > 0) {
return sum.bind(null, x + 1, y - 1);
} else {
return x;
}
}
```
上面代码中， sum函数的每次执行， 都会返回自身的另一个版本。\
现在， 使用蹦床函数执行sum， 就不会发生调用栈溢出。\
蹦床函数并不是真正的尾递归优化， 下面的实现才是。
```javascript
function tco(f) {var value;
var active = false;
var accumulated = [];
return function accumulator() {
accumulated.push(arguments);
if (!active) {
active = true;
while (accumulated.length) {
value = f.apply(this, accumulated.shift());
} 
active = false;
return value;
}
};
} 
var sum = tco(function(x, y) {
if (y > 0) {
return sum(x + 1, y - 1)
} 
else {
return x
}
});
sum(1, 100000)
// 100001
```
上面代码中， tco函数是尾递归优化的实现， 它的奥妙就在于状态变量active。 默认情况下， 这个变量是不激活的。 一旦进入尾递归优化的过程， 这个
变量就激活了。 然后， 每一轮递归sum返回的都是undefined， 所以就避免了递归执行； 而accumulated数组存放每一轮sum执行的参数， 总是有值的，
这就保证了accumulator函数内部的while循环总是会执行。 这样就很巧妙地将“递归”改成了“循环”， 而后一轮的参数会取代前一轮的参数， 保证了调用
栈只有一层。

## 函数参数的尾逗号
ES7有一个提案， 允许函数的最后一个参数有尾逗号（trailing comma） 。
目前， 函数定义和调用时， 都不允许有参数的尾逗号。
```javascript
function clownsEverywhere(
param1,
param2
) { /* ... */ }
clownsEverywhere(
'foo',
'bar'
);
```
如果以后要在函数的定义之中添加参数， 就势必还要添加一个逗号。 这对版本管理系统来说， 就会显示， 添加逗号的那一行也发生了变动。 这看上去
有点冗余， 因此新提案允许定义和调用时， 尾部直接有一个逗号。

# 对象的扩展
## 属性的简洁表示法
ES6允许直接写入变量和函数， 作为对象的属性和方法。 这样的书写更加简洁。
```javascript
var foo = 'bar';
var baz = {foo};
baz // {foo: "bar"}
// 等同于
var baz = {foo: foo};
```
上面代码表明， ES6允许在对象之中， 只写属性名， 不写属性值。 这时， 属性值等于属性名所代表的变量。 下面是另一个例子。
```javascript
//除了属性简写， 方法也可以简写。
var o = {
method() {
return "Hello!";
}
};
// 等同于
var o = {
method: function() {
return "Hello!";
}
};
```
CommonJS模块输出变量， 就非常合适使用简洁写法。
```javascript
var ms = {};
function getItem (key) {
return key in ms ? ms[key] : null;
} 
function setItem (key, value) {
ms[key] = value;
} f
unction clear () {
ms = {};
} 
module.exports = { getItem, setItem, clear };
// 等同于
module.exports = {
getItem: getItem,
setItem: setItem,
clear: clear
};
```
属性的赋值器（setter） 和取值器（getter） ， 事实上也是采用这种写法。
```javascript
var cart = {
_wheels: 4,
get wheels () {
return this._wheels;
},
set wheels (value) {
if (value < this._wheels) {
throw new Error('数值太小了！ ');
} 
this._wheels = value;
}
}
```
## 属性名表达式
JavaScript语言定义对象的属性， 有两种方法。
```javascript
// 方法一
obj.foo = true;
// 方法二
obj['a' + 'bc'] = 123;
```
上面代码的方法一是直接用标识符作为属性名， 方法二是用表达式作为属性名， 这时要将表达式放在方括号之内。\
但是， 如果使用字面量方式定义对象（使用大括号） ， 在ES5中只能使用方法一（标识符） 定义属性。\
ES6允许字面量定义对象时， 用方法二（表达式） 作为对象的属性名， 即把表达式放在方括号内。
```javascript
let propKey = 'foo';
let obj = {
[propKey]: true,
['a' + 'bc']: 123
};

var lastWord = 'last word';
var a = {
'first word': 'hello',
[lastWord]: 'world'
};
a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"
```
表达式还可以用于定义方法名。
```javascript
let obj = {
['h'+'ello']() {
return 'hi';
}
};
obj.hello() // hi
```

## 方法的name属性
函数的name属性， 返回函数名。 对象方法也是函数， 因此也有name属性。
```javascript
var person = {
sayName() {
console.log(this.name);
},
get firstName() {
return "Nicholas";
}
};
person.sayName.name // "sayName"
person.firstName.name // "get firstName"
```
上面代码中， 方法的name属性返回函数名（即方法名） 。 如果使用了取值函数， 则会在方法名前加上get。 如果是存值函数， 方法名的前面会加
上set。\
有两种特殊情况： bind方法创造的函数， name属性返回“bound”加上原函数的名字； Function构造函数创造的函数， name属性返回“anonymous”。
```javascript
(new Function()).name // "anonymous"
var doSomething = function() {
// ...
};
doSomething.bind().name // "bound doSomething"
```
如果对象的方法是一个Symbol值， 那么name属性返回的是这个Symbol值的描述。
```javascript
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
[key1]() {},
[key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // ""
```

## Object.is()
ES5比较两个值是否相等， 只有两个运算符： 相等运算符（==） 和严格相等运算符（===） 。 它们都有缺点， 前者会自动转换数据类型， 后者的NaN不
等于自身， 以及+0等于-0。 JavaScript缺乏一种运算， 在所有环境中， 只要两个值是一样的， 它们就应该相等。\
ES6提出“Same-value equality”（同值相等） 算法， 用来解决这个问题。 Object.is就是部署这个算法的新方法。 它用来比较两个值是否严格相等， 与
严格比较运算符（===） 的行为基本一致。
```javascript
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false
```
不同之处只有两个： 一是+0不等于-0， 二是NaN等于自身。
```javascript
+0 === -0 //true
NaN === NaN // falseObject.is(+0, -0) // false
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```
ES5可以通过下面的代码， 部署Object.is。
```javascript
Object.defineProperty(Object, 'is', {
value: function(x, y) {
if (x === y) {
// 针对+0 不等于 -0的情况
return x !== 0 || 1 / x === 1 / y;
} 
// 针对NaN的情况
return x !== x && y !== y;
},
configurable: true,
enumerable: false,
writable: true
});
```

## Object.assign()
### 基本用法
Object.assign方法用于对象的合并， 将源对象（source） 的所有可枚举属性， 复制到目标对象（target） 。
```javascript
var target = { a: 1 };
var source1 = { b: 2 };
var source2 = { c: 3 };
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```
Object.assign方法的第一个参数是目标对象， 后面的参数都是源对象。\
注意， 如果目标对象与源对象有同名属性， 或多个源对象有同名属性， 则后面的属性会覆盖前面的属性。
```javascript

```
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
