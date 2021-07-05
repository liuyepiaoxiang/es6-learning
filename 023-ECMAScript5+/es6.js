/**
 *@filename:es6.js
 *@abstract:to do this
 *@author:liujia
 *@time:2017/5/3 0003
 *@version 0.0.1
 */
var a = [];
for(let i = 0; i < 10; i++){
    a[i] = function(){
        "use strict";
        console.log(i);
    }
}

const PI = 3.14;

console.log(PI);

// 字符串扩展
var a = "\u{20BB7}";
console.log(a);

var s ="𠮷";
console.log(s.length)
console.log(s.charAt(0))
console.log(s.charAt(1))
console.log(s.charCodeAt(0))
console.log(s.charCodeAt(1))

var s = 'Hello world!';
s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

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
console.log(arr1)
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
console.log(arr2);

//数组的空位
console.log(0 in [undefined, undefined, undefined]) // true
console.log(0 in [, , ,]) // false

console.log([...['a','b']])

var go = function*(){
    yield 1;
    yield 2;
    yield 3;
};
console.log([...go()]) // [1, 2, 3]
//箭头函数
const numbers = (...nums) => console.log(this);

numbers(1,2,3,4,5);

let insert = (value) => ({into: (array) => ({after: (afterValue) => {
    array.splice(array.indexOf(afterValue) + 1, 0, value);
    return array;
}})});
insert(2).into([1, 3]).after(1); //[1, 2, 3]

var fix = f => (x => f(v => x(x)(v)))
(x => f(v => x(x)(v)));

var fix2 =function(f){
    "use strict";
    return function(x){
            return f(
                function(v){
                    return x(x)(v)
                }
            )
        }
}

//属性名表达式
var lastWord = 'last word';
var a = {
    'first word': 'hello',
    [lastWord]: 'world'
};
console.log(a['first word']) // "hello"
console.log(a[lastWord]) // "world"
console.log(a['last word']) // "world