[TOC]

# 基础
## CSS内容
- CSS 语法（http://w3.org/TR/css-syntax-3）
- CSS 层叠与继承（http://w3.org/TR/css-cascade-3）
- CSS 颜色（http://w3.org/TR/css3-color）
- 选择符（http://w3.org/TR/selectors）
- CSS 背景与边框（http://w3.org/TR/css3-background）
- CSS 值与单位（http://w3.org/TR/css-values-3）
- CSS 文本排版（http://w3.org/TR/css-text-3）
- CSS 文本装饰效果（http://w3.org/TR/css-text-decor-3）
- CSS 字体（http://w3.org/TR/css3-fonts）
- CSS 基本 UI 特性（http://w3.org/TR/css3-ui）
- CSS 变形（http://w3.org/TR/css-transforms-1）
- 图像混合效果（http://w3.org/TR/compositing-1）
- 滤镜效果（http://w3.org/TR/filter-effects-1）
- CSS 遮罩（http://w3.org/TR/css-masking-1）
- CSS 伸缩盒布局（http://w3.org/TR/css-flexbox-1）
- CSS 网格布局（http://w3.org/TR/css-grid-1）

## CSS编码技巧
### 尽量减少代码重复
代码可维护性的最大要素是尽量减少改动时要编辑的地方。
> 看了一下书中的例子，一步一步的优化CSS代码，但是如何从最开始就做好这些规划呢？
> 从目前的角度来看，有这么几种办法。一、建立常用的代码库，比如bootstrap等用的方法，将常用的尺寸、颜色固定下来；
> 二、考虑到自适应的问题，尽量采用less和sass等方式来写CSS；三、颜色方面可以考虑用主题色，其他颜色尽量在主题色附近进行加减

DRY: Don't repeat yourself
当某些值相互依赖时，应该把他们的相互关系用代码表达出来

1. 代码易维护 vs. 代码量少
代码易维护和代码量少不可兼得

2. currentColor
3. 继承
inherit可以用在任何CSS属性中，而且总是绑定到父元素的计算值（对伪元素来说，则会取生成该伪元素的宿主元素）

### 相信你的眼睛，而不是数字
视觉偏差普遍存在，比如完美垂直居中的物体，看上去并不居中。
圆形的字形与矩形字形相比，需要稍微放大一些。

### 关于响应式网页设计
每个媒体查询都会增加成本。
媒体查询的断点不应该由具体的设备来决定。
减少不必要的媒体查询的方法：
- 使用百分比来取代固定长度。如果实在做不到这一点，也应该尝试使用与视口相关的单位（vw、vh、vmin和vmax),他们的值解析为视口宽度或高度的百分比。
- 当你需要在较大分辨率下得到固定宽度时，使用max-width而不是width，因为它可以适应较小的分辨率，而无需使用媒体查询。
- 不要忘记为替换元素（比如img、object、video、iframe等）设置一个max-width，值为100%
- 加入背景图片需要完整地铺满一个容器，不管容器的尺寸如何变化，background-size：cover这个属性都可以做到。但是我们也要时刻牢记——带宽并不是无限的，因此在移动网页中通过CSS把一张大图缩小显示往往是不太明智的
- 当图片（或其他元素）以行列式进行布局时，让视口的宽度来决定列的数量。弹性盒布局（即Flexbox）或者display:inline-block加上常规的文本折行行为，都可以实现这一点。
- 在使用多列文本时，指定column-width（列宽）而不是指定column-count（列数），这样它就可以在较小的屏幕上自动显示为单列布局。

我们的思路是尽最大努力实现弹性可伸缩的布局，并在媒体查询的各个断点区间内指定相应的尺寸。

### 合理使用简写
```css
background: rebeccapurple;
background-color: rebeccapurple;
```
上述两行代码并不等价。不要害怕使用简写属性。合理使用简写是一种良好的防卫性编码方式，可以抵御未来的风险。
如果我们要明确地去覆盖某个具体的展开式属性并保留其他相关样式，那就需要用展开式属性。

### 使用预处理器
Stylus（http://stylus-lang.com/）、 Sass（http://sasslang.com/） 或 LESS（http://lesscss.org/） 这样的 CSS 预处理器。
如果使用得当，它们在大型项目中可以让代码更加灵活。
- CSS的文件体积和复杂度可能会失控
- 调试难度会增加
- 预处理器在开发过程中引入了一定程度的延时
- 每次抽象都必然带来更高的学习成本
- 抽象泄漏法则：所有重大的抽象机制在某种程度上都存在泄漏的情况

很多预处理器的特性都以各种方式融入到原生的CSS中
- CSS自定义属性暨层叠式变量（http://w3.org/TR/css-variables-1）
- CSS值与单位中的calc()函数，不仅在处理运算时非常强大，而且已经得到了广泛的支持。
- CSS颜色(http://dev.w3.org/csswg/css-color)引入的color()函数会提供颜色运算方法。

# 背景和边框
## 半透明边框
背景会默认占据边框的范围。
background-clip初始值为border-box，意味着背景会被元素的border box裁切掉。如果不希望背景侵入边框所在的范围，我们要做的就是把它的值设为padding-box

## 多重边框
box-shadow支持逗号分隔语法，可以创建任意数量的投影。

# 形状


# 视觉效果


# 字体排版


# 用户体验


# 结构与布局


# 过渡与动画
