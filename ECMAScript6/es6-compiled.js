/**
 *@filename:es6.js
 *@abstract:to do this
 *@author:liujia
 *@time:2017/5/3 0003
 *@version 0.0.1
 */
var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        "use strict";

        console.log(i);
    };
}

const PI = 3.14;

console.log(PI);

// 字符串扩展
var a = "\u{20BB7}";
console.log(a);

var s = "𠮷";
console.log(s.length);
console.log(s.charAt(0));
console.log(s.charAt(1));
console.log(s.charCodeAt(0));
console.log(s.charCodeAt(1));

var s = 'Hello world!';
s.startsWith('Hello'); // true
s.endsWith('!'); // true
s.includes('o'); // true

//运算符
//let b = 2 ** 3;

let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
console.log(arr1);
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
console.log(arr2);

//数组的空位
console.log(0 in [undefined, undefined, undefined]); // true
console.log(0 in [,,,]); // false

console.log([...['a', 'b']]);

//# sourceMappingURL=es6-compiled.js.map