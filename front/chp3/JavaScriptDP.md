[TOC]

# JavaScript设计模式与开发实践

## 基础知识
### 面向对象
#### 动态类型语言和鸭子类型

#### 多态

#### 封装

#### 原型模式和基于原型继承的JavaScript对象系统

#### this
JavaScript的this总是指向一个对象，this的指向大致可以分为以下4种：
- 作为对象的方法调用
当函数作为对象的方法被调用时，this指向该对象：
```javascript
var obj = {
  a:1,
  getA: function() {
    alert( this === obj); // 输出：true
    alert( this.a ); // 输出：1
  }
};
obj.getA();
```
- 作为普通函数调用
当函数不作为对象的属性被调用时，也就是普通函数方式，此时的this总是指向全局对象。在浏览器的JavaScript里，这个全局对象是window对象。
```javascript
window.name = 'globalName';
// 方式一
var getName = function() {
  return this.name;
};
console.log( getName() );
// 方式二
var myObject = {
  name: 'sven',
  getName: function() {
      return this.name;
  }
};
var getName2 = myObject.getName;
console.log( getName2() );
```
- 构造器调用
JavaScript中没有类，但是可以从构造器中创建对象，同时也提供了new运算符，使得构造器看起来更像一个类。
除了宿主提供的一些内置函数，大部分JavaScript函数都可以当做构造器使用。构造器的外表跟普通函数一模一样，他们的区别在于被调用的方式。
当用new运算符调用函数时，该函数总会返回一个对象，通常情况下，构造器里的this就指向返回的这个对象。
```javascript
var MyClass = function(){
  this.name = 'sven';
};
var obj = new MyClass();
alert( obj.name );  //输出：sven
```
- Function.prototype.call或Function.prototype.apply调用
跟普通的函数调用相比，用Function.prototype.call或Function.prototype.apply可以动态地改变传入函数的this
```javascript
var obj1 = {
   name: 'sven',
   getName : function() {
       return this.name;
   }
};

var obj2 = {
    name: 'anne'
};
console.log( obj1.getName() );    // 输出：sven
console.log( obj1.getName.call( obj2 ) );  // 输出：anne 
```

#### call和apply
Function.prototype.call或Function.prototype.apply都是非常常用的方法。它们的作用一模一样，区别在于传入参数形式的不同。

apply接受两个参数，第一个参数指定了函数体内this对象的指向，第二个参数与为一个袋下标的集合，这个集合可以为数组，也可以为类数组。

call传入的参数数量不固定，跟apply相同的是，第一个参数也是代表函数体内的this的指向，从第二个参数开始往后，每个参数依次传入函数。

call是包装在apply上面的一颗语法糖。

当使用call或者apply的时候，如果我们传入的第一个参数为null，函数体内的this会指向默认的宿主对象，在浏览器中则是window。
但如果是在严格模式下，函数体内的this还是为null。
```javascript
var func = function(a,b,c) {
  alert( this === window); // 输出true
};
func.apply(null, [1,2,3]);
```

##### 用途
1. 改变this指向
```javascript
var obj1 = {
  name: 'sven'
};
var obj2 = {
  name: 'luna'
};
 window.name = 'window';
 
var getName = function() {
  alert(this.name);
};
 getName();
 getName.call(obj1);
 getName.call(obj2);
```

2. Function.prototype.bind
大部分高级浏览器都实现了内置的Function.prototype.bind，用来指定函数内部的this指向，即使没有原生的Function.prototype.bind实现，我们来模拟一个：
```javascript
Function.prototype.bind = function(context) {
  var self = this;  // 保存原函数
  return function() {  // 返回一个新的函数
    return self.apply(context, arguments); // 执行新的函数的时候，会把之前传入的context当做新函数体内的this
  }
}
```
复杂版：
```javascript
Function.prototype.bind = function() {
  var self = this,  // 保存原函数
      context = [].shift.call(arguments), // 需要绑定的this上下文
      args = [].slice.call(arguments);  //  剩余参数转成数组
  return function() {  // 返回一个新的函数
    return self.apply(context, [].concat.call(args, [].slice.call( arguments)));
    // 执行新的函数的时候，会把之前传入的context当做新函数体内的this并且组合两次分别传入的参数，作为新函数的参数
  }
}
```

3. 借用其他对象的方法
- “借用构造函数”
- 函数参数列表arguments的数组化

#### 闭包
##### 变量的作用域
##### 变量的生存周期
闭包
```javascript
var func = function() {
  var a = 1;
  return function() {
    a++;
    alert(a);
  }
}

var f = func();
f(); // 输出:2
f(); // 输出:3
f(); // 输出:4
f(); // 输出:5
```

##### 闭包的作用
1.封装变量

2.延续局部变量的寿命

##### 闭包和面向对象设计

#### 高阶函数
高阶函数的指至少满足下列条件之一的函数。
- 函数可以作为参数被传递；
- 函数可以作为返回值输出。

##### 函数作为参数传递
1. 回调函数
2. Array.prototype.sort

##### 函数作为返回值输出
1. 判断数据的类型
```javascript
var Type = {};

for (var i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
  (function(type) {
    Type['is' + type ] = function(obj) {
      return Object.prototype.toString.call(obj) === '[Object ' + type + ']';
    }
  })(type)
};
Type.isArray([]); // 输出：true
```

2. getSingle
单例模式
```javascript
var getSingle = function(fn) {
  var ret;
  return function() {
    return ret || (ret = fn.apply(this, arguments));
  };
};
```
##### 高阶函数实现AOP
AOP（面向切面编程）的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关功能通畅包括日志统计、安全控制、异常处理等。
```javascript
Function.prototype.before = function(beforeFn) {
  var _self = this;
  return function() {
    beforeFn.apply(this,  arguments);
    return _self.apply(this,  arguments);
  }
};

Function.prototype.after = function(afterFn) {
  var _self = this;
  return function() {
    var ret = _self.apply(this,  arguments);
    afterFn.apply(this,  arguments);
    return ret;
  }
};

var func = function() {
  console.log(2);
};

func = func.before(function() {
  console.log(1);
}).after(function() {
  console.log(3);
});

func();
```

##### 高阶函数的其他应用
1. currying
函数柯里化，部分求值

2. uncurrying
```javascript
Function.prototype.uncurring = function() {
  var self = this;
  return function() {
    var obj = Array.prototype.shift.call(arguments);
    return self.apply(obj, arguments);
  };
};
```
3. 函数节流

4. 分时函数

5. 惰性加载函数


## 设计模式

### 单例模式
单例模式的定义是：保证一个类仅有一个实例，并提供一个访问它的全局访问点。

#### 实现单例模式
```javascript
var Singleton = function(name) {
  this.name = name;
  this.instance = null; 
};

Singleton.prototype.getName = function() {
  alert(this.name);
};

Singleton.getInstance = function(name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
} 
```
#### 透明的单例模式
```javascript
var CreateDiv = (function() {
  var instance;
  
  var CreateDiv = function(html) {
    if (instance) {
      return instance;
    }
    this.html = html;
    this.init();
    return instance = this;
  };
  
  CreateDiv.prototype.init = function() {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };
  
  return CreateDiv;
})();
```
#### 用代理实现单例模式
```javascript
var CreateDiv = function(html) {
  this.html = html;
  this.init();
};

CreateDiv.prototype.init = function() {
  var div = document.createElement('div');
      div.innerHTML = this.html;
      document.body.appendChild(div);
};

var ProxySingletonCreateDiv = (function() {
  var instance;
  return function(html) {
    if (!instance) {
      instance = new CreateDiv(html);
    }
    return instance;
  }
})();
```

#### JavaScript中的单例模式
1. 使用命名空间

2. 使用闭包封装私有变量

#### 惰性单例

### 策略模式
### 代理模式
### 迭代器模式
### 发布-订阅模式
### 命令模式
### 组合模式
### 模板方法模式
### 享元模式
### 职责链模式
### 中介者模式
### 装饰者模式
### 状态模式
### 适配器模式

## 设计原则和编程技巧

### 单一职责原则
### 最少知识原则
### 开放-封闭原则
### 接口和面向接口编程
### 代码重构