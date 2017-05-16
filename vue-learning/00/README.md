[TOC]

# 基础
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
### v-if
在字符模板中，如Handlebars，我们得像这样写一个条件块：
```html
<!-- Handlebars 模板 -->
{{#if ok}}
  <h1>Yes</h1>
{{/if}}
```
在Vue.js，我们使用v-if指令实现同样的功能：
```html
<h1 v-if="ok">Yes</h1>
```
也可以用v-else添加一个"else"块：
```html
<h1 v-if="ok">Yes</h1>
<h1 v-else>No</h1>
```
### <template>中v-if条件组
因为 v-if 是一个指令，需要将它添加到一个元素上。但是如果我们想切换多个元素呢？此时我们可以把一个 <template> 元素当做包装元素，并在上面使用 v-if。最终的渲染结果不会包含 <template> 元素。
```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### v-else
你可以使用v-else指令来表示v-if的“else”块：
```html
<div v-if="Math.random() > 0.5">
  Now you see me
</div>
<div v-else>
  Now you don't
</div>
```
v-else 元素必须紧跟在 v-if 或者 v-else-if 元素的后面——否则它将不会被识别。

### v-else-if
v-else-if，顾名思义，充当 v-if 的“else-if 块”。可以链式地使用多次：
```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```
类似于v-else，v-else-if必须紧跟在v-if或者v-else-if元素之后。

### 用key管理可复用的元素
Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做，除了使 Vue 变得非常快之外，还有一些有用的好处。例如，如果你允许用户在不同的登录方式之间切换:
```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```
那么在上面的代码中切换 loginType 将不会清除用户已经输入的内容。因为两个模版使用了相同的元素，<input> 不会被替换掉——仅仅是替换了它的的 placeholder。

这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来声明“这两个元素是完全独立的——不要复用它们”。只需添加一个具有唯一值的 key 属性即可：
```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```
### v-show
另一个用于根据条件展示元素的选项是 v-show 指令。用法大致一样：
```html
<h1 v-show="ok">Hello!</h1>
```
不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 是简单地切换元素的 CSS 属性 display 。
> 注意， v-show 不支持 <template> 语法，也不支持 v-else。

### v-if vs v-show
v-if 是“真正的”条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
相比之下， v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
一般来说， v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件不太可能改变，则使用 v-if 较好。

### v-if与v-for一起使用
当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。

## 列表渲染
### v-for
我们用 v-for 指令根据一组数组的选项列表进行渲染。 v-for 指令需要以 item in items 形式的特殊语法， items 是源数据数组并且 item 是数组元素迭代的别名。

#### 基本用法
```html
<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
```
```javascript
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      {message: 'Foo' },
      {message: 'Bar' }
    ]
  }
})
```
在 v-for 块中，我们拥有对父作用域属性的完全访问权限。 v-for 还支持一个可选的第二个参数为当前项的索引。
```html
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```
```javascript
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```
#### Template v-for
如同v-if模板，你也可以用带有v-for的<template>标签来渲染多个元素块。
```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider"></li>
  </template>
</ul>
```
#### 对象迭代v-for
你也可以用 v-for 通过一个对象的属性来迭代。
```html
<ul id="repeat-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
```
```javascript
new Vue({
  el: '#repeat-object',
  data: {
    object: {
      FirstName: 'John',
      LastName: 'Doe',
      Age: 30
    }
  }
})
```
你也可以提供第二个的参数为键名：
```vue
<div v-for="(value, key) in object">
  {{ key }} : {{ value }}
</div>
```
第三个参数为索引：
```vue
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }} : {{ value }}
</div>
```
> 在遍历对象时，是按 Object.keys() 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下是一致的。
#### 整数迭代v-for
v-for 也可以取整数。在这种情况下，它将重复多次模板。
```vue
<div>
  <span v-for="n in 10">{{ n }}</span>
</div>
```
#### 组件和v-for
在自定义组件里，你可以像任何普通元素一样用 v-for 。
```vue
<my-component v-for="item in items"></my-component>
```
然而他不能自动传递数据到组件里，因为组件有自己独立的作用域。为了传递迭代数据到组件里，我们要用 props ：
```vue
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index">
</my-component>
```
不自动注入 item 到组件里的原因是，因为这使得组件会紧密耦合到 v-for 如何运作。在一些情况下，明确数据的来源可以使组件可重用。
```vue
<div id="todo-list-example">
  <input
    v-model="newTodoText"
    v-on:keyup.enter="addNewTodo"
    placeholder="Add a todo"
  >
  <ul>
    <li
      is="todo-item"
      v-for="(todo, index) in todos"
      v-bind:title="todo"
      v-on:remove="todos.splice(index, 1)"
    ></li>
  </ul>
</div>
```
```javascript
Vue.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">X</button>\
    </li>\
  ',
  props: ['title']
})
new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    todos: [
      'Do the dishes',
      'Take out the trash',
      'Mow the lawn'
    ]
  },
  methods: {
    addNewTodo: function () {
      this.todos.push(this.newTodoText)
      this.newTodoText = ''
    }
  }
})
```
#### `v-for` with `v-if`
当它们处于同一节点， v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-if 循环中。当你想为仅有的 一些 项渲染节点时，这种优先级的机制会十分有用，如下：
```vue
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```
上面的代码只传递了未complete的todos。
而如果你的目的是有条件地跳过循环的执行，那么将 v-if 置于包装元素 (或 <template>)上。如:
```vue
<ul v-if="shouldRenderTodos">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
```
### key
当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用 “就地复用” 策略。如果数据项的顺序被改变，Vue将不是移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。这个类似 Vue 1.x 的 track-by="$index" 。

这个默认的模式是有效的，但是只适用于不依赖子组件状态或临时 DOM 状态（例如：表单输入值）的列表渲染输出。

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。理想的 key 值是每项都有唯一 id。这个特殊的属性相当于 Vue 1.x 的 track-by ，但它的工作方式类似于一个属性，所以你需要用 v-bind 来绑定动态值（在这里使用简写）：

```vue
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```
建议尽可能使用 v-for 来提供 key ，除非迭代 DOM 内容足够简单，或者你是故意要依赖于默认行为来获得性能提升。

因为它是 Vue 识别节点的一个通用机制， key 并不特别与 v-for 关联，key 还具有其他用途，我们将在后面的指南中看到其他用途。

### 数组更新检测
#### 变异方法
Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：
- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

#### 重塑数组
变异方法(mutation method)，顾名思义，会改变被这些方法调用的原始数组。相比之下，也有非变异(non-mutating method)方法，例如： filter(), concat(), slice() 。这些不会改变原始数组，但总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组：

```javascript
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```
你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。 Vue 实现了一些智能启发式方法来最大化 DOM 元素重用，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

#### 注意事项
由于 JavaScript 的限制， Vue 不能检测以下变动的数组：
1. 当你利用索引直接设置一个项时，例如： 
```
vm.items[indexOfItem] = newValue
```
2. 当你修改数组的长度时，例如： 
```
vm.items.length = newLength
```
为了解决第一类问题，以下两种方式都可以实现和 vm.items[indexOfItem] = newValue 相同的效果， 同时也将触发状态更新：
```javascript
// Vue.set
Vue.set(example1.items, indexOfItem, newValue)
```
```javascript
// Array.prototype.splice`
example1.items.splice(indexOfItem, 1, newValue)
```
为了解决第二类问题，你也同样可以使用 splice：
```javascript
example1.items.splice(newLength)
```

### 显示过滤/排序结果
有时，我们想要显示一个数组的过滤或排序副本，而不实际改变或重置原始数据。在这种情况下，可以创建返回过滤或排序数组的计算属性。
```vue
<li v-for="n in evenNumbers">{{ n }}</li>
```
```javascript
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```
或者，你也可以在计算属性不适用的情况下 (例如，在嵌套 v-for 循环中) 使用 method 方法：
```vue
<li v-for="n in even(numbers)">{{ n }}</li>
```
```javascript
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

## 事件处理器

### 监听事件
可以用 v-on 指令监听 DOM 事件来触发一些 JavaScript 代码。
```vue
<div id="example-1">
  <button v-on:click="counter += 1">增加 1</button>
  <p>这个按钮被点击了 {{ counter }} 次。</p>
</div>
```
```javascript
var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})
```
### 方法事件处理器
许多事件处理的逻辑都很复杂，所以直接把 JavaScript 代码写在 v-on 指令中是不可行的。因此 v-on 可以接收一个定义的方法来调用。
```vue
<div id="example-2">
  <!-- `greet` 是在下面定义的方法名 -->
  <button v-on:click="greet">Greet</button>
</div>
```
```javascript
var example2 = new Vue({
  el: '#example-2',
  data: {
    name: 'Vue.js'
  },
  // 在 `methods` 对象中定义方法
  methods: {
    greet: function (event) {
      // `this` 在方法里指当前 Vue 实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      alert(event.target.tagName)
    }
  }
})
// 也可以用 JavaScript 直接调用方法
example2.greet() // -> 'Hello Vue.js!'
```

### 内联处理器方法
除了直接绑定到一个方法，也可以用内联 JavaScript 语句：
```vue
<div id="example-3">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>
```
```javascript
new Vue({
  el: '#example-3',
  methods: {
    say: function (message) {
      alert(message)
    }
  }
})
```

有时也需要在内联语句处理器中访问原生 DOM 事件。可以用特殊变量 $event 把它传入方法：
```vue
<button v-on:click="warn('Form cannot be submitted yet.', $event)">Submit</button>
```
```javascript
// ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) event.preventDefault()
    alert(message)
  }
}
```

### 事件修饰符
在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在 methods 中轻松实现这点，但更好的方式是：methods 只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题， Vue.js 为 v-on 提供了 事件修饰符。通过由点(.)表示的指令后缀来调用修饰符。

- .stop
- .prevent
- .capture
- .self
- .once
```vue
<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- 修饰符可以串联  -->
<a v-on:click.stop.prevent="doThat"></a>
<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
<!-- 添加事件侦听器时使用事件捕获模式 -->
<div v-on:click.capture="doThis">...</div>
<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>
```
```vue
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```
不像其它只能对原生的 DOM 事件起作用的修饰符，.once 修饰符还能被用到自定义的组件事件上. 如果你还没有阅读关于组件的文档，现在大可不必担心。

### 按键修饰符
在监听键盘事件时，我们经常需要监测常见的键值。 Vue 允许为 v-on 在监听键盘事件时添加按键修饰符：
```vue
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">
```
记住所有的 keyCode 比较困难，所以 Vue 为最常用的按键提供了别名：
```vue
<!-- 同上 -->
<input v-on:keyup.enter="submit">
<!-- 缩写语法 -->
<input @keyup.enter="submit">
```
全部的按键别名：
- .enter
- .tab
- .delete (捕获 “删除” 和 “退格” 键)
- .esc
- .space
- .up
- .down
- .left
- .right

可以通过全局 config.keyCodes 对象自定义按键修饰符别名：
```javascript
// 可以使用 v-on:keyup.f1
Vue.config.keyCodes.f1 = 112
```

### 按键修饰符
可以用如下修饰符开启鼠标或键盘事件监听，使在按键按下时发生响应。
- .ctrl
- .alt
- .shift
- .meta
> 注意：在Mac系统键盘上，meta对应命令键 (⌘)。在Windows系统键盘meta对应windows徽标键(⊞)。在Sun操作系统键盘上，meta对应实心宝石键 (◆)。在其他特定键盘上，尤其在MIT和Lisp键盘及其后续，比如Knight键盘，space-cadet键盘，meta被标记为“META”。在Symbolics键盘上，meta被标记为“META” 或者 “Meta”。
```vue
<!-- Alt + C -->
<input @keyup.alt.67="clear">
<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```
### 为什么在HTML中监听事件？
你可能注意到这种事件监听的方式违背了关注点分离（separation of concern）传统理念。不必担心，因为所有的 Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护上的困难。实际上，使用 v-on 有几个好处：
1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。

## 表单控件绑定

### 基础用法
你可以用 v-model 指令在表单控件元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 v-model 本质上不过是语法糖，它负责监听用户的输入事件以更新数据，并特别处理一些极端的例子。
> v-model 并不关心表单控件初始化所生成的值。因为它会选择 Vue 实例数据来作为具体的值。
> 对于要求 IME （如中文、 日语、 韩语等） 的语言，你会发现那v-model不会在 ime 构成中得到更新。如果你也想实现更新，请使用 input事件。

#### 文本
```vue
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

#### 多行文本
```vue
<span>Multiline message is:</span>
<p style="white-space: pre">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>

```
> 在文本区域插值( <textarea></textarea> ) 并不会生效，应用 v-model 来代替
#### 复选框
单个勾选框，逻辑值：
```vue
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
```
多个勾选框，绑定到同一个数组：
```vue
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
<br>
<span>Checked names: {{ checkedNames }}</span>
```
```javascript
new Vue({
  el: '...',
  data: {
    checkedNames: []
  }
})
```
#### 单选按钮
```vue
<div id="example-4" class="demo">
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>
</div>

```
```javascript
new Vue({
  el: '#example-4',
  data: {
    picked: ''
  }
})
```
#### 选择列表
单选列表:
```vue
<div id="example-5" class="demo">
  <select v-model="selected">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
```
```javascript
new Vue({
  el: '#example-5',
  data: {
    selected: null
  }
})
```
多选列表（绑定到一个数组）：
```vue
<div id="example-6" class="demo">
  <select v-model="selected" multiple style="width: 50px">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span>
</div>
```
```javascript
new Vue({
  el: '#example-6',
  data: {
    selected: []
  }
})
```
动态选项，用 v-for 渲染：
```vue
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
```
```javascript
new Vue({
  el: '...',
  data: {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
})
```

### 绑定value
对于单选按钮，勾选框及选择列表选项， v-model 绑定的 value 通常是静态字符串（对于勾选框是逻辑值）：
```vue
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">
<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">
<!-- 当选中时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```
但是有时我们想绑定 value 到 Vue 实例的一个动态属性上，这时可以用 v-bind 实现，并且这个属性的值可以不是字符串。

#### 复选框
```vue
<input
  type="checkbox"
  v-model="toggle"
  v-bind:true-value="a"
  v-bind:false-value="b"
>
```
```javascript
// 当选中时
vm.toggle === vm.a
// 当没有选中时
vm.toggle === vm.b
```
#### 单选按钮
```vue
<input type="radio" v-model="pick" v-bind:value="a">
```
```javascript
// 当选中时
vm.pick === vm.a
```
#### 选择列表设置
```vue
<select v-model="selected">
    <!-- 内联对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
```
```javascript
// 当选中时
typeof vm.selected // -> 'object'
vm.selected.number // -> 123
```

### 修饰符
#### .lazy
在默认情况下， v-model 在 input 事件中同步输入框的值与数据 (除了 上述 IME 部分)，但你可以添加一个修饰符 lazy ，从而转变为在 change 事件中同步：
```vue
<!-- 在 "change" 而不是 "input" 事件中更新 -->
<input v-model.lazy="msg" >
```

#### .number
如果想自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值），可以添加一个修饰符 number 给 v-model 来处理输入值：
```vue
<input v-model.number="age" type="number">
```
这通常很有用，因为在 type="number" 时 HTML 中输入的值也总是会返回字符串类型。

#### .trim
如果要自动过滤用户输入的首尾空格，可以添加 trim 修饰符到 v-model 上过滤输入：
```vue
<input v-model.trim="msg">
```

### v-model与组件


## 组件
### 什么是组件？
组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。

### 使用组件
#### 注册
之前说过，我们可以通过以下方式创建一个 Vue 实例：
```javascript
new Vue({
  el: '#some-element',
  // 选项
})
```
要注册一个全局组件，你可以使用 Vue.component(tagName, options)。 例如：
```javascript
Vue.component('my-component', {
  // 选项
})
```
> 对于自定义标签名，Vue.js 不强制要求遵循 W3C规则 （小写，并且包含一个短杠），尽管遵循这个规则比较好。

组件在注册之后，便可以在父实例的模块中以自定义元素 <my-component></my-component> 的形式使用。要确保在初始化根实例 之前 注册了组件
```vue
<div id="example">
  <my-component></my-component>
</div>
```
```javascript
// 注册
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})
// 创建根实例
new Vue({
  el: '#example'
})
```

#### 局部注册
不必在全局注册每个组件。通过使用组件实例选项注册，可以使组件仅在另一个实例/组件的作用域中可用：
```javascript
var Child = {
  template: '<div>A custom component!</div>'
}
new Vue({
  // ...
  components: {
    // <my-component> 将只在父模板可用
    'my-component': Child
  }
})
```
这种封装也适用于其它可注册的 Vue 功能，如指令。

#### DOM模板解析说明
当使用 DOM 作为模版时（例如，将 el 选项挂载到一个已存在的元素上）, 你会受到 HTML 的一些限制，因为 Vue 只有在浏览器解析和标准化 HTML 后才能获取模版内容。尤其像这些元素` <ul> `，`<ol>`，`<table>` ，`<select> `限制了能被它包裹的元素， 而一些像 `<option>` 这样的元素只能出现在某些其它元素内部。
在自定义组件中使用这些受限制的元素时会导致一些问题，例如：
```vue
<table>
  <my-row>...</my-row>
</table>
```
自定义组件 <my-row> 被认为是无效的内容，因此在渲染的时候会导致错误。变通的方案是使用特殊的 is 属性：
```vue
<table>
  <tr is="my-row"></tr>
</table>
```
应当注意，如果您使用来自以下来源之一的字符串模板，这些限制将不适用：
- `<script type="text/x-template">`
- JavaScript内联模版字符串
- .vue 组件

因此，有必要的话请使用字符串模版。

#### data必须是函数
通过Vue构造器传入的各种选项大多数都可以在组件里用。 data 是一个例外，它必须是函数。 实际上，如果你这么做：
```javascript
Vue.component('my-component', {
  template: '<span>{{ message }}</span>',
  data: {
    message: 'hello'
  }
})
```
那么 Vue 会停止，并在控制台发出警告，告诉你在组件中 data 必须是一个函数。理解这种规则的存在意义很有帮助，让我们假设用如下方式来绕开Vue的警告：
```vue
<div id="example-2">
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>
```
```javascript
var data = { counter: 0 }
Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // 技术上 data 的确是一个函数了，因此 Vue 不会警告，
  // 但是我们返回给每个组件的实例的却引用了同一个data对象
  data: function () {
    return data
  }
})
new Vue({
  el: '#example-2'
})
```
由于这三个组件共享了同一个 data ， 因此增加一个 counter 会影响所有组件！这不对。我们可以通过为每个组件返回全新的 data 对象来解决这个问题：
```javascript
data: function () {
  return {
    counter: 0
  }
}
```

#### 构成组件
组件意味着协同工作，通常父子组件会是这样的关系：组件 A 在它的模版中使用了组件 B 。它们之间必然需要相互通信：父组件要给子组件传递数据，子组件需要将它内部发生的事情告知给父组件。然而，在一个良好定义的接口中尽可能将父子组件解耦是很重要的。这保证了每个组件可以在相对隔离的环境中书写和理解，也大幅提高了组件的可维护性和可重用性。
在 Vue.js 中，父子组件的关系可以总结为 props down, events up 。父组件通过 props 向下传递数据给子组件，子组件通过 events 给父组件发送消息。看看它们是怎么工作的。
![](https://cn.vuejs.org/images/props-events.png)

#### Prop
##### 使用Prop传递数据
 组件实例的作用域是孤立的。这意味着不能(也不应该)在子组件的模板内直接引用父组件的数据。要让子组件使用父组件的数据，我们需要通过子组件的props选项。
 子组件要显式地用 props 选项声明它期待获得的数据：
 ```javascript
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 就像 data 一样，prop 可以用在模板内
  // 同样也可以在 vm 实例中像 “this.message” 这样使用
  template: '<span>{{ message }}</span>'
})
```
然后我们可以这样向它传入一个普通字符串：
```vue
<child message="hello!"></child>
```

##### camelCase vs. kebab-case
HTML 特性是不区分大小写的。所以，当使用的不是字符串模版，camelCased (驼峰式) 命名的 prop 需要转换为相对应的 kebab-case (短横线隔开式) 命名：
```javascript
Vue.component('child', {
  // camelCase in JavaScript
  props: ['myMessage'],
  template: '<span>{{ myMessage }}</span>'
})
```
```vue
<!-- kebab-case in HTML -->
<child my-message="hello!"></child>
```

##### 动态Prop
在模板中，要动态地绑定父组件的数据到子模板的props，与绑定到任何普通的HTML特性相类似，就是用 v-bind。每当父组件的数据变化时，该变化也会传导给子组件：
```vue
<div>
  <input v-model="parentMsg">
  <br>
  <child v-bind:my-message="parentMsg"></child>
</div>
```
使用 v-bind 的缩写语法通常更简单：
```vue
<child :my-message="parentMsg"></child>
```

##### 字面量语法vs动态语法
初学者常犯的一个错误是使用字面量语法传递数值：
```vue
<!-- 传递了一个字符串 "1" -->
<comp some-prop="1"></comp>
```
因为它是一个字面 prop ，它的值是字符串 "1" 而不是number。如果想传递一个实际的number，需要使用 v-bind ，从而让它的值被当作 JavaScript 表达式计算：
```vue
<!-- 传递实际的 number -->
<comp v-bind:some-prop="1"></comp>
```

##### 单向数据流
prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态——这会让应用的数据流难以理解。
另外，每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop 。如果你这么做了，Vue 会在控制台给出警告。
为什么我们会有修改prop中数据的冲动呢？通常是这两种原因：
1. prop 作为初始值传入后，子组件想把它当作局部数据来用；
2. prop 作为初始值传入，由子组件处理成其它数据输出。
对这两种原因，正确的应对方式是：
1. 定义一个局部变量，并用 prop 的值初始化它：
```javascript
props: ['initialCounter'],
data: function () {
  return { counter: this.initialCounter }
}
```
2. 定义一个计算属性，处理 prop 的值并返回。
```javascript
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```
>　注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。

##### Prop验证
我们可以为组件的 props 指定验证规格。如果传入的数据不符合规格，Vue 会发出警告。当组件给其他人使用时，这很有用。
要指定验证规格，需要用对象的形式，而不能用字符串数组：
```javascript
Vue.component('example', {
  props: {
    // 基础类型检测 （`null` 意思是任何类型都可以）
    propA: Number,
    // 多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数字，有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组／对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})
```
type 可以是下面原生构造器：
- String
- Number
- Boolean
- Function
- Object
- Array
type 也可以是一个自定义构造器函数，使用 instanceof 检测。\
当 prop 验证失败，Vue会在抛出警告 (如果使用的是开发版本)。

### 自定义事件
我们知道，父组件是使用 props 传递数据给子组件，但如果子组件要把数据传递回去，应该怎样做？那就是自定义事件！
#### 使用v-on绑定自定义事件
每个 Vue 实例都实现了事件接口(Events interface)，即：
- 使用 $on(eventName) 监听事件
- 使用 $emit(eventName) 触发事件
> Vue的事件系统分离自浏览器的EventTarget API。尽管它们的运行类似，但是$on 和 $emit 不是addEventListener 和 dispatchEvent 的别名。

另外，父组件可以在使用子组件的地方直接用 v-on 来监听子组件触发的事件。

> 不能用$on侦听子组件抛出的事件，而必须在模板里直接用v-on绑定，就像以下的例子：

```vue
<div id="counter-event-example">
  <p>{{ total }}</p>
  <button-counter v-on:increment="incrementTotal"></button-counter>
  <button-counter v-on:increment="incrementTotal"></button-counter>
</div>
```
```javascript
Vue.component('button-counter', {
  template: '<button v-on:click="increment">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    increment: function () {
      this.counter += 1
      this.$emit('increment')
    }
  },
})
new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})
```

给组件绑定原生事件
有时候，你可能想在某个组件的根元素上监听一个原生事件。可以使用 .native 修饰 v-on 。例如：
```vue
<my-component v-on:click.native="doTheThing"></my-component>
```

#### .sync修饰符
在一些情况下，我们可能会需要对一个 prop 进行『双向绑定』。事实上，这正是 Vue 1.x 中的 .sync修饰符所提供的功能。当一个子组件改变了一个 prop 的值时，这个变化也会同步到父组件中所绑定的值。这很方便，但也会导致问题，因为它破坏了『单向数据流』的假设。由于子组件改变 prop 的代码和普通的状态改动代码毫无区别，当光看子组件的代码时，你完全不知道它何时悄悄地改变了父组件的状态。这在 debug 复杂结构的应用时会带来很高的维护成本。
上面所说的正是我们在 2.0 中移除 .sync 的理由。但是在 2.0 发布之后的实际应用中，我们发现 .sync 还是有其适用之处，比如在开发可复用的组件库时。我们需要做的只是让子组件改变父组件状态的代码更容易被区分。
在 2.3 我们重新引入了 .sync 修饰符，但是这次它只是作为一个编译时的语法糖存在。它会被扩展为一个自动更新父组件属性的 v-on 侦听器。

#### 使用自定义事件的表单输入组件
自定义事件可以用来创建自定义的表单输入组件，使用 v-model 来进行数据双向绑定。看看这个：
```vue
<input v-model="something">
```
```vue
<input v-bind:value="something" v-on:input="something = $event.target.value">
```
```vue
<custom-input v-bind:value="something" v-on:input="something = arguments[0]"></custom-input>
```
所以要让组件的 v-model 生效，它必须：
- 接受一个 value 属性
- 在有新的 value 时触发 input 事件

#### 非父子组件通信
有时候两个组件也需要通信(非父子关系)。在简单的场景下，可以使用一个空的 Vue 实例作为中央事件总线：
```javascript
var bus = new Vue()
// 触发组件 A 中的事件
bus.$emit('id-selected', 1)
// 在组件 B 创建的钩子中监听事件
bus.$on('id-selected', function (id) {
  // ...
})
```
#### 使用slot分发内容
在使用组件时，我们常常要像这样组合它们：
```vue
<app>
  <app-header></app-header>
  <app-footer></app-footer>
</app>
```
注意两点：
1. <app> 组件不知道它的挂载点会有什么内容。挂载点的内容是由<app>的父组件决定的。
2. <app> 组件很可能有它自己的模版。  

为了让组件可以组合，我们需要一种方式来混合父组件的内容与子组件自己的模板。这个过程被称为 内容分发 (或 “transclusion” 如果你熟悉 Angular)。Vue.js 实现了一个内容分发 API ，参照了当前 Web 组件规范草案，使用特殊的 <slot> 元素作为原始内容的插槽。

#### 编译作用域
在深入内容分发 API 之前，我们先明确内容在哪个作用域里编译。假定模板为：
```vue
<child-component>
  {{ message }}
</child-component>
```
message 应该绑定到父组件的数据，还是绑定到子组件的数据？答案是父组件。组件作用域简单地说是：
父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。
一个常见错误是试图在父组件模板内将一个指令绑定到子组件的属性/方法：
如果要绑定作用域内的指令到一个组件的根节点，你应当在组件自己的模板上做：
```javascript
Vue.component('child-component', {
  // 有效，因为是在正确的作用域内
  template: '<div v-show="someChildProperty">Child</div>',
  data: function () {
    return {
      someChildProperty: true
    }
  }
})
```

#### 单个slot
除非子组件模板包含至少一个 <slot> 插口，否则父组件的内容将会被丢弃。当子组件模板只有一个没有属性的 slot 时，父组件整个内容片段将插入到 slot 所在的 DOM 位置，并替换掉 slot 标签本身。
最初在 <slot> 标签中的任何内容都被视为备用内容。备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时才显示备用内容。
假定 my-component 组件有下面模板：
```vue
<div>
  <h2>我是子组件的标题</h2>
  <slot>
    只有在没有要分发的内容时才会显示。
  </slot>
</div>
```
父组件模版：
```vue
<div>
  <h1>我是父组件的标题</h1>
  <my-component>
    <p>这是一些初始内容</p>
    <p>这是更多的初始内容</p>
  </my-component>
</div>
```
渲染结果：
```vue
<div>
  <h1>我是父组件的标题</h1>
  <div>
    <h2>我是子组件的标题</h2>
    <p>这是一些初始内容</p>
    <p>这是更多的初始内容</p>
  </div>
</div>
```

#### 具名slot
<slot> 元素可以用一个特殊的属性 name 来配置如何分发内容。多个 slot 可以有不同的名字。具名 slot 将匹配内容片段中有对应 slot 特性的元素。
仍然可以有一个匿名 slot ，它是默认 slot ，作为找不到匹配的内容片段的备用插槽。如果没有默认的 slot ，这些找不到匹配的内容片段将被抛弃。
例如，假定我们有一个 app-layout 组件，它的模板为：

```vue
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```
父组件模版：
```vue
<app-layout>
  <h1 slot="header">这里可能是一个页面标题</h1>
  <p>主要内容的一个段落。</p>
  <p>另一个主要段落。</p>
  <p slot="footer">这里有一些联系信息</p>
</app-layout>
```
渲染结果为：
```vue
<div class="container">
  <header>
    <h1>这里可能是一个页面标题</h1>
  </header>
  <main>
    <p>主要内容的一个段落。</p>
    <p>另一个主要段落。</p>
  </main>
  <footer>
    <p>这里有一些联系信息</p>
  </footer>
</div>
```

#### 作用域插槽
作用域插槽是一种特殊类型的插槽，用作使用一个（能够传递数据到）可重用模板替换已渲染元素。
在子组件中，只需将数据传递到插槽，就像你将 prop 传递给组件一样：
```vue
<div class="child">
  <slot text="hello from child"></slot>
</div>
```
在父级中，具有特殊属性 scope 的 <template> 元素，表示它是作用域插槽的模板。scope 的值对应一个临时变量名，此变量接收从子组件中传递的 prop 对象：
```vue
<div class="parent">
  <child>
    <template scope="props">
      <span>hello from parent</span>
      <span>{{ props.text }}</span>
    </template>
  </child>
</div>
```
如果我们渲染以上结果，得到的输出会是：
```vue
<div class="parent">
  <div class="child">
    <span>hello from parent</span>
    <span>hello from child</span>
  </div>
</div>
```
作用域插槽更具代表性的用例是列表组件，允许组件自定义应该如何渲染列表每一项：
```vue
<my-awesome-list :items="items">
  <!-- 作用域插槽也可以是具名的 -->
  <template slot="item" scope="props">
    <li class="my-fancy-item">{{ props.text }}</li>
  </template>
</my-awesome-list>
```
列表组件的模板：
```vue
<ul>
  <slot name="item"
    v-for="item in items"
    :text="item.text">
    <!-- 这里写入备用内容 -->
  </slot>
</ul>
```

### 动态组件
通过使用保留的 <component> 元素，动态地绑定到它的 is 特性，我们让多个组件可以使用同一个挂载点，并动态切换：
```javascript
var vm = new Vue({
  el: '#example',
  data: {
    currentView: 'home'
  },
  components: {
    home: { /* ... */ },
    posts: { /* ... */ },
    archive: { /* ... */ }
  }
})
```
```vue
<component v-bind:is="currentView">
  <!-- 组件在 vm.currentview 变化时改变！ -->
</component>
```
也可以直接绑定到组件对象上：
```javascript
var Home = {
  template: '<p>Welcome home!</p>'
}
var vm = new Vue({
  el: '#example',
  data: {
    currentView: Home
  }
})
```

#### keep-alive
如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 keep-alive 指令参数：
```vue
<keep-alive>
  <component :is="currentView">
    <!-- 非活动组件将被缓存！ -->
  </component>
</keep-alive>
```
### 杂项
#### 编写可复用组件
在编写组件时，记住是否要复用组件有好处。一次性组件跟其它组件紧密耦合没关系，但是可复用组件应当定义一个清晰的公开接口。

Vue组件的API来自三部分-props,events和slots:
- Props允许外部环境传递数据给组件
- Events允许组件触发外部环境的副作用
- Slots允许外部环境将额外的内容组合在组件中。
使用v-bind和v-on的简写语法，模板的缩进清晰且简洁。
```vue
<my-component
   :foo="baz"
   :bar="qux"
   @event-a="doThis"
   @event-b="doTaht"
   >
   <img slot="icon" src="...">
     <p slot="main-text">Hello!</p>
     </my-component>
```

#### 子组件索引
尽管有props和events，但是有时仍需要在JavaScript中直接访问子组件。为此可以使用ref为子组件指定一个索引ID。
```vue
<div id="parent">
<user-profile ref="profile"></user-profile>
</div> 
```
```javascript
var parent = new Vue({el:"#parent"})
var child = parent.$refs.profile
```
当ref和v-for一起使用时，ref是一个数组或对象，包含相应的子组件。
> $refs 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 $refs 。

#### 异步组件
在大型应用中，我们可能需要将应用拆分为多个小模块，按需从服务器下载。为了让事情更简单，Vus.js允许将组件定义为一个工厂函数，动态地解析组件的定义。Vue.js只在组件需要渲染时触发工厂函数，并且把结果缓存起来，用于后面的再次渲染。
```javascript
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // Pass the component definition to the resolve callback
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```
工厂函数接收一个resolve回调，在收到从服务器下载的组件定义时调用。也可以调用reject（reason）指示加载失败。这里setTimeout只是为了演示。
```javascript
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 require 语法告诉 webpack
  // 自动将编译后的代码分割成不同的块，
  // 这些块将通过 Ajax 请求自动下载。
  require(['./my-async-component'], resolve)
})
```
你可以使用 Webpack 2 + ES2015 的语法返回一个 Promise resolve 函数：
```javascript
Vue.component(
  'async-webpack-example',
  () => import('./my-async-component')
)
```
> 如果你是 Browserify 用户,可能就无法使用异步组件了,它的作者已经表明 Browserify 是不支持异步加载的。Browserify 社区发现 一些解决方法，可能有助于已存在的复杂应用。对于其他场景，我们推荐简单实用 Webpack 构建，一流的异步支持

#### 高级异步组件
```javascript
const AsyncComp = () => ({
  // 需要加载的组件. 应当是一个 Promise
  component: import('./MyComp.vue'),
  // loading 时应当渲染的组件
  loading: LoadingComp,
  // 出错时渲染的组件
  error: ErrorComp,
  // 渲染 loading 组件前的等待时间。默认：200ms.
  delay: 200,
  // 最长等待时间。超出此时间则渲染 error 组件。默认：Infinity
  timeout: 3000
})
```
注意，当一个异步组件被作为 vue-router 的路由组件使用时，这些高级选项都是无效的，因为在路由切换前就会提前加载所需要的异步组件。另外，如果你要在路由组件中上述写法，需要使用 vue-router 2.4.0+。

#### 组件命名约定
当注册组件（或者 props）时，可以使用 kebab-case ，camelCase ，或 TitleCase 。Vue 不关心这个。
```javascript
// 在组件定义中
components: {
  // 使用 kebab-case 形式注册
  'kebab-cased-component': { /* ... */ },
  // register using camelCase
  'camelCasedComponent': { /* ... */ },
  // register using TitleCase
  'TitleCasedComponent': { /* ... */ }
}
```
在 HTML 模版中，请使用 kebab-case 形式：
```vue
<!-- 在HTML模版中始终使用 kebab-case -->
<kebab-cased-component></kebab-cased-component>
<camel-cased-component></camel-cased-component>
<title-cased-component></title-cased-component>
```
当使用字符串模式时，可以不受 HTML 的 case-insensitive 限制。这意味实际上在模版中，你可以使用 camelCase 、 TitleCase 或者 kebab-case 来引用：
```vue
<!-- 在字符串模版中可以用任何你喜欢的方式! -->
<my-component></my-component>
<myComponent></myComponent>
<MyComponent></MyComponent>
```
如果组件未经 slot 元素传递内容，你甚至可以在组件名后使用 / 使其自闭合：
```vue
<my-component/>
```
当然，这只在字符串模版中有效。因为自闭的自定义元素是无效的 HTML ，浏览器原生的解析器也无法识别它。

#### 递归组件
组件在它的模板内可以递归地调用自己，不过，只有当它有 name 选项时才可以：
```javascript
name: 'unique-name-of-my-component'
```
当你利用Vue.component全局注册了一个组件, 全局的ID作为组件的 name 选项，被自动设置.
```javascript
Vue.component('unique-name-of-my-component', {
  // ...
})
```
如果你不谨慎, 递归组件可能导致死循环:
```javascript
name: 'stack-overflow',
template: '<div><stack-overflow></stack-overflow></div>'
```
上面组件会导致一个错误 “max stack size exceeded” ，所以要确保递归调用有终止条件 (比如递归调用时使用 v-if 并让他最终返回 false )。

#### 组件间的循环引用
假设你正在构建一个文件目录树，像在Finder或文件资源管理器中。你可能有一个 tree-folder组件:
```html
<p>
  <span>{{ folder.name }}</span>
  <tree-folder-contents :children="folder.children"/>
</p>
```
然后 一个tree-folder-contents组件：
```vue
<ul>
  <li v-for="child in children">
    <tree-folder v-if="child.children" :folder="child"/>
    <span v-else>{{ child.name }}</span>
  </li>
</ul>
```
当你仔细看时，会发现在渲染树上这两个组件同时为对方的父节点和子节点–这点是矛盾的。当使用Vue.component将这两个组件注册为全局组件的时候，框架会自动为你解决这个矛盾，如果你是这样做的，就不用继续往下看了。
然而，如果你使用诸如Webpack或者Browserify之类的模块化管理工具来requiring/importing组件的话，就会报错了：
Failed to mount component: template or render function not defined.
为了解释为什么会报错，简单的将上面两个组件称为 A 和 B ，模块系统看到它需要 A ，但是首先 A 需要 B ，但是 B 需要 A， 而 A 需要 B，陷入了一个无限循环，因此不知道到底应该先解决哪个。要解决这个问题，我们需要在其中一个组件中（比如 A ）告诉模块化管理系统，“A 虽然需要 B ，但是不需要优先导入 B”
在我们的例子中，我们选择在tree-folder 组件中来告诉模块化管理系统循环引用的组件间的处理优先级，我们知道引起矛盾的子组件是tree-folder-contents，所以我们在beforeCreate 生命周期钩子中去注册它：
```javascript
beforeCreate: function () {
  this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue')
}
```

#### 内联模板
如果子组件有 inline-template 特性，组件将把它的内容当作它的模板，而不是把它当作分发内容。这让模板更灵活。
```vue
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```
但是 inline-template 让模板的作用域难以理解。最佳实践是使用 template 选项在组件内定义模板或者在 .vue 文件中使用 template 元素。

#### X-Templates
另一种定义模版的方式是在 JavaScript 标签里使用 text/x-template 类型，并且指定一个id。例如：
```vue
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>
```
```javascript
Vue.component('hello-world', {
  template: '#hello-world-template'
})
```
这在有很多模版或者小的应用中有用，否则应该避免使用，因为它将模版和组件的其他定义隔离了。

#### 对低开销的静态组件使用v-once
尽管在 Vue 中渲染 HTML 很快，不过当组件中包含大量静态内容时，可以考虑使用 v-once 将渲染结果缓存起来，就像这样：
```javascript
Vue.component('terms-of-service', {
  template: '\
    <div v-once>\
      <h1>Terms of Service</h1>\
      ... a lot of static content ...\
    </div>\
  '
})
```


# 进阶
## 深入响应式布局
我们已经涵盖了大部分的基础知识 - 现在是时候深入底层原理了！Vue 最显著的特性之一便是不太引人注意的响应式系统(reactivity system)。模型层(model)只是普通 JavaScript 对象，修改它则更新视图(view)。这会让状态管理变得非常简单且直观，不过理解它的工作原理以避免一些常见的问题也是很重要的。在本节中，我们将开始深入挖掘 Vue 响应式系统的底层细节。

### 如何追踪变化
把一个普通 JavaScript 对象传给 Vue 实例的 data 选项，Vue 将遍历此对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter。Object.defineProperty 是仅 ES5 支持，且无法 shim 的特性，这也就是为什么 Vue 不支持 IE8 以及更低版本浏览器的原因。\
用户看不到 getter/setter，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。这里需要注意的问题是浏览器控制台在打印数据对象时 getter/setter 的格式化并不同，所以你可能需要安装 vue-devtools 来获取更加友好的检查接口。\
每个组件实例都有相应的 watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。\
![](https://cn.vuejs.org/images/data.png)

### 变化检测问题
受现代 JavaScript 的限制（以及废弃 Object.observe），Vue 不能检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。例如：
```javascript
var vm = new Vue({
  data:{
  a:1
  }
})
// `vm.a` 是响应的
vm.b = 2
// `vm.b` 是非响应的
```
Vue 不允许在已经创建的实例上动态添加新的根级响应式属性(root-level reactive property)。然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上：
```javascript
Vue.set(vm.someObject,'b',2)
```
您还可以使用 vm.$set 实例方法，这也是全局 Vue.set 方法的别名：
```javascript
this.$set(this.someObject,'b',2)
```
有时你想向已有对象上添加一些属性，例如使用 Object.assign() 或 _.extend() 方法来添加属性。但是，添加到对象上的新属性不会触发更新。在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性：
```javascript
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

### 声明响应式属性
由于 Vue 不允许动态添加根级响应式属性，所以你必须在初始化实例前声明根级响应式属性，哪怕只是一个空值:
```javascript
var vm = new Vue({
  data: {
    // 声明 message 为一个空值字符串
    message: ''
  },
  template: '<div>{{ message }}</div>'
})
// 之后设置 `message` 
vm.message = 'Hello!'
```
如果你在 data 选项中未声明 message，Vue 将警告你渲染函数在试图访问的属性不存在。
这样的限制在背后是有其技术原因的，它消除了在依赖项跟踪系统中的一类边界情况，也使 Vue 实例在类型检查系统的帮助下运行的更高效。而且在代码可维护性方面也有一点重要的考虑：data 对象就像组件状态的概要，提前声明所有的响应式属性，可以让组件代码在以后重新阅读或其他开发人员阅读时更易于被理解。

### 异步更新队列
可能你还没有注意到，Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会一次推入到队列中。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际（已去重的）工作。Vue 在内部尝试对异步队列使用原生的 Promise.then 和 MutationObserver，如果执行环境不支持，会采用 setTimeout(fn, 0) 代替。\
例如，当你设置 vm.someData = 'new value' ，该组件不会立即重新渲染。当刷新队列时，组件会在事件循环队列清空时的下一个“tick”更新。多数情况我们不需要关心这个过程，但是如果你想在 DOM 状态更新后做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员沿着“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们确实要这么做。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。例如：
```html
<div id="example">{{message}}</div>
```
```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})
```
在组件内使用 vm.$nextTick() 实例方法特别方便，因为它不需要全局 Vue ，并且回调函数中的 this 将自动绑定到当前的 Vue 实例上：
```javascript
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: 'not updated'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = 'updated'
      console.log(this.$el.textContent) // => '没有更新'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => '更新完成'
      })
    }
  }
})
```
## 过滤效果
### 概述
Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。\
包括以下工具：\
- 在 CSS 过渡和动画中自动应用 class
- 可以配合使用第三方 CSS 动画库，如 Animate.css
- 在过渡钩子函数中使用 JavaScript 直接操作 DOM
- 可以配合使用第三方 JavaScript 动画库，如 Velocity.js

### 单元素/组件的过渡
Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加 entering/leaving 过渡。
- 条件渲染 （使用 v-if）
- 条件展示 （使用 v-show）
- 动态组件
- 组件根节点
```vue
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```
```javascript
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})
```
```css
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
```
当插入或删除包含在 transition 组件中的元素时，Vue 将会做以下处理：
1. 自动嗅探目标元素是否应用了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名。
2. 如果过渡组件提供了 JavaScript 钩子函数，这些钩子函数将在恰当的时机被调用。
3. 如果没有找到 JavaScript 钩子并且也没有检测到 CSS 过渡/动画，DOM 操作（插入/删除）在下一帧中立即执行。(注意：此指浏览器逐帧动画机制，与 Vue，和Vue的 nextTick 概念不同)

#### 过渡的-css-类名
会有 4 个(CSS)类名在 enter/leave 的过渡中切换
1. v-enter: 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
2. v-enter-active: 定义进入过渡的结束状态。在元素被插入时生效，在 transition/animation 完成之后移除。
3. v-leave: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。
4. v-leave-active: 定义离开过渡的结束状态。在离开过渡被触发时生效，在 transition/animation 完成之后移除。
![](http://cn.vuejs.org/images/transition.png)
对于这些在 enter/leave 过渡中切换的类名，v- 是这些类名的前缀。使用 <transition name="my-transition"> 可以重置前缀，比如 v-enter 替换为 my-transition-enter。
v-enter-active 和 v-leave-active 可以控制 进入/离开 过渡的不同阶段，在下面章节会有个示例说明。

#### css过渡
 ```vue
<div id="example-1">
  <button @click="show = !show">
    Toggle render
  </button>
  <transition name="slide-fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```
```javascript
new Vue({
  el: '#example-1',
  data: {
    show: true
  }
})
```
```css
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
```

#### css动画
CSS 动画用法同 CSS 过渡，区别是在动画中 v-enter 类名在节点插入 DOM 后不会立即删除，而是在 animationend 事件触发时删除。
```vue
<div id="example-2">
  <button @click="show = !show">Toggle show</button>
  <transition name="bounce">
    <p v-if="show">Look at me!</p>
  </transition>
</div>
```
```javascript
new Vue({
  el: '#example-2',
  data: {
    show: true
  }
})
```
```css
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}
```

#### 自定义过渡类名
我们可以通过以下特性来自定义过渡类名：
- enter-class
- enter-active-class
- leave-class
- leave-active-class
他们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 Animate.css 结合使用十分有用。
```vue
<link href="https://unpkg.com/animate.css@3.5.1/animate.min.css" rel="stylesheet" type="text/css">
<div id="example-3">
  <button @click="show = !show">
    Toggle render
  </button>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show">hello</p>
  </transition>
</div>
```
```javascript
new Vue({
  el: '#example-3',
  data: {
    show: true
  }
})
```

#### 同时使用Transitions和Animations
Vue 为了知道过渡的完成，必须设置相应的事件监听器。它可以是 transitionend 或 animationend ，这取决于给元素应用的 CSS 规则。如果你使用其中任何一种，Vue 能自动识别类型并设置监听。
但是，在一些场景中，你需要给同一个元素同时设置两种过渡动效，比如 animation 很快的被触发并完成了，而 transition 效果还没结束。在这种情况中，你就需要使用 type 特性并设置 animation 或 transition 来明确声明你需要 Vue 监听的类型。

#### JavaScript钩子
可以在属性中声明 JavaScript 钩子
```vue
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```
```javascript
// ...
methods: {
  // --------
  // 进入中
  // --------
  beforeEnter: function (el) {
    // ...
  },
  // 此回调函数是可选项的设置
  // 与 CSS 结合时使用
  enter: function (el, done) {
    // ...
    done()
  },
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },
  // --------
  // 离开时
  // --------
  beforeLeave: function (el) {
    // ...
  },
  // 此回调函数是可选项的设置
  // 与 CSS 结合时使用
  leave: function (el, done) {
    // ...
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}
```
这些钩子函数可以结合 CSS transitions/animations 使用，也可以单独使用。
> 当只用 JavaScript 过渡的时候， 在 enter 和 leave 中，回调函数 done 是必须的 。 否则，它们会被同步调用，过渡会立即完成。

> 推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。

```vue
<!--
Velocity works very much like jQuery.animate and is
a great option for JavaScript animations
-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
<div id="example-4">
  <button @click="show = !show">
    Toggle
  </button>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false"
  >
    <p v-if="show">
      Demo
    </p>
  </transition>
</div>
```
```javascript
new Vue({
  el: '#example-4',
  data: {
    show: false
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.transformOrigin = 'left'
    },
    enter: function (el, done) {
      Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
      Velocity(el, { fontSize: '1em' }, { complete: done })
    },
    leave: function (el, done) {
      Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
      Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
      Velocity(el, {
        rotateZ: '45deg',
        translateY: '30px',
        translateX: '30px',
        opacity: 0
      }, { complete: done })
    }
  }
})
```

### 初始渲染的过渡
可以通过 appear 特性设置节点的在初始渲染的过渡
```vue
<transition appear>
  <!-- ... -->
</transition>
```
这里默认和进入和离开过渡一样，同样也可以自定义 CSS 类名。
```vue
<transition
  appear
  appear-class="custom-appear-class"
  appear-active-class="custom-appear-active-class"
>
  <!-- ... -->
</transition>
```
自定义JavaScript钩子：
```vue
<transition
  appear
  v-on:before-appear="customBeforeAppearHook"
  v-on:appear="customAppearHook"
  v-on:after-appear="customAfterAppearHook"
>
  <!-- ... -->
</transition>
```

### 多个元素的过渡
我们之后讨论 多个组件的过渡, 对于原生标签可以使用 v-if/v-else 。最常见的多标签过渡是一个列表和描述这个列表为空消息的元素：
```vue
<transition>
  <table v-if="items.length > 0">
    <!-- ... -->
  </table>
  <p v-else>Sorry, no items found.</p>
</transition>
```
> 当有相同标签名的元素切换时，需要通过 key 特性设置唯一的值来标记以让 Vue 区分它们，否则 Vue 为了效率只会替换相同标签内部的内容。即使在技术上没有必要，给在 <transition> 组件中的多个元素设置 key 是一个更好的实践。

```vue
<transition>
  <button v-if="isEditing" key="save">
    Save
  </button>
  <button v-else key="edit">
    Edit
  </button>
</transition>
```
在一些场景中，也可以给通过给同一个元素的 key 特性设置不同的状态来代替 v-if 和 v-else，上面的例子可以重写为：
```vue
<transition>
  <button v-bind:key="isEditing">
    {{ isEditing ? 'Save' : 'Edit' }}
  </button>
</transition>
```
使用多个 v-if 的多个元素的过渡可以重写为绑定了动态属性的单个元素过渡。
```vue
<transition>
  <button v-if="docState === 'saved'" key="saved">
    Edit
  </button>
  <button v-if="docState === 'edited'" key="edited">
    Save
  </button>
  <button v-if="docState === 'editing'" key="editing">
    Cancel
  </button>
</transition>
```
可以重写为：
```vue
<transition>
  <button v-bind:key="docState">
    {{ buttonMessage }}
  </button>
</transition>
```
```javascript
// ...
computed: {
  buttonMessage: function () {
    switch (docState) {
      case 'saved': return 'Edit'
      case 'edited': return 'Save'
      case 'editing': return 'Cancel'
    }
  }
}
```

#### 过渡模式
同时生效的进入和离开的过渡不能满足所有要求，所以 Vue 提供了 过渡模式
- in-out: 新元素先进行过渡，完成之后当前元素过渡离开。
- out-in: 当前元素先进行过渡，完成之后新元素过渡进入。


### 多个组件的过渡
多个组件的过渡简单很多 - 我们不需要使用 key 特性。相反，我们只需要使用动态组件:
```vue
<transition name="component-fade" mode="out-in">
  <component v-bind:is="view"></component>
</transition>
```
```javascript
new Vue({
  el: '#transition-components-demo',
  data: {
    view: 'v-a'
  },
  components: {
    'v-a': {
      template: '<div>Component A</div>'
    },
    'v-b': {
      template: '<div>Component B</div>'
    }
  }
})
```
```css
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-active {
  opacity: 0;
}
```
### 列表过渡
目前为止，关于过渡我们已经讲到：
- 单个节点
- 同一时间渲染多个节点中的一个
那么怎么同时渲染整个列表，比如使用 v-for ？在这种场景中，使用 <transition-group> 组件。在我们深入例子之前，先了解关于这个组件的几个特点：
- 不同于 <transition>， 它会以一个真实元素呈现：默认为一个 <span>。你也可以通过 tag 特性更换为其他元素。
- 内部元素 总是需要 提供唯一的 key 属性值

#### 列表的进入和离开过渡
现在让我们由一个简单的例子深入，进入和离开的过渡使用之前一样的 CSS 类名。
```vue
<div id="list-demo" class="demo">
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
</div>
```
```javascript
new Vue({
  el: '#list-demo',
  data: {
    items: [1,2,3,4,5,6,7,8,9],
    nextNum: 10
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
  }
})
```
```css
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-active {
  opacity: 0;
  transform: translateY(30px);
}
```

#### 列表的位移过渡
<transition-group> 组件还有一个特殊之处。不仅可以进入和离开动画，还可以改变定位。要使用这个新功能只需了解新增的 v-move 特性，它会在元素的改变定位的过程中应用。像之前的类名一样，可以通过 name 属性来自定义前缀，也可以通过 move-class 属性手动设置。
v-move 对于设置过渡的切换时机和过渡曲线非常有用，你会看到如下的例子：

```vue
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>
<div id="flip-list-demo" class="demo">
  <button v-on:click="shuffle">Shuffle</button>
  <transition-group name="flip-list" tag="ul">
    <li v-for="item in items" v-bind:key="item">
      {{ item }}
    </li>
  </transition-group>
</div>
```
```javascript
new Vue({
  el: '#flip-list-demo',
  data: {
    items: [1,2,3,4,5,6,7,8,9]
  },
  methods: {
    shuffle: function () {
      this.items = _.shuffle(this.items)
    }
  }
})
```
```javascript
.flip-list-move {
  transition: transform 1s;
}
```
我们将之前实现的例子和这个技术结合，使我们列表的一切变动都会有动画过渡。
```vue
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>
<div id="list-complete-demo" class="demo">
  <button v-on:click="shuffle">Shuffle</button>
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list-complete" tag="p">
    <span
      v-for="item in items"
      v-bind:key="item"
      class="list-complete-item"
    >
      {{ item }}
    </span>
  </transition-group>
</div>
```
```javascript
new Vue({
  el: '#list-complete-demo',
  data: {
    items: [1,2,3,4,5,6,7,8,9],
    nextNum: 10
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
    shuffle: function () {
      this.items = _.shuffle(this.items)
    }
  }
})
```
```css
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-active {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
```
> 需要注意的是使用 FLIP 过渡的元素不能设置为 display: inline 。作为替代方案，可以设置为 display: inline-block 或者放置于 flex 中

#### 列表的渐进过渡
通过 data 属性与 JavaScript 通信 ，就可以实现列表的渐进过渡：
```vue
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
<div id="staggered-list-demo">
  <input v-model="query">
  <transition-group
    name="staggered-fade"
    tag="ul"
    v-bind:css="false"
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
  >
    <li
      v-for="(item, index) in computedList"
      v-bind:key="item.msg"
      v-bind:data-index="index"
    >{{ item.msg }}</li>
  </transition-group>
</div>
```
```javascript
new Vue({
  el: '#staggered-list-demo',
  data: {
    query: '',
    list: [
      { msg: 'Bruce Lee' },
      { msg: 'Jackie Chan' },
      { msg: 'Chuck Norris' },
      { msg: 'Jet Li' },
      { msg: 'Kung Fury' }
    ]
  },
  computed: {
    computedList: function () {
      var vm = this
      return this.list.filter(function (item) {
        return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
      })
    }
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, height: '1.6em' },
          { complete: done }
        )
      }, delay)
    },
    leave: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    }
  }
})
```

### 可复用的过渡
过渡可以通过 Vue 的组件系统实现复用。要创建一个可复用过渡组件，你需要做的就是将 <transition> 或者 <transition-group> 作为根组件，然后将任何子组件放置在其中就可以了。
```javascript
Vue.component('my-special-transition', {
  template: '\
    <transition\
      name="very-special-transition"\
      mode="out-in"\
      v-on:before-enter="beforeEnter"\
      v-on:after-enter="afterEnter"\
    >\
      <slot></slot>\
    </transition>\
  ',
  methods: {
    beforeEnter: function (el) {
      // ...
    },
    afterEnter: function (el) {
      // ...
    }
  }
})
```
```javascript
Vue.component('my-special-transition', {
  functional: true,
  render: function (createElement, context) {
    var data = {
      props: {
        name: 'very-special-transition',
        mode: 'out-in'
      },
      on: {
        beforeEnter: function (el) {
          // ...
        },
        afterEnter: function (el) {
          // ...
        }
      }
    }
    return createElement('transition', data, context.children)
  }
})
```

### 动态过渡
在 Vue 中即使是过渡也是数据驱动的！动态过渡最基本的例子是通过 name 特性来绑定动态值。
```vue
<transition v-bind:name="transitionName">
  <!-- ... -->
</transition>
```
当你想用 Vue 的过渡系统来定义的 CSS 过渡/动画 在不同过渡间切换会非常有用。
所有的过渡特性都是动态绑定。它不仅是简单的特性，通过事件的钩子函数方法，可以在获取到相应上下文数据。这意味着，可以根据组件的状态通过 JavaScript 过渡设置不同的过渡效果。
```vue
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
<div id="dynamic-fade-demo">
  Fade In: <input type="range" v-model="fadeInDuration" min="0" v-bind:max="maxFadeDuration">
  Fade Out: <input type="range" v-model="fadeOutDuration" min="0" v-bind:max="maxFadeDuration">
  <transition
    v-bind:css="false"
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
  >
    <p v-if="show">hello</p>
  </transition>
  <button v-on:click="stop = true">Stop it!</button>
</div>
```
```javascript
new Vue({
  el: '#dynamic-fade-demo',
  data: {
    show: true,
    fadeInDuration: 1000,
    fadeOutDuration: 1000,
    maxFadeDuration: 1500,
    stop: false
  },
  mounted: function () {
    this.show = false
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el, done) {
      var vm = this
      Velocity(el,
        { opacity: 1 },
        {
          duration: this.fadeInDuration,
          complete: function () {
            done()
            if (!vm.stop) vm.show = false
          }
        }
      )
    },
    leave: function (el, done) {
      var vm = this
      Velocity(el,
        { opacity: 0 },
        {
          duration: this.fadeOutDuration,
          complete: function () {
            done()
            vm.show = true
          }
        }
      )
    }
  }
})
```

## 过渡状态
Vue 的过渡系统提供了非常多简单的方法设置进入、离开和列表的动效。那么对于数据元素本身的动效呢，比如：
- 数字和运算
- 颜色的显示
- SVG 节点的位置
- 元素的大小和其他的属性
所有的原始数字都被事先存储起来，可以直接转换到数字。做到这一步，我们就可以结合 Vue 的响应式和组件系统，使用第三方库来实现切换元素的过渡状态。

### 状态动画与watcher
通过 watcher 我们能监听到任何数值属性的数值更新。可能听起来很抽象，所以让我们先来看看使用Tweenjs一个例子：
```vue
<script src="https://unpkg.com/tween.js@16.3.4"></script>
<div id="animated-number-demo">
  <input v-model.number="number" type="number" step="20">
  <p>{{ animatedNumber }}</p>
</div>
```
```javascript
new Vue({
  el: '#animated-number-demo',
  data: {
    number: 0,
    animatedNumber: 0
  },
  watch: {
    number: function(newValue, oldValue) {
      var vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 500)
        .onUpdate(function () {
          vm.animatedNumber = this.tweeningNumber.toFixed(0)
        })
        .start()
      animate()
    }
  }
})
```
当你把数值更新时，就会触发动画。这个是一个不错的演示，但是对于不能直接像数字一样存储的值，比如 CSS 中的 color 的值，通过下面的例子我们来通过 Color.js 实现一个例子：
```vue
<script src="https://unpkg.com/tween.js@16.3.4"></script>
<script src="https://unpkg.com/color-js@1.0.3/color.js"></script>
<div id="example-7">
  <input
    v-model="colorQuery"
    v-on:keyup.enter="updateColor"
    placeholder="Enter a color"
  >
  <button v-on:click="updateColor">Update</button>
  <p>Preview:</p>
  <span
    v-bind:style="{ backgroundColor: tweenedCSSColor }"
    class="example-7-color-preview"
  ></span>
  <p>{{ tweenedCSSColor }}</p>
</div>
```
```javascript
var Color = net.brehaut.Color
new Vue({
  el: '#example-7',
  data: {
    colorQuery: '',
    color: {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1
    },
    tweenedColor: {}
  },
  created: function () {
    this.tweenedColor = Object.assign({}, this.color)
  },
  watch: {
    color: function () {
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween(this.tweenedColor)
        .to(this.color, 750)
        .start()
      animate()
    }
  },
  computed: {
    tweenedCSSColor: function () {
      return new Color({
        red: this.tweenedColor.red,
        green: this.tweenedColor.green,
        blue: this.tweenedColor.blue,
        alpha: this.tweenedColor.alpha
      }).toCSS()
    }
  },
  methods: {
    updateColor: function () {
      this.color = new Color(this.colorQuery).toRGB()
      this.colorQuery = ''
    }
  }
})
```

```css
.example-7-color-preview {
  display: inline-block;
  width: 50px;
  height: 50px;
}
```
### 动态状态转换
就像 Vue 的过渡组件一样，数据背后状态转换会实时更新，这对于原型设计十分有用。当你修改一些变量，即使是一个简单的 SVG 多边形也可是实现很多难以想象的效果。

### 通过组件组织过渡
管理太多的状态转换会很快的增加 Vue 实例或者组件的复杂性，幸好很多的动画可以提取到专用的子组件。
```vue
<script src="https://unpkg.com/tween.js@16.3.4"></script>
<div id="example-8">
  <input v-model.number="firstNumber" type="number" step="20"> +
  <input v-model.number="secondNumber" type="number" step="20"> =
  {{ result }}
  <p>
    <animated-integer v-bind:value="firstNumber"></animated-integer> +
    <animated-integer v-bind:value="secondNumber"></animated-integer> =
    <animated-integer v-bind:value="result"></animated-integer>
  </p>
</div>
```
```javascript
// 这种复杂的补间动画逻辑可以被复用
// 任何整数都可以执行动画
// 组件化使我们的界面十分清晰
// 可以支持更多更复杂的动态过渡
// strategies.
Vue.component('animated-integer', {
  template: '<span>{{ tweeningValue }}</span>',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      tweeningValue: 0
    }
  },
  watch: {
    value: function (newValue, oldValue) {
      this.tween(oldValue, newValue)
    }
  },
  mounted: function () {
    this.tween(0, this.value)
  },
  methods: {
    tween: function (startValue, endValue) {
      var vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 500)
        .onUpdate(function () {
          vm.tweeningValue = this.tweeningValue.toFixed(0)
        })
        .start()
      animate()
    }
  }
})
// All complexity has now been removed from the main Vue instance!
new Vue({
  el: '#example-8',
  data: {
    firstNumber: 20,
    secondNumber: 40
  },
  computed: {
    result: function () {
      return this.firstNumber + this.secondNumber
    }
  }
})
```
我们能在组件中结合使用这一节讲到各种过渡策略和 Vue 内建的过渡系统。总之，对于完成各种过渡动效几乎没有阻碍。

### Render函数

#### 基础
Vue 推荐在绝大多数情况下使用 template 来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力，这就是 render 函数，它比 template 更接近编译器。
```vue
<h1>
  <a name="hello-world" href="#hello-world">
    Hello world!
  </a>
</h1>
```
在 HTML 层， 我们决定这样定义组件接口：
```vue
<anchored-heading :level="1">Hello world!</anchored-heading>
```
当我们开始写一个通过 level prop 动态生成heading 标签的组件，你可能很快想到这样实现：
```vue
<script type="text/x-template" id="anchored-heading-template">
  <div>
    <h1 v-if="level === 1">
      <slot></slot>
    </h1>
    <h2 v-if="level === 2">
      <slot></slot>
    </h2>
    <h3 v-if="level === 3">
      <slot></slot>
    </h3>
    <h4 v-if="level === 4">
      <slot></slot>
    </h4>
    <h5 v-if="level === 5">
      <slot></slot>
    </h5>
    <h6 v-if="level === 6">
      <slot></slot>
    </h6>
  </div>
</script>
```
```javascript
Vue.component('anchored-heading', {
  template: '#anchored-heading-template',
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```
在这种场景中使用 template 并不是最好的选择：首先代码冗长，为了在不同级别的标题中插入锚点元素，我们需要重复地使用 <slot></slot>。其次由于组件必须有根节点，标题和锚点元素被包裹在了一个无用的 div 中。
虽然模板在大多数组件中都非常好用，但是在这里它就不是很简洁的了。那么，我们来尝试使用 render 函数重写上面的例子：
```javascript
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // tag name 标签名称
      this.$slots.default // 子组件中的阵列
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```
简单清晰很多！简单来说，这样代码精简很多，但是需要非常熟悉 Vue 的实例属性。在这个例子中，你需要知道当你不使用 slot 属性向组件中传递内容时，比如 anchored-heading 中的 Hello world!, 这些子元素被存储在组件实例中的 $slots.default中。如果你还不了解， 在深入 render 函数之前推荐阅读 instance properties API。

#### createElement参数
第二件你需要熟悉的是如何在 createElement 函数中生成模板。这里是 createElement 接受的参数：
```javascript
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签字符串，组件选项对象，或者一个返回值类型为String/Object的函数，必要参数
  'div',
  // {Object}
  // 一个包含模板相关属性的数据对象
  // 这样，您可以在 template 中使用这些属性.可选参数.
  {
    // (详情见下一节)
  },
  // {String | Array}
  // 子节点(VNodes)，可以是一个字符串或者一个数组. 可选参数.
  [
    createElement('h1', 'hello world'),
    createElement(MyComponent, {
      props: {
        someProp: 'foo'
      }
    }),
    'bar'
  ]
)
```
#### 深入data object参数
有一件事要注意：正如在模板语法中，v-bind:class 和 v-bind:style ，会被特别对待一样，在 VNode 数据对象中，下列属性名是级别最高的字段。
```javascript
{
  // 和`v-bind:class`一样的 API
  'class': {
    foo: true,
    bar: false
  },
  // 和`v-bind:style`一样的 API
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 正常的 HTML 特性
  attrs: {
    id: 'foo'
  },
  // 组件 props
  props: {
    myProp: 'bar'
  },
  // DOM 属性
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器基于 "on"
  // 所以不再支持如 v-on:keyup.enter 修饰器
  // 需要手动匹配 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅对于组件，用于监听原生事件，而不是组件内部使用 vm.$emit 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令. 注意事项：不能对绑定的旧值设值
  // Vue 会为您持续追踪
  directives: [
    {
      name: 'my-custom-directive',
      value: '2'
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // Scoped slots in the form of
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => h('span', props.text)
  },
  // 如果组件是其他组件的子组件，需为slot指定名称
  slot: 'name-of-slot'
  // 其他特殊顶层属性
  key: 'myKey',
  ref: 'myRef'
}
```

#### 完整示例
有了这些知识，我们现在可以完成我们最开始想实现的组件：
```javascript
var getChildrenTextContent = function (children) {
  return children.map(function (node) {
    return node.children
      ? getChildrenTextContent(node.children)
      : node.text
  }).join('')
}
Vue.component('anchored-heading', {
  render: function (createElement) {
    // create kebabCase id
    var headingId = getChildrenTextContent(this.$slots.default)
      .toLowerCase()
      .replace(/\W+/g, '-')
      .replace(/(^\-|\-$)/g, '')
    return createElement(
      'h' + this.level,
      [
        createElement('a', {
          attrs: {
            name: headingId,
            href: '#' + headingId
          }
        }, this.$slots.default)
      ]
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

#### 约束
**VNodes 必须唯一**
组件树中的所有 VNodes 必须是唯一的。这意味着，下面的 render function 是无效的：
```javascript
render: function (createElement) {
  var myParagraphVNode = createElement('p', 'hi')
  return createElement('div', [
    // 错误-重复的VNodes
    myParagraphVNode, myParagraphVNode
  ])
}
```
如果你真的需要重复很多次的元素/组件，你可以使用工厂函数来实现。例如，下面这个例子 render 函数完美有效地渲染了 20 个重复的段落：
```javascript
render: function (createElement) {
  return createElement('div',
    Array.apply(null, { length: 20 }).map(function () {
      return createElement('p', 'hi')
    })
  )
}
```

### 使用JavaScript代替模板功能

#### `v-if` and `v-for`
由于使用原生的 JavaScript 来实现某些东西很简单，Vue 的 render 函数没有提供专用的 API。比如， template 中的 v-if 和 v-for:
```vue
<ul v-if="items.length">
  <li v-for="item in items">{{ item.name }}</li>
</ul>
<p v-else>No items found.</p>
``` 
这些都会在 render 函数中被 JavaScript 的 if/else 和 map 重写：
```javascript
render: function (createElement) {
  if (this.items.length) {
    return createElement('ul', this.items.map(function (item) {
      return createElement('li', item.name)
    }))
  } else {
    return createElement('p', 'No items found.')
  }
}
```

#### v-model
render函数中没有与v-model相应的api - 你必须自己来实现相应的逻辑:
```javascript
render: function (createElement) {
  var self = this
  return createElement('input', {
    domProps: {
      value: self.value
    },
    on: {
      input: function (event) {
        self.value = event.target.value
      }
    }
  })
}
```

#### 事件&按键修饰符
对于 .capture 和 .once事件修饰符, Vue 提供了相应的前缀可以用于 on:

修饰符  |  前缀
---  |  ---
.capture   |  !
.once |  ~
`.capture.once` or `.once.capture` | ~!

```javascript
on: {
  '!click': this.doThisInCapturingMode,
  '~keyup': this.doThisOnce,
  `~!mouseover`: this.doThisOnceInCapturingMode
}
```

对于其他的修饰符, 前缀不是很重要, 因为你可以直接在事件处理函数中使用事件方法:

修饰符  |  等效句柄
--- | ---
.stop | event.stopPropagation()
.prevent | event.preventDefault()
.self | if(event.target !== event.currentTarget) return
Keys:.enter,.13  | if (event.keyCode !== 13) return (change 13 to another key code for other key modifiers)
Modifiers Keys:.ctrl, .alt, .shift, .meta  | if (!event.ctrlKey) return (change ctrlKey to altKey, shiftKey, or metaKey, respectively)

这里是一个使用所有修饰符的例子:
```javascript
on: {
  keyup: function (event) {
    // 如果触发事件的元素不是事件绑定的元素
    // 则返回
    if (event.target !== event.currentTarget) return
    // 如果按下去的不是enter键或者
    // 没有同时按下shift键
    // 则返回
    if (!event.shiftKey || event.keyCode !== 13) return
    // 阻止 事件冒泡
    event.stopPropagation()
    // 阻止该元素默认的keyup事件
    event.preventDefault()
    // ...
  }
}
```

#### slots
你可以从this.$slots获取VNodes列表中的静态内容:
```javascript
render: function (createElement) {
  // <div><slot></slot></div>
  return createElement('div', this.$slots.default)
}
```

```javascript
render: function (createElement) {
  // <div><slot :text="msg"></slot></div>
  return createElement('div', [
    this.$scopedSlots.default({
      text: this.msg
    })
  ])
}
```
```javascript
render (createElement) {
  return createElement('div', [
    createElement('child', {
      // pass scopedSlots in the data object
      // in the form of { name: props => VNode | Array<VNode> }
      scopedSlots: {
        default: function (props) {
          return createElement('span', props.text)
        }
      }
    })
  ])
}
```

### JSX
如果你写了很多 render 函数，可能会觉得痛苦：
```javascript
createElement(
  'anchored-heading', {
    props: {
      level: 1
    }
  }, [
    createElement('span', 'Hello'),
    ' world!'
  ]
)
```

特别是模板如此简单的情况下：
```vue
<anchored-heading :level="1">
  <span>Hello</span> world!
</anchored-heading>
```
这就是会有一个 Babel plugin 插件，用于在 Vue 中使用 JSX 语法的原因，它可以让我们回到于更接近模板的语法上。
```javascript
import AnchoredHeading from './AnchoredHeading.vue'
new Vue({
  el: '#demo',
  render (h) {
    return (
      <AnchoredHeading level={1}>
        <span>Hello</span> world!
      </AnchoredHeading>
    )
  }
})
```

> 将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 JSX 所要求的，如果在作用域中 h 失去作用， 在应用中会触发报错。

### 函数化组件
之前创建的锚点标题组件是比较简单，没有管理或者监听任何传递给他的状态，也没有生命周期方法。它只是一个接收参数的函数。
在这个例子中，我们标记组件为 functional， 这意味它是无状态（没有 data），无实例（没有 this 上下文）。
一个 函数化组件 就像这样：
```javascript
Vue.component('my-component', {
  functional: true,
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  },
  // Props 可选
  props: {
    // ...
  }
})
```

> 注意：在 <2.3.0 的版本中，如果一个函数式组件想要接受 props，则 props 选项是必须的。在 2.3.0 或以上的版本中，你可以省略 props 选项，所有组件上的属性都会被自动解析为 props。

组件需要的一切都是通过上下文传递，包括：
- props: 提供props 的对象
- children: VNode 子节点的数组
- slots: slots 对象
- data: 传递给组件的 data 对象
- parent: 对父组件的引用
- listeners: (2.3.0+) 一个包含了组件上所注册的 v-on 侦听器的对象。这只是一个指向 data.on 的别名。
- injections: (2.3.0+) 如果使用了 inject 选项, 则该对象包含了应当被注入的属性。
在添加 functional: true 之后，锚点标题组件的 render 函数之间简单更新增加 context 参数，this.$slots.default 更新为 context.children，之后this.level 更新为 context.props.level。
因为函数化组件只是一个函数，所以渲染开销也低很多。在作为包装组件时它们也同样非常有用，比如，当你需要做这些时：
- 程序化地在多个组件中选择一个
- 在将 children, props, data 传递给子组件之前操作它们。
下面是一个依赖传入 props 的值的 smart-list 组件例子，它能代表更多具体的组件：
```javascript
var EmptyList = { /* ... */ }
var TableList = { /* ... */ }
var OrderedList = { /* ... */ }
var UnorderedList = { /* ... */ }
Vue.component('smart-list', {
  functional: true,
  render: function (createElement, context) {
    function appropriateListComponent () {
      var items = context.props.items
      if (items.length === 0)           return EmptyList
      if (typeof items[0] === 'object') return TableList
      if (context.props.isOrdered)      return OrderedList
      return UnorderedList
    }
    return createElement(
      appropriateListComponent(),
      context.data,
      context.children
    )
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    isOrdered: Boolean
  }
})
```

#### slots()和children对比
你可能想知道为什么同时需要 slots() 和 children。slots().default 不是和 children 类似的吗？在一些场景中，是这样，但是如果是函数式组件和下面这样的 children 呢？
```vue
<my-functional-component>
  <p slot="foo">
    first
  </p>
  <p>second</p>
</my-functional-component>
```
对于这个组件，children 会给你两个段落标签，而 slots().default 只会传递第二个匿名段落标签，slots().foo 会传递第一个具名段落标签。同时拥有 children 和 slots() ，因此你可以选择让组件通过 slot() 系统分发或者简单的通过 children 接收，让其他组件去处理。

### 模板编译
你可能有兴趣知道，Vue 的模板实际是编译成了 render 函数。这是一个实现细节，通常不需要关心，但如果你想看看模板的功能是怎样被编译的，你会发现会非常有趣。下面是一个使用 Vue.compile 来实时编译模板字符串的简单 demo：
```vue
<div>
  <h1>I'm a template!</h1>
  <p v-if="message">
    {{ message }}
  </p>
  <p v-else>
    No message.
  </p>
</div>    
```

## 自定义指令
### 简介
除了默认设置的核心指令( v-model 和 v-show ),Vue 也允许注册自定义指令。注意，在 Vue2.0 里面，代码复用的主要形式和抽象是组件——然而，有的情况下,你仍然需要对纯 DOM 元素进行底层操作,这时候就会用到自定义指令。下面这个例子将聚焦一个 input 元素，像这样：

当页面加载时，元素将获得焦点。事实上，你访问后还没点击任何内容，input 就获得了焦点。现在让我们完善这个指令：
```javascript
// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```
也可以注册局部指令，组件中接受一个 directives 的选项：
```javascript
directives: {
  focus: {
    // 指令的定义---
  }
}
```
然后你可以在模板中任何元素上使用新的 v-focus 属性：
```vue
<input v-focus>
```

### 钩子函数
指令定义函数提供了几个钩子函数（可选）：
- bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
- inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
- update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
- componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
- unbind: 只调用一次， 指令与元素解绑时调用。
接下来我们来看一下钩子函数的参数 (包括 el，binding，vnode，oldVnode) 。


### 钩子函数参数
钩子函数被赋予了以下参数：
- el: 指令所绑定的元素，可以用来直接操作 DOM 。
- binding: 一个对象，包含以下属性：
- name: 指令名，不包括 v- 前缀。
- value: 指令的绑定值， 例如： v-my-directive="1 + 1", value 的值是 2。
- oldValue: 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
- expression: 绑定值的字符串形式。 例如 v-my-directive="1 + 1" ， expression 的值是 "1 + 1"。
- arg: 传给指令的参数。例如 v-my-directive:foo， arg 的值是 "foo"。
- modifiers: 一个包含修饰符的对象。 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 { foo: true, bar: true }。
- vnode: Vue 编译生成的虚拟节点，查阅 VNode API 了解更多详情。
- oldVnode: 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

> 除了 el 之外，其它参数都应该是只读的，尽量不要修改他们。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。

一个使用了这些参数的自定义钩子样例：
```vue
<div id="hook-arguments-example" v-demo:hello.a.b="message"></div>
```
```javascript
Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})
new Vue({
  el: '#hook-arguments-example',
  data: {
    message: 'hello!'
  }
})
```

### 函数简写
大多数情况下，我们可能想在 bind 和 update 钩子上做重复动作，并且不想关心其它的钩子函数。可以这样写:
```javascript
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

### 对象字面量
如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法类型的 JavaScript 表达式。
```vue
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```
```javascript
Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
})
```

## 混合
### 基础
混合是一种灵活的分布式复用 Vue 组件的方式。混合对象可以包含任意组件选项。以组件使用混合对象时，所有混合对象的选项将被混入该组件本身的选项。
```javascript
// 定义一个混合对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
// 定义一个使用混合对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})
var component = new Component() // -> "hello from mixin!"
```
### 选项合并
当组件和混合对象含有同名选项时，这些选项将以恰当的方式混合。比如，同名钩子函数将混合为一个数组，因此都将被调用。另外，混合对象的 钩子将在组件自身钩子 之前 调用 ：
```javascript
var mixin = {
  created: function () {
    console.log('混合对象的钩子被调用')
  }
}
new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')
  }
})
// -> "混合对象的钩子被调用"
// -> "组件钩子被调用"
```
值为对象的选项，例如 methods, components 和 directives，将被混合为同一个对象。 两个对象键名冲突时，取组件对象的键值对。
```javascript
var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}
var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})
vm.foo() // -> "foo"
vm.bar() // -> "bar"
vm.conflicting() // -> "from self"
```
注意： Vue.extend() 也使用同样的策略进行合并。

### 全局混合
也可以全局注册混合对象。 注意使用！ 一旦使用全局混合对象，将会影响到 所有 之后创建的 Vue 实例。使用恰当时，可以为自定义对象注入处理逻辑。
```javascript
// 为自定义的选项 'myOption' 注入一个处理器。 
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})
new Vue({
  myOption: 'hello!'
})
// -> "hello!"
```

> 谨慎使用全局混合对象，因为会影响到每个单独创建的 Vue 实例（包括第三方模板）。大多数情况下，只应当应用于自定义选项，就像上面示例一样。 也可以将其用作 Plugins 以避免产生重复应用

### 自定义选项混合策略
自定义选项将使用默认策略，即简单地覆盖已有值。 如果想让自定义选项以自定义逻辑混合，可以向 Vue.config.optionMergeStrategies 添加一个函数：
```javascript
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // return mergedVal
}
```
对于大多数对象选项，可以使用 methods 的合并策略:
```javascript
var strategies = Vue.config.optionMergeStrategies
strategies.myOption = strategies.methods
```
更多高级的例子可以在 Vuex 1.x的混合策略里找到:
```javascript
const merge = Vue.config.optionMergeStrategies.computed
Vue.config.optionMergeStrategies.vuex = function (toVal, fromVal) {
  if (!toVal) return fromVal
  if (!fromVal) return toVal
  return {
    getters: merge(toVal.getters, fromVal.getters),
    state: merge(toVal.state, fromVal.state),
    actions: merge(toVal.actions, fromVal.actions)
  }
}
```

## 插件
### 开发插件
插件通常会为Vue添加全局功能。插件的范围没有限制——一般有下面几种：
1. 添加全局方法或者属性，如: vue-element
2. 添加全局资源：指令/过滤器/过渡等，如 vue-touch
3. 通过全局 mixin方法添加一些组件选项，如: vuex
4. 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 vue-router

Vue.js 的插件应当有一个公开方法 install 。这个方法的第一个参数是 Vue 构造器 , 第二个参数是一个可选的选项对象:
```javascript
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }
  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })
  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })
  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (options) {
    // 逻辑...
  }
}
```

### 使用插件
通过全局方法 Vue.use() 使用插件:
```javascript
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)
```
也可以传入一个选项对象：
```javascript
Vue.use(MyPlugin, { someOption: true })
```
Vue.use 会自动阻止注册相同插件多次，届时只会注册一次该插件。
一些插件，如 vue-router 如果 Vue 是全局变量则自动调用 Vue.use() 。不过在模块环境中应当始终显式调用 Vue.use() :
```javascript
// 通过 Browserify 或 Webpack 使用 CommonJS 兼容模块
var Vue = require('vue')
var VueRouter = require('vue-router')
// 不要忘了调用此方法
Vue.use(VueRouter)
```
[awesome-vue](https://github.com/vuejs/awesome-vue#libraries--plugins)

## 单文件组件
### 介绍
在很多Vue项目中，我们使用 Vue.component 来定义全局组件，紧接着用 new Vue({ el: '#container '}) 在每个页面内指定一个容器元素。
这种方式在很多中小规模的项目中运作的很好，在这些项目里 JavaScript 只被用来加强特定的视图。但当在更复杂的项目中，或者你的前端完全由 JavaScript 驱动的时候，下面这些缺点将变得非常明显：
- 全局定义(Global definitions) 强制要求每个 component 中的命名不得重复
- 字符串模板(String templates) 缺乏语法高亮，在 HTML 有多行的时候，需要用到丑陋的 \
- 不支持CSS(No CSS support) 意味着当 HTML 和 JavaScript 组件化时，CSS 明显被遗漏
- 没有构建步骤(No build step) 限制只能使用 HTML 和 ES5 JavaScript, 而不能使用预处理器，如 Pug (formerly Jade) 和 Babel
文件扩展名为 .vue 的 single-file components(单文件组件) 为以上所有问题提供了解决方法，并且还可以使用 Webpack 或 Browserify 等构建工具。
这是一个文件名为 Hello.vue 的简单实例：
```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

```
### 起步
#### 针对刚接触JavaScript模块开发系统的用户

有了 .vue 组件，我们就进入了高级 JavaScript 应用领域。如果你没有准备好的话，意味着还需要学会使用一些附加的工具：
- Node Package Manager (NPM): 阅读 [Getting Started guide](https://docs.npmjs.com/getting-started/what-is-npm) 直到 10: Uninstalling global packages章节.
- Modern JavaScript with ES2015/16: 阅读 Babel 的 [Learn ES2015 guide](https://babeljs.io/docs/learn-es2015/). 你不需要立刻记住每一个方法，但是你可以保留这个页面以便后期参考。

在你花一些时日了解这些资源之后，我们建议你参考 [webpack-simple](https://github.com/vuejs-templates/webpack-simple) 。只要遵循指示，你就能很快的运行一个用到 .vue 组件，ES2015 和 热重载( hot-reloading ) 的Vue项目!

这个模板使用 [Webpack](https://webpack.github.io/)，一个能将多个模块打包成最终应用的模块打包工具。 [这个视频](https://www.youtube.com/watch?v=WQue1AN93YU) 介绍了Webpack的更多相关信息。 学习了这些基础知识后， 你可能想看看 [这个在 Egghead.io上的 高级 Webpack 课程](https://egghead.io/courses/using-webpack-for-production-javascript-applications).

在 Webpack中，每个模块被打包到 bundle 之前都由一个相应的 “loader” 来转换，Vue 也提供 [vue-loader](https://github.com/vuejs/vue-loader) 插件来执行 .vue 单文件组件 的转换. 这个 [webpack-simple](https://github.com/vuejs-templates/webpack-simple) 模板已经为你准备好了所有的东西，但是如果你想了解更多关于 .vue 组件和 Webpack 如何一起运转的信息，你可以阅读 [vue-loader](https://vue-loader.vuejs.org/) 的文档。

#### 针对高级用户
<p>无论你更钟情 Webpack 或是 Browserify，我们为简单的和更复杂的项目都提供了一些文档模板。我们建议浏览 <a href="https://github.com/vuejs-templates" target="_blank" rel="external">github.com/vuejs-templates</a>，找到你需要的部分，然后参考 README 中的说明，使用 <a href="https://github.com/vuejs/vue-cli" target="_blank" rel="external">vue-cli</a> 工具生成新的项目。</p>
<p>模板中使用 <a href="https://webpack.github.io/" target="_blank" rel="external">Webpack</a> ，一个模块加载器加载多个模块然后构建成最终应用。为了进一步了解 Webpack, 可以看 <a href="https://www.youtube.com/watch?v=WQue1AN93YU" target="_blank" rel="external">官方介绍视频</a>。如果你有基础，可以看 <a href="https://egghead.io/courses/using-webpack-for-production-javascript-applications" target="_blank" rel="external">在 Egghead.io 上的 Webpack 进阶教程</a>。</p>

## 生产环境部署
### 删除警告
为了减少文件大小，Vue 精简独立版本已经删除了所有警告，但是当你使用 Webpack 或 Browserify 等工具时，你需要一些额外的配置实现这点。

#### Webpack
使用 Webpack 的 DefinePlugin 来指定生产环境，以便在压缩时可以让 UglifyJS 自动删除代码块内的警告语句。例如配置：
```javascript
var webpack = require('webpack')
module.exports = {
  // ...
  plugins: [
    // ...
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
```

#### Browserify
- 运行打包命令，设置 NODE_ENV 为 "production"。等于告诉 vueify 避免引入热重载和开发相关代码。
- 使用一个全局 envify 转换你的 bundle 文件。这可以精简掉包含在 Vue 源码中所有环境变量条件相关代码块内的警告语句。例如：
```shell
NODE_ENV=production browserify -g envify -e main.js | uglifyjs -c -m > build.js
```
- 使用 vueify 中包含的 extract-css 插件，提取样式到单独的css文件。
```shell
NODE_ENV=production browserify -g envify -p [ vueify/plugins/extract-css -o build.css ] -e main.js | uglifyjs -c -m > build.js
```
### 跟踪运行时错误
如果在组件渲染时出现运行错误，错误将会被传递至全局 Vue.config.errorHandler 配置函数（如果已设置）。利用这个钩子函数和错误跟踪服务（如 Sentry，它为 Vue 提供官方集成），可能是个不错的主意。

### 提取CSS
使用单文件组件时，<style> 标签在开发运行过程中会被动态实时注入。在生产环境中，你可能需要从所有组件中提取样式到单独的 CSS 文件中。有关如何实现的详细信息，请查阅 vue-loader 和 vueify 相应文档。
vue-cli 已经配置好了官方的 webpack 模板。


## 路由
### 官方路由
对于大多数单页面应用，都推荐使用官方支持的[vue-router](https://github.com/vuejs/vue-router)库。更多细节可以看[vue-router文档](http://vuejs.github.io/vue-router/)。

### 从零开始简单的路由
如果只需要非常简单的路由而不需要引入整个路由库，可以动态渲染一个页面级的组件像这样：
```javascript
const NotFound = { template: '<p>Page not found</p>' }
const Home = { template: '<p>home page</p>' }
const About = { template: '<p>about page</p>' }
const routes = {
  '/': Home,
  '/about': About
}
new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
```
结合HTML5 History API，你可以建立一个非常基本但功能齐全的客户端路由器。

### 整合第三方路由
<p>如果有非常喜欢的第三方路由，如<a href="https://github.com/visionmedia/page.js" target="_blank" rel="external">Page.js</a>或者 <a href="https://github.com/flatiron/director" target="_blank" rel="external">Director</a>, 整合<a href="https://github.com/chrisvfritz/vue-2.0-simple-routing-example/compare/master...pagejs" target="_blank" rel="external">很简单</a>。 这有个用了Page.js的<a href="https://github.com/chrisvfritz/vue-2.0-simple-routing-example/tree/pagejs" target="_blank" rel="external">复杂示例</a> 。</p>

## 状态管理
### 类Flux状态管理的官方实现
由于多个状态分散的跨越在许多组件和交互间各个角落，大型应用复杂度也经常逐渐增长。为了解决这个问题，Vue 提供 vuex： 我们有受到 Elm 启发的状态管理库。vuex 甚至集成到 vue-devtools，无需配置即可访问时光旅行。

### 简单状态管理起步使用
经常被忽略的是，Vue 应用中原始 数据 对象的实际来源 - 当访问数据对象时，一个 Vue 实例只是简单的代理访问。所以，如果你有一处需要被多个实例间共享的状态，可以简单地通过维护一份数据来实现共享：
```javascript
const sourceOfTruth = {}
const vmA = new Vue({
  data: sourceOfTruth
})
const vmB = new Vue({
  data: sourceOfTruth
})
```
现在当 sourceOfTruth 发生变化，vmA 和 vmB 都将自动的更新引用它们的视图。子组件们的每个实例也会通过 this.$root.$data 去访问。现在我们有了唯一的实际来源，但是，调试将会变为噩梦。任何时间，我们应用中的任何部分，在任何数据改变后，都不会留下变更过的记录。

为了解决这个问题，我们采用一个简单的 store 模式：
```javascript
var store = {
  debug: true,
  state: {
    message: 'Hello!'
  },
  setMessageAction (newValue) {
    this.debug && console.log('setMessageAction triggered with', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    this.debug && console.log('clearMessageAction triggered')
    this.state.message = 'clearMessageAction triggered'
  }
}
```

需要注意，所有 store 中 state 的改变，都放置在 store 自身的 action 中去管理。这种集中式状态管理能够被更容易地理解哪种类型的 mutation 将会发生，以及它们是如何被触发。当错误出现时，我们现在也会有一个 log 记录 bug 之前发生了什么。
此外，每个实例/组件仍然可以拥有和管理自己的私有状态：
```javascript
var vmA = new Vue({
  data: {
    privateState: {},
    sharedState: store.state
  }
})
var vmB = new Vue({
  data: {
    privateState: {},
    sharedState: store.state
  }
})
```
![](https://cn.vuejs.org/images/state.png)

> 重要的是，注意你不应该在 action 中 替换原始的状态对象 - 组件和 store 需要引用同一个共享对象，mutation 才能够被观察

接着我们继续延伸约定，组件不允许直接修改属于 store 实例的 state，而应执行 action 来分发 (dispatch) 事件通知 store 去改变，我们最终达成了 Flux 架构。这样约定的好处是，我们能够记录所有 store 中发生的 state 改变，同时实现能做到记录变更 (mutation) 、保存状态快照、历史回滚/时光旅行的先进的调试工具。

## 单元测试
### 配置和工具
任何兼容基于模块的构建系统都可以正常使用，但如果你需要一个具体的建议，可以使用 Karma 进行自动化测试。它有很多社区版的插件，包括对 Webpack 和 Browserify 的支持。更多详细的安装步骤，请参考各项目的安装文档，通过这些 Karma 配置的例子可以快速帮助你上手（Webpack 配置，Browserify 配置）。

### 简单的断言
在测试的代码结构方面，你不必为了可测试在你的组件中做任何特殊的操作。只要导出原始设置就可以了：
```vue
<template>
  <span>{{ message }}</span>
</template>
<script>
  export default {
    data () {
      return {
        message: 'hello!'
      }
    },
    created () {
      this.message = 'bye!'
    }
  }
</script>
```
当测试的组件时，所要做的就是导入对象和 Vue 然后使用许多常见的断言：
```javascript
// 导入 Vue.js 和组件，进行测试
import Vue from 'vue'
import MyComponent from 'path/to/MyComponent.vue'
// 这里是一些 Jasmine 2.0 的测试，你也可以使用你喜欢的任何断言库或测试工具。
describe('MyComponent', () => {
  // 检查原始组件选项
  it('has a created hook', () => {
    expect(typeof MyComponent.created).toBe('function')
  })
  // 评估原始组件选项中的函数的结果
  it('sets the correct default data', () => {
    expect(typeof MyComponent.data).toBe('function')
    const defaultData = MyComponent.data()
    expect(defaultData.message).toBe('hello!')
  })
  // 检查mount中的组件实例
  it('correctly sets the message when created', () => {
    const vm = new Vue(MyComponent).$mount()
    expect(vm.message).toBe('bye!')
  })
  // 创建一个实例并检查渲染输出
  it('renders the correct message', () => {
    const Ctor = Vue.extend(MyComponent)
    const vm = new Ctor().$mount()
    expect(vm.$el.textContent).toBe('bye!')
  })
})
```

### 编写可被测试的组件
很多组件的渲染输出由它的 props 决定。事实上，如果一个组件的渲染输出完全取决于它的 props，那么它会让测试变得简单，就好像断言不同参数的纯函数的返回值。看下面这个例子:
```vue
<template>
  <p>{{ msg }}</p>
</template>
<script>
  export default {
    props: ['msg']
  }
</script>
```
你可以在不同的 props 中，通过 propsData 选项断言它的渲染输出:
```javascript
import Vue from 'vue'
import MyComponent from './MyComponent.vue'
// 挂载元素并返回已渲染的文本的工具函数 
function getRenderedText (Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({ propsData }).$mount()
  return vm.$el.textContent
}
describe('MyComponent', () => {
  it('render correctly with different props', () => {
    expect(getRenderedText(MyComponent, {
      msg: 'Hello'
    })).toBe('Hello')
    expect(getRenderedText(MyComponent, {
      msg: 'Bye'
    })).toBe('Bye')
  })
})
```

### 断言异步更新
由于 Vue 进行 异步更新DOM 的情况，一些依赖DOM更新结果的断言必须在 Vue.nextTick 回调中进行：
```javascript
// 在状态更新后检查生成的 HTML
it('updates the rendered message when vm.message updates', done => {
  const vm = new Vue(MyComponent).$mount()
  vm.message = 'foo'
  // 在状态改变后和断言 DOM 更新前等待一刻
  Vue.nextTick(() => {
    expect(vm.$el.textContent).toBe('foo')
    done()
  })
})
```


## 服务端渲染
### SSR完全指南
在 2.3 发布后我们发布了一份完整的构建 Vue 服务端渲染应用的指南。这份指南非常深入，适合已经熟悉 Vue, webpack 和 Node.js 开发的开发者阅读。请移步 [ssr.vuejs.org](https://ssr.vuejs.org/)。（目前只有英文版，社区正在进行中文版的翻译）

### Nuxt.js
从头搭建一个服务端渲染的应用是相当复杂的。幸运的是，我们有一个优秀的社区项目 [Nuxt.js](https://nuxtjs.org/) 让这一切变得非常简单。Nuxt 是一个基于 Vue 生态的更高层的框架，为开发服务端渲染的 Vue 应用提供了极其便利的开发体验。更酷的是，你甚至可以用它来做为静态站生成器。推荐尝试。


