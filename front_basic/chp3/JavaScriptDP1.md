[TOC]

# JavaScript设计模式

## 基础知识

### 数据类型
#### 基本数据类型
- Number

- String
- Boolean

#### 复合类型
- Array
- Function

#### 特殊值
- null
- undefined

#### 内置特殊对象
- Date对象
- Error对象
- ReExp对象

## 高级
### 类
```javascript
function Shape(){
  this.x = 1 ; // 公有变量
  var y = 2; //私有变量，也可以用var定义私有函数
}

// 用JavaScript模仿OOP编程
function Shape2(x, y){
  var ax = 0;
  var ay = 0;
  var init = function(x, y) {
    ax = x;
    ay = y;
  }
  init();
  this.getX = function() {
    return ax;
  }
}

// 模仿MAP
function jMap() {
  // 私有变量
  var arr = { };
  // 增加
  this.put = function(key, value) {
    arr[key] = value;
  }
  // 查询
  this.get = function(key) {
    if(arr[key]) {
      return arr[key];
    } else {
      return null;
    }
  }
  // 删除
  this.remove = function(key) {
    delete arr[key];
  }
  // 遍历
  this.eachMap = function(fn) {
    for(var key in arr) {
      fn(key, arr[key]);
    }
  }
}
```

### 原型模式(prototype)

#### 继承
```javascript
/**
* 创建Extend函数为了程序中所有的继承操作
*/
function extend(subClass, superClass){
  // 1.叫子类原型类属性等于父类的原型属性
  // 初始化一个中间空对象，为了转换主父类关系
  var F = function() {};
  F.prototype = superClass.prototype;
  // 2.让子类继承F
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;
  // 3.为子类增加属性superClass
  subClass.superClass = superClass.prototype;
  // 4.增加一个保险，就算原型类是超类{Object}，那么也要把构造函数级别降下来
  if(superClass.prototype.constructor == Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}
```

#### 用掺元类完成聚合
```javascript
/**
* 掺元类
* 有些时候不需要严格的继承，需要是的一个（几个）类中的某些函数
*/
(function() {
  // 将要聚合的函数
  var JSON = {};
  JSON.prototype = {
    toJSONString: function() {
      var outPut = [];
      for (key in this) {
        outPut.push(key + "--->" + this[key])
      }
    }
  }
  // 制作聚合函数
  function mixin(receivingClass, givingClass){
    for (methodName in givingClass.prototype) {
      //本类中没有这个函数的情况下聚合，否则跳过
      if(!receivingClass.prototype[methodName]) {
        receivingClass.prototype[methodName] = givingClass.prototype[methodName]
      }
    }
  }
  var o = function() {
    this.name = "TEST";
    this.age = 1;
    
    mixin(o, JSON);
    var a = new o();
  }
})();
```

### 接口
1. 注解的方法
2. 属性检验法
3. 鸭式变形法
```javascript
/**
* 1.注释方法，最简单，功能最弱,利用interface和implement“文字”以注释的方式表现出来
*/
(function() {
  /**
  * 定义一个接口
  * interface ObjectDao(){
  *   function add(obj);
  *   function remove(obj);
  *   function find(id);
  */
  
  /**
  *  PersonDaoImpl implment interface
  *  意义：大型项目靠的是规范和标准，这样写会有充分的时间对代码进行设计和架构
  */
  var PersonDaoImpl = function() {
    // ..
  }
  PersonDaoImpl.prototype.add = function(obj) {
    // ..
  }
  PersonDaoImpl.prototype.remove = function(obj) {
    // ..
  }
  PersonDaoImpl.prototype.find = function(id) {
    // ..
  }
})()
```
- 属性检验法
```javascript
/**
* 2.属性检验法
*/
(function() {
  /**
  * 定义一个接口
  * interface ObjectDao(){
  *   function add(obj);
  *   function remove(obj);
  *   function find(id);
  */
  
  /**
  *  PersonDaoImpl implment interface
  */
  var PersonDaoImpl = function() {
    this.implementInterface = ["PersonDao"];
    // ..
  }
  PersonDaoImpl.prototype.add = function(obj) {
    // ..
  }
  PersonDaoImpl.prototype.remove = function(obj) {
    // ..
  }
  PersonDaoImpl.prototype.find = function(id) {
    // ..
  }
  // 实例化
  function addObj(obj) {
    var PersonDao = new PersonDaoImpl();
    // 方法检查
    if(!impl(PersonDao, "PersonDao")){
      throw new Error("类PersonDaoImpl没有实现接口PersonDao");
    } else {
      PersonDao.add(obj);
    }
  }
  // 调用
  addObj("LJ");
  /**
  *
  */
  function impl(Ob) {
    // 遍历出入对象的属性
    for (var i = 1; i < arguments.length; i++){
      var interfaceName = arguments[i];
      var interfaceFound = false;
      for (var j = 0; j < Ob.implementInterface.length; j++) {
        if(Ob.implementInterface[j] === interfaceName) {
          interfaceFound = true;
          break;
        }
      }
      if(!interfaceFound) {
        return false;
      }
    }
    return true;
  }
})()
```
- 鸭式变形法
```javascript
/**
* 3.注释方法，最简单，功能最弱,利用interface和implement“文字”以注释的方式表现出来
*/
(function() {
  /**
  * 定义一个接口类
  * interface ObjectDao(){
  *   function add(obj);
  *   function remove(obj);
  *   function find(id);
  */
  var Interface = function(name, methods) {
    if(arguments.length != 2) {
      alert("Interface must have two parameters...");
    }
    this.name = name; 
    this.methods = [];
    for (var i = 0; i < methods.length; i++) {
      if(typeof methods[i] != "string") {
        alert("methos name must be string...");
      } else {
        this.methods.push(methods[i]);
      }
    }
  }
  // 定义接口的一个静态方法来实现接口与实现类的直接检测，静态方法直接写在类层次上
  Interface.ensureImplements = function(object) {
    if(arguments.length < 2) {
      alert("必须最少是2个参数");
      return false;
    }
    // 遍历
    for (var i = 1; i < arguments.length; i++) {
      var inter = arguments[i];
      // 如果是接口就必须是Interface类型的
      if(inter.constructor != Interface) {
        throw new Error("if is interface class must is interface type");
      }
      // 遍历函数集合并分析
      for(var j = 1; j < inter.methods.length; j++) {
        var method = inter.methods[j]; 
        if(!object[method] || typeof object[method] != "function") {
           throw new Error(("实现类并没有完全实现接口中的所有方法...");
        }
      }
    }
  }
  
  // 应用
  var GridManager = new Interface("GridManager", ["add", "remove", "list"]);
  var FormManager = new Interface("FormManager", ["save"]);
  
  function commManager(){
    this.add = function() { }
    this.remove = function() { }
    this.list = function() { }
    this.save = function() { }
    Interface.ensureImplements(this, GridManager, FormManager)
  }
  
})()
```

### 封装和闭包

