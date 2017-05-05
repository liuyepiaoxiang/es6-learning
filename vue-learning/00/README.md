[TOC]

# 介绍
## 起步
[在线文档](https://cn.vuejs.org/v2/guide/)
```
<script src="https://unpkg.com/vue/dist/vue.js"></script>
```
## 声明式渲染

## 条件与循环
```
v-if
v-for
```
## 处理用户输入
```
v-on:click
v-model
```
## 组件化应用构建
在Vue中，一个组件本质上是一个拥有预定义选项的一个Vue实例，在Vue中注册组件很简单：
```
// 定义名为 todo-item 的新组件
Vue.component('todo-item', {
  template: '<li>这是个待办项</li>'
})
```
现在你可以用它来构建另一个组件模板：
```
<ol>
  <!-- 创建一个 todo-item 组件的实例 -->
  <todo-item></todo-item>
</ol>
```
但是这样会为每个待办项渲染同样的文本，这看起来并不炫酷，应该能将数据从父作用域传到子组件。
```
Vue.component('todo-item', {
  // todo-item 组件现在接受一个
  // "prop"，类似于一个自定义属性
  // 这个属性名为 todo。
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
```
然后可以使用v-bind指令将待办项传到每一个重复的组件中:
```
<div id="app-7">
  <ol>
    <!-- 现在我们为每个todo-item提供待办项对象    -->
    <!-- 待办项对象是变量，即其内容可以是动态的 -->
    <todo-item v-for="item in groceryList" v-bind:todo="item"></todo-item>
  </ol>
</div>

```
## 与自定义元素的关系
你可能已经注意到 Vue 组件非常类似于自定义元素——它是 Web 组件规范的一部分，这是因为 Vue 的组件语法部分参考了该规范。例如 Vue 组件实现了 Slot API 与 is 特性。但是，还是有几个关键差别：
Web 组件规范仍然处于草案阶段，并且尚无浏览器原生实现。相比之下，Vue 组件不需要任何补丁，并且在所有支持的浏览器（IE9 及更高版本）之下表现一致。必要时，Vue 组件也可以包装于原生自定义元素之内。
Vue 组件提供了纯自定义元素所不具备的一些重要功能，最突出的是跨组件数据流，自定义事件通信以及构建工具集成。

# 构造器
虽然没有完全遵循 MVVM 模式， Vue 的设计无疑受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的简称) 这个变量名表示 Vue 实例。

在实例化 Vue 时，需要传入一个选项对象，它可以包含数据、模板、挂载元素、方法、生命周期钩子等选项。全部的选项可以在 API 文档中查看。

可以扩展 Vue 构造器，从而用预定义选项创建可复用的组件构造器：
```
var MyComponent = Vue.extend({
  // 扩展选项
})
// 所有的 `MyComponent` 实例都将以预定义的扩展选项被创建
var myComponentInstance = new MyComponent()
```
## 属性与方法
每个Vue实例都会代理其data对象里所有的属性：
```
var data = { a: 1 }
var vm = new Vue({
  data: data
})
vm.a === data.a // -> true
// 设置属性也会影响到原始数据
vm.a = 2
data.a // -> 2
// ... 反之亦然
data.a = 3
vm.a // -> 3
```
除了 data 属性， Vue 实例暴露了一些有用的实例属性与方法。这些属性与方法都有前缀 $，以便与代理的 data 属性区分。
```javascript
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})
vm.$data === data // -> true
vm.$el === document.getElementById('example') // -> true
// $watch 是一个实例方法
vm.$watch('a', function (newVal, oldVal) {
  // 这个回调将在 `vm.a`  改变后调用
})

```
>> 注意，不要在实例属性或者回调函数中（如 vm.$watch('a', newVal => this.myMethod())）使用箭头函数。因为箭头函数绑定父上下文，所以 this 不会像预想的一样是 Vue 实例，而是 this.myMethod 未被定义。

## 实例生命周期
每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如，实例需要配置数据观测(data observer)、编译模版、挂载实例到 DOM ，然后在数据变化时更新 DOM 。在这个过程中，实例也会调用一些 生命周期钩子 ，这就给我们提供了执行自定义逻辑的机会。例如，created 这个钩子在实例被创建之后被调用：
```javascript
var vm = new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
// -> "a is: 1"
```
## 生命周期图示
![img](https://cn.vuejs.org/images/lifecycle.png)

# 模板语法
Vue.js 使用了基于 HTML 的模版语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML ，所以能被遵循规范的浏览器和 HTML 解析器解析。
在底层的实现上， Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，在应用状态改变时， Vue 能够智能地计算出重新渲染组件的最小代价并应用到 DOM 操作上。
如果你熟悉虚拟 DOM 并且偏爱 JavaScript 的原始力量，你也可以不用模板，直接写渲染（render）函数，使用可选的 JSX 语法。

## 插值
### 文本
数据绑定最常见的形式就是使用 “Mustache” 语法（双大括号）的文本插值：
```html
<span>Message: {{ msg }}</span>
```
Mustache 标签将会被替代为对应数据对象上 msg 属性的值。无论何时，绑定的数据对象上 msg 属性发生了改变，插值处的内容都会更新。
通过使用 v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上所有的数据绑定：
```html
<span v-once>This will never change: {{ msg }}</span>
```
### 纯HTML
双大括号会将数据解释为纯文本，而非 HTML 。为了输出真正的 HTML ，你需要使用 v-html 指令：
```html
<div v-html="rawHtml"></div>
```
被插入的内容都会被当做 HTML —— 数据绑定会被忽略。注意，你不能使用 v-html 来复合局部模板，因为 Vue 不是基于字符串的模板引擎。组件更适合担任 UI 重用与复合的基本单元。
>> 你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容插值。

### 属性
Mustache 不能在 HTML 属性中使用，应使用 v-bind 指令：
```html
<div v-bind:id="dynamicId"></div>
```
这对布尔值的属性也有效 —— 如果条件被求值为 false 的话该属性会被移除：
```html
<button v-bind:disabled="someDynamicCondition">Button</button>
```
### 使用javascript表达式
迄今为止，在我们的模板中，我们一直都只绑定简单的属性键值。但实际上，对于所有的数据绑定， Vue.js 都提供了完全的 JavaScript 表达式支持。
```html
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div v-bind:id="'list-' + id"></div>
```
这些表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。有个限制就是，每个绑定都只能包含单个表达式，所以下面的例子都不会生效。
```html
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}
<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```
>> 模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 Math 和 Date 。你不应该在模板表达式中试图访问用户定义的全局变量。

## 指令
指令（Directives）是带有 v- 前缀的特殊属性。指令属性的值预期是单一 JavaScript 表达式（除了 v-for，之后再讨论）。指令的职责就是当其表达式的值改变时相应地将某些行为应用到 DOM 上。

### 参数
一些指令能接受一个“参数”，在指令后以冒号指明。例如， v-bind 指令被用来响应地更新 HTML 属性：
```html
<a v-bind:href="url"></a>
```
在这里 href 是参数，告知 v-bind 指令将该元素的 href 属性与表达式 url 的值绑定。
另一个例子是 v-on 指令，它用于监听 DOM 事件：
```html
<a v-on:click="doSomething">
```

### 修饰符
修饰符（Modifiers）是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：
```html
<form v-on:submit.prevent="onSubmit"></form>
```

## 过滤器
Vue.js 允许你自定义过滤器，可被用作一些常见的文本格式化。过滤器可以用在两个地方：mustache 插值和 v-bind 表达式。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符指示：
```html
<!-- in mustaches -->
{{ message | capitalize }}
<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>
```
>>　Vue 2.x 中，过滤器只能在 mustache 绑定和 v-bind 表达式（从 2.1.0 开始支持）中使用，因为过滤器设计目的就是用于文本转换。为了在其他指令中实现更复杂的数据变换，你应该使用计算属性。

过滤器函数总接受表达式的值作为第一个参数。

```javascript
new Vue({
  // ...
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
```
过滤器可以串联：
```html
{{ message | filterA | filterB }}
```
过滤器是 JavaScript 函数，因此可以接受参数：
```html
{{ message | filterA('arg1', arg2) }}
```

## 缩写
v- 前缀在模板中是作为一个标示 Vue 特殊属性的明显标识。当你使用 Vue.js 为现有的标记添加动态行为时，它会很有用，但对于一些经常使用的指令来说有点繁琐。同时，当搭建 Vue.js 管理所有模板的 SPA 时，v- 前缀也变得没那么重要了。因此，Vue.js 为两个最为常用的指令提供了特别的缩写：

### v-bind缩写
```html
<!-- 完整语法 -->
<a v-bind:href="url"></a>
<!-- 缩写 -->
<a :href="url"></a>
```

### v-on缩写
```html
<!-- 完整语法 -->
<a v-on:click="doSomething"></a>
<!-- 缩写 -->
<a @click="doSomething"></a>
```

# 计算属性
## 计算属性
模板内的表达式是非常便利的，但是它们实际上只用于简单的运算。在模板中放入太多的逻辑会让模板过重且难以维护。

### 基础例子
```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```
```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
})
```
### 计算缓存 vs Methods
你可能已经注意到我们可以通过调用表达式中的 method 来达到同样的效果。
```html
<p>Reversed message: "{{ reversedMessage() }}"</p>
```
```javascript
// in component
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```
我们可以将同一函数定义为一个 method 而不是一个计算属性。对于最终的结果，两种方式确实是相同的。然而，不同的是计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
这也同样意味着下面的计算属性将不再更新，因为 Date.now() 不是响应式依赖:
```javascript
computed: {
  now: function () {
    return Date.now()
  }
}
```
相比而言，只要发生重新渲染，method 调用总会执行该函数。
我们为什么需要缓存？假设我们有一个性能开销比较大的的计算属性 A ，它需要遍历一个极大的数组和做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用 method 替代。

### Computed属性 vs Watched属性
Vue 确实提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：watch 属性。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 watch——特别是如果你之前使用过 AngularJS。然而，通常更好的想法是使用 computed 属性而不是命令式的 watch 回调。细想一下这个例子：
```html
<div id="demo">{{ fullName }}</div>
```
```javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```
上面代码是命令式的和重复的。将它与 computed 属性的版本进行比较：
```javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```
### 计算setter
计算属性默认只有getter，不过在需要时你也可以提供一个setter
```javascript
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```
现在在运行 vm.fullName = 'John Doe' 时， setter 会被调用， vm.firstName 和 vm.lastName 也相应地会被更新。

### 观察Watchers
虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的 watcher 。这是为什么 Vue 提供一个更通用的方法通过 watch 选项，来响应数据的变化。当你想要在数据变化响应时，执行异步操作或开销较大的操作，这是很有用的。
```html
<div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>
```
```javascript
<!-- Since there is already a rich ecosystem of ajax libraries    -->
<!-- and collections of general-purpose utility methods, Vue core -->
<!-- is able to remain small by not reinventing them. This also   -->
<!-- gives you the freedom to just use what you're familiar with. -->
<script src="https://unpkg.com/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://unpkg.com/lodash@4.13.1/lodash.min.js"></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 question 发生改变，这个函数就会运行
    question: function (newQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.getAnswer()
    }
  },
  methods: {
    // _.debounce 是一个通过 lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问yesno.wtf/api的频率
    // ajax请求直到用户输入完毕才会发出
    // 学习更多关于 _.debounce function (and its cousin
    // _.throttle), 参考: https://lodash.com/docs#debounce
    getAnswer: _.debounce(
      function () {
        var vm = this
        if (this.question.indexOf('?') === -1) {
          vm.answer = 'Questions usually contain a question mark. ;-)'
          return
        }
        vm.answer = 'Thinking...'
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer)
          })
          .catch(function (error) {
            vm.answer = 'Error! Could not reach the API. ' + error
          })
      },
      // 这是我们为用户停止输入等待的毫秒数
      500
    )
  }
})
</script>
```
除了 watch 选项之外，您还可以使用 vm.$watch API 命令。

# Class与Style绑定
数据绑定一个常见需求是操作元素的 class 列表和它的内联样式。因为它们都是属性 ，我们可以用v-bind 处理它们：只需要计算出表达式最终的字符串。不过，字符串拼接麻烦又易错。因此，在 v-bind 用于 class 和 style 时， Vue.js 专门增强了它。表达式的结果类型除了字符串之外，还可以是对象或数组。

## 绑定HTML Class

### 对象语法
我们可以传给 v-bind:class 一个对象，以动态地切换 class 。
```html
<div v-bind:class="{ active: isActive }"></div>
```
上面的语法表示 classactive 的更新将取决于数据属性 isActive 是否为真值 。
我们也可以在对象中传入更多属性用来动态切换多个 class 。此外， v-bind:class 指令可以与普通的 class 属性共存。如下模板:
```html
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>
```
如下 data:
```javascript
data: {
  isActive: true,
  hasError: false
}
```
渲染为:
```html
<div class="static active"></div>
```
你也可以直接绑定数据里的一个对象：
```html
<div v-bind:class="classObject"></div>
```
```javascript
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```
渲染的结果和上面一样。我们也可以在这里绑定返回对象的计算属性。这是一个常用且强大的模式：
```html
<div v-bind:class="classObject"></div>
```
```javascript
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal',
    }
  }
}
```
### 数组语法
我们可以把一个数组传给 v-bind:class ，以应用一个 class 列表：
```html
<div v-bind:class="[activeClass, errorClass]">
```
```javascript
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```
渲染为:
```html
<div class="active text-danger"></div>
```
如果你也想根据条件切换列表中的 class ，可以用三元表达式：
```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]">
```
此例始终添加 errorClass ，但是只有在 isActive 是 true 时添加 activeClass 。
不过，当有多个条件 class 时这样写有些繁琐。可以在数组语法中使用对象语法：
```html
<div v-bind:class="[{ active: isActive }, errorClass]">
```

### 用在组件上
当你在一个定制的组件上用到 class 属性的时候，这些类将被添加到根元素上面，这个元素上已经存在的类不会被覆盖。
```javascript
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```
然后在使用它的时候添加一些 class：
```html
<my-component class="baz boo"></my-component>
```
HTML 最终将被渲染成为:
```html
<p class="foo bar baz boo">Hi</p>
```
同样的适用于绑定 HTML class :
```html
<my-component v-bind:class="{ active: isActive }"></my-component>
```
当 isActive 为 true 的时候，HTML 将被渲染成为:
```html
<p class="foo bar active">Hi</p>
```

## 绑定内联样式
### 对象语法
v-bind:style 的对象语法十分直观——看着非常像 CSS ，其实它是一个 JavaScript 对象。 CSS 属性名可以用驼峰式（camelCase）或短横分隔命名（kebab-case）：
```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```
```javascript
data: {
  activeColor: 'red',
  fontSize: 30
}
```
直接绑定到一个样式对象通常更好，让模板更清晰：
```html
<div v-bind:style="styleObject"></div>
```
```javascript
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

### 数组语法
v-bind:style 的数组语法可以将多个样式对象应用到一个元素上：
```html
<div v-bind:style="[baseStyles, overridingStyles]">
```

### 自动添加前缀
当 v-bind:style 使用需要特定前缀的 CSS 属性时，如 transform ，Vue.js 会自动侦测并添加相应的前缀。

## 条件渲染
