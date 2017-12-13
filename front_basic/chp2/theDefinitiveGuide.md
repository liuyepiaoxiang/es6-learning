[TOC]

# CSS权威指南

## CSS和文档
### 元素
元素是文档结构的基础。
#### 替换元素和非替换元素
##### 替换元素
替换元素在指用来替换元素内容的部分并非由文档内容直接表示。如`<img>`标签

##### 非替换元素
大多数HTML和XHTML元素都是非替换内容。

#### 元素显示角色
##### 块级元素
块级元素生成一个元素框，（默认地）它会填充其父元素的内容区，旁边不能有其他元素。
##### 行内元素
行内元素在一个文本行内生成元素框，而不会打断这行文本。

#### 结合CSS和XHTML
##### link标记
###### 属性
###### 候选样式表

##### style元素
##### @import指令
##### 具体的样式规则
##### CSS注释
##### 内联样式


---

## 选择器

### 基本规则
#### 规则结构
每个规则都有两个基本部分：选择器（selector）和声明块（declaration block）。
声明块由一个或多个声明（declaration）组成，每个声明则是一个属性-值对（property-value）。
每个样式表由一系列规则组成。

#### 元素选择器
最常见的选择器往往是HTML元素，文档的元素就是最基本的选择器。

#### 声明和关键字


### 分组
#### 选择器分组
如果希望两个选择器都应用某个规则，将选择器放在规则左边，并用逗号分隔。

##### 通配选择器
星号（*）为通配选择器。

#### 声明分组

#### 结合选择器和声明的分组

### 类选择器和ID选择器
#### 类选择器

#### 多类选择器
```css
.warning.urgent{background: silver;}
```
#### ID选择器

### 属性选择器
#### 简单属性选择
````css
h1[class]{color: silver;}
````
#### 根据具体属性值选择
```css
a[href="http://mysite.com"]{font-weight: bold;}
```

#### 根据部分属性值选择
```css
p[class~="warning"]{ font-weight: bold;}
```

子串匹配属性选择器

类型 | 描述
--- | ---
[foo^="bar] | 选择foo属性值以"bar"开头的所有元素
[foo$="bar] | 选择foo属性值以"bar"结尾的所有元素
[foo*="bar] | 选择foo属性值中包含子串"bar"的所有元素

#### 特定属性选择类型

### 使用文档结构
#### 理解父子关系
#### 后代选择器
```css
h1 em {color:gray;}
```

#### 选择子元素
在某些情况下，可能并不想选择一个任意的后代元素，而是希望缩小范围，只选择另一个元素的子元素。
```css
h1 > p{color: red;}
```

#### 选择相邻兄弟元素
```css
h1 + p {margin-top: 0;}
```
### 伪类和伪元素
#### 伪类选择器

##### 链接伪类

伪类名 | 描述
--- | ---
:link | 指示作为超链接（即有一个href属性）并指向一个未访问地址的所有锚。之一，有些浏览器可能会不正确地将:link解释为指向任何超链接，包括已访问和未访问的超链接
:visited | 指示作为已访问地址超链接的所有锚

##### 动态伪类

伪类名 | 描述
--- | ---
:focus | 指示当前拥有输入焦点的元素，也就是说，可以接受键盘输入或者能以某种方式激活的元素
:hover | 指示鼠标指针停留在哪个元素上
:active | 指示被用户输入激活的元素
##### 动态样式的实际问题

##### 选择第一个子元素
```css
p:first-child{ font-weight: bold;}
```

##### 根据语言选择
```css
*:lang(fr) {font-style: italic}
```
##### 结合伪类
```css
a:link:hover {color: red;}
```

####伪元素选择器
##### 设置首字母样式
```css
p:first-letter {color: red;}
```
##### 设置第一行的样式
```css
p:first-line {color: purple;}
```
##### :first-letter 和:first-line的限制

伪元素所允许的属性

:first-letter | :first-line
--- | ---
所有font属性 | 所有font属性
color | color
所有background属性 | 所有background属性
所有margin属性 | word-spacing
所有padding属性 | letter-spacing
所有border属性 | text-decoration
text-decoration | vertical-align
vertical-align(如果float设置为none) | text-transform 
text-transform | line-height
line-height | clear
float | text-shadow
letter-spacing | --
word-spacing | --
clear  | --
text-shadow | --

##### 设置之前和之后元素的样式

## 结构和层叠
### 特殊性
### 继承
### 层叠

## 值和单位
### 数字
### 百分数
### 颜色
### 长度单位
### URL
### CSS2单位


## 字体
### 字体系列
### 字体加粗
### 字体大小
### 风格和变形
### 拉伸和调整字体
### font属性
### 字体匹配

## 文本属性
### 缩进和水平对齐
### 垂直对齐
### 字间隔和字母间隔
### 文本转换
### 文本修饰
### 文本阴影

## 基本视觉格式化

### 基本框
### 块级元素
### 行内元素
### 改变元素显示

## 内边距、边框和外边距

### 基本元素框
### 外边距
### 边框
### 内边距

## 颜色和背景
### 颜色
### 前景色
### 背景

## 浮动和定位
### 浮动
### 定位

## 表布局
### 表格式化
### 表单元格边框
### 表大小

## 列表与生成内容
### 列表
### 生成内容

## 用户界面样式
### 系统字体和颜色
### 光标
### 轮廓

## 非屏幕媒体
