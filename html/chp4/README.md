# CSS
[参考](http://www.w3school.com.cn/css/index.asp)
## 选择器
### 派生选择器
在 CSS1 中，通过这种方式来应用规则的选择器被称为上下文选择器 (contextual selectors)，这是由于它们依赖于上下文关系来应用或者避免某项规则。在 CSS2 中，它们称为派生选择器，但是无论你如何称呼它们，它们的作用都是相同的。
派生选择器允许你根据文档的上下文关系来确定某个标签的样式。通过合理地使用派生选择器，我们可以使 HTML 代码变得更加整洁。
比方说，你希望列表中的 strong 元素变为斜体字，而不是通常的粗体字，可以这样定义一个派生选择器：
```css
li strong {
    font-style: italic;
    font-weight: normal;
  }
```
### id选择器
id 选择器可以为标有特定 id 的 HTML 元素指定特定的样式。
id 选择器以 "#" 来定义。
### 类选择器
在 CSS 中，类选择器以一个点号显示。
### 属性选择器
对带有指定属性的 HTML 元素设置样式。
可以为拥有指定属性的 HTML 元素设置样式，而不仅限于 class 和 id 属性。
1. 属性选择器：
```css
[title]
{
color:red;
}
```
2. 属性和值选择器:
```css
[title=W3School]
{
border:5px solid blue;
}
```
3. 属性和值选择器 - 多个值\
下面的例子为包含指定值的 title 属性的所有元素设置样式。适用于由空格分隔的属性值：
```css
[title~=hello] { color:red; }
```
4. CSS选择器参考手册

选择器 | 描述
--- | ---
[attribute] | 用于描选取带有指定属性的元素。
[attribute=value] | 用于选取带有指定属性和值的元素。
[attribute~=value] | 用于选取属性值中包含指定词汇的元素。
[attribute&#124;=value] | 用于选取带有以指定值开头的属性值的元素，该值必须是整个单词。
[attribute^=value] | 匹配属性值以指定值开头的每个元素。
[attribute$=value] | 匹配属性值以指定值结尾的每个元素。
[attribute*=value] | 匹配属性值中包含指定值的每个元素。

----
## 样式
### 背景
CSS 允许应用纯色作为背景，也允许使用背景图像创建相当复杂的效果。
CSS 在这方面的能力远远在 HTML 之上。
#### 背景色
可以使用 background-color 属性为元素设置背景色。这个属性接受任何合法的颜色值。\
background-color 不能继承，其默认值是 transparent。transparent 有“透明”之意。也就是说，如果一个元素没有指定背景色，那么背景就是透明的，这样其祖先元素的背景才能可见。
#### 背景图像
要把图像放入背景，需要使用 background-image 属性。background-image 属性的默认值是 none，表示背景上没有放置任何图像。\
#### 背景重复
如果需要在页面上对背景图像进行平铺，可以使用 background-repeat 属性。
属性值 repeat 导致图像在水平垂直方向上都平铺，就像以往背景图像的通常做法一样。repeat-x 和 repeat-y 分别导致图像只在水平或垂直方向上重复，no-repeat 则不允许图像在任何方向上平铺。
#### 背景定位
可以利用 background-position 属性改变图像在背景中的位置。
1. 关键字
图像放置关键字最容易理解，其作用如其名称所表明的。例如，top right 使图像放置在元素内边距区的右上角。
根据规范，位置关键字可以按任何顺序出现，只要保证不超过两个关键字 - 一个对应水平方向，另一个对应垂直方向。
如果只出现一个关键字，则认为另一个关键字是 center。

单一关键字 | 等价的关键字
--- | ---
center | center center
top | top center 或center top
bottom | bottom center 或center bottom
right | right center 或center right
left | left center 或center left

2. 百分数值
百分数值的表现方式更为复杂。假设你希望用百分数值将图像在其元素中居中。\
这会导致图像适当放置，其中心与其元素的中心对齐。换句话说，百分数值同时应用于元素和图像。也就是说，图像中描述为 50% 50% 的点（中心点）与元素中描述为 50% 50% 的点（中心点）对齐。
如果图像位于 0% 0%，其左上角将放在元素内边距区的左上角。如果图像位置是 100% 100%，会使图像的右下角放在右边距的右下角。
因此，如果你想把一个图像放在水平方向 2/3、垂直方向 1/3 处，可以这样声明：
```css
body
  { 
    background-image:url('');
    background-repeat:no-repeat;
    background-position:66% 33%;
  }
```
3. 长度值
长度值解释的是元素内边距区左上角的偏移。偏移点是图像的左上角。
注意，这一点与百分数值不同，因为偏移只是从一个左上角到另一个左上角。也就是说，图像的左上角与 background-position 声明中的指定的点对齐。

#### 背景关联
如果文档比较长，那么当文档向下滚动时，背景图像也会随之滚动。当文档滚动到超过图像的位置时，图像就会消失。
您可以通过 background-attachment 属性防止这种滚动。通过这个属性，可以声明图像相对于可视区是固定的（fixed），因此不会受到滚动的影响。

#### CSS背景属性
属性 | 描述
--- | ---
background | 简写属性，作用是将背景属性设置在一个声明中
background-attachment | 背景图像是否固定或者随着页面的其余部分滚动
background-color | 设置元素的背景颜色
background-image | 把图像设置为背景
background-position | 设置背景图像的起始位置
background-repeat | 设置背景图像是否及如何重复

### 文本
CSS 文本属性可定义文本的外观。
通过文本属性，您可以改变文本的颜色、字符间距，对齐文本，装饰文本，对文本进行缩进，等等。
#### 缩进文本
把 Web 页面上的段落的第一行缩进，这是一种最常用的文本格式化效果。
CSS 提供了 text-indent 属性，该属性可以方便地实现文本缩进。
通过使用 text-indent 属性，所有元素的第一行都可以缩进一个给定的长度，甚至该长度可以是负值。
> 一般来说，可以为所有块级元素应用 text-indent，但无法将该属性应用于行内元素，图像之类的替换元素上也无法应用 text-indent 属性。不过，如果一个块级元素（比如段落）的首行中有一个图像，它会随该行的其余文本移动。
1. 使用负值
text-indent 还可以设置为负值。利用这种技术，可以实现很多有趣的效果，比如“悬挂缩进”，即第一行悬挂在元素中余下部分的左边\
不过在为 text-indent 设置负值时要当心，如果对一个段落设置了负值，那么首行的某些文本可能会超出浏览器窗口的左边界。为了避免出现这种显示问题，建议针对负缩进再设置一个外边距或一些内边距：
2. 使用百分比值
text-indent 可以使用所有长度单位，包括百分比值。
百分数要相对于缩进元素父元素的宽度。
3. 继承
text-indent 属性可以继承。

#### 水平对齐
text-align 是一个基本的属性，它会影响一个元素中的文本行互相之间的对齐方式。它的前 3 个值相当直接，不过第 4 个和第 5 个则略有些复杂。
值 left、right 和 center 会导致元素中的文本分别左对齐、右对齐和居中。
西方语言都是从左向右读，所有 text-align 的默认值是 left。文本在左边界对齐，右边界呈锯齿状（称为“从左到右”文本）。对于希伯来语和阿拉伯语之类的的语言，text-align 则默认为 right，因为这些语言从右向左读。不出所料，center 会使每个文本行在元素中居中。

1. text-align:center 与 <CENTER>
您可能会认为 text-align:center 与 <CENTER> 元素的作用一样，但实际上二者大不相同。
<CENTER> 不仅影响文本，还会把整个元素居中。text-align 不会控制元素的对齐，而只影响内部内容。元素本身不会从一段移到另一端，只是其中的文本受影响。
2. justify
最后一个水平对齐属性是 justify。
在两端对齐文本中，文本行的左右两端都放在父元素的内边界上。然后，调整单词和字母间的间隔，使各行的长度恰好相等。您也许已经注意到了，两端对齐文本在打印领域很常见。

#### 字间隔
word-spacing 属性可以改变字（单词）之间的标准间隔。其默认值 normal 与设置值为 0 是一样的。
word-spacing 属性接受一个正长度值或负长度值。如果提供一个正长度值，那么字之间的间隔就会增加。为 word-spacing 设置一个负值，会把它拉近：

#### 字母间隔
letter-spacing 属性与 word-spacing 的区别在于，字母间隔修改的是字符或字母之间的间隔。
与 word-spacing 属性一样，letter-spacing 属性的可取值包括所有长度。默认关键字是 normal（这与 letter-spacing:0 相同）。输入的长度值会使字母之间的间隔增加或减少指定的量：
#### 字符转换
text-transform 属性处理文本的大小写。这个属性有 4 个值：
- none
- uppercase
- lowercase
- capitalize
默认值 none 对文本不做任何改动，将使用源文档中的原有大小写。顾名思义，uppercase 和 lowercase 将文本转换为全大写和全小写字符。最后，capitalize 只对每个单词的首字母大写。
作为一个属性，text-transform 可能无关紧要，不过如果您突然决定把所有 h1 元素变为大写，这个属性就很有用。不必单独地修改所有 h1 元素的内容，只需使用 text-transform 为你完成这个修改：
#### 文本装饰
text-decoration 有 5 个值：
- none
- underline
- overline
- line-through
- blink
不出所料，underline 会对元素加下划线，就像 HTML 中的 U 元素一样。overline 的作用恰好相反，会在文本的顶端画一个上划线。值 line-through 则在文本中间画一个贯穿线，等价于 HTML 中的 S 和 strike 元素。blink 会让文本闪烁，类似于 Netscape 支持的颇招非议的 blink 标记。

#### 处理空白符
white-space 属性会影响到用户代理对源文档中的空格、换行和 tab 字符的处理。
通过使用该属性，可以影响浏览器处理字之间和文本行之间的空白符的方式。从某种程度上讲，默认的 XHTML 处理已经完成了空白符处理：它会把所有空白符合并为一个空格。所以给定以下标记，它在 Web 浏览器中显示时，各个字之间只会显示一个空格，同时忽略元素中的换行
1. 值pre
不过，如果将 white-space 设置为 pre，受这个属性影响的元素中，空白符的处理就有所不同，其行为就像 XHTML 的 pre 元素一样；空白符不会被忽略。
如果 white-space 属性的值为 pre，浏览器将会注意额外的空格，甚至回车。在这个方面，而且仅在这个方面，任何元素都可以相当于一个 pre 元素。
2. 值nowrap
与之相对的值是 nowrap，它会防止元素中的文本换行，除非使用了一个 br 元素。在 CSS 中使用 nowrap 非常类似于 HTML 4 中用 <td nowrap> 将一个表单元格设置为不能换行，不过 white-space 值可以应用到任何元素。
3. 值pre-wrap和pre-line
如果元素的 white-space 设置为 pre-wrap，那么该元素中的文本会保留空白符序列，但是文本行会正常地换行。如果设置为这个值，源文本中的行分隔符以及生成的行分隔符也会保留。pre-line 与 pre-wrap 相反，会像正常文本中一样合并空白符序列，但保留换行符。

值 | 空白符 | 换行符 | 自动换行
--- | --- | --- | ---
per-line | 合并 | 保留 | 允许
normal | 合并 | 忽略 | 允许
nowrap | 合并 | 忽略 | 不允许
pre | 保留 | 保留 | 不允许
pre-wrap | 保留 | 保留 | 允许

#### 文本方向
direction 属性影响块级元素中文本的书写方向、表中列布局的方向、内容水平填充其元素框的方向、以及两端对齐元素中最后一行的位置。
> 对于行内元素，只有当 unicode-bidi 属性设置为 embed 或 bidi-override 时才会应用 direction 属性。
  direction 属性有两个值：ltr 和 rtl。大多数情况下，默认值是 ltr，显示从左到右的文本。如果显示从右到左的文本，应使用值 rtl。

### 字体
CSS 字体属性定义文本的字体系列、大小、加粗、风格（如斜体）和变形（如小型大写字母）。
#### CSS字体系列
在 CSS 中，有两种不同类型的字体系列名称：
- 通用字体系列 - 拥有相似外观的字体系统组合（比如 "Serif" 或 "Monospace"）
- 特定字体系列 - 具体的字体系列（比如 "Times" 或 "Courier"）
除了各种特定的字体系列外，CSS 定义了 5 种通用字体系列：
- Serif 字体
- Sans-serif 字体
- Monospace 字体
- Cursive 字体
- Fantasy 字体

#### 指定字体系列
使用 font-family 属性 定义文本的字体系列。
#### 使用通用字体系列
如果你希望文档使用一种 sans-serif 字体，但是你并不关心是哪一种字体，以下就是一个合适的声明：
```css
body {font-family: sans-serif;}
```
#### 指定字体系列
除了使用通用的字体系列，您还可以通过 font-family 属性设置更具体的字体。
下面的例子为所有 h1 元素设置了 Georgia 字体：
```css
h1 {font-family: Georgia;}
```
这样的规则同时会产生另外一个问题，如果用户代理上没有安装 Georgia 字体，就只能使用用户代理的默认字体来显示 h1 元素。
我们可以通过结合特定字体名和通用字体系列来解决这个问题：
```css
h1 {font-family: Georgia, serif;}
```
如果读者没有安装 Georgia，但安装了 Times 字体（serif 字体系列中的一种字体），用户代理就可能对 h1 元素使用 Times。尽管 Times 与 Georgia 并不完全匹配，但至少足够接近。
因此，我们建议在所有 font-family 规则中都提供一个通用字体系列。这样就提供了一条后路，在用户代理无法提供与规则匹配的特定字体时，就可以选择一个候选字体。
如果您对字体非常熟悉，也可以为给定的元素指定一系列类似的字体。要做到这一点，需要把这些字体按照优先顺序排列，然后用逗号进行连接：
```css
p {font-family: Times, TimesNR, 'New Century Schoolbook',
     Georgia, 'New York', serif;}
```
#### 使用引号
只有当字体名中有一个或多个空格（比如 New York），或者如果字体名包括 # 或 $ 之类的符号，才需要在 font-family 声明中加引号。
单引号或双引号都可以接受。但是，如果把一个 font-family 属性放在 HTML 的 style 属性中，则需要使用该属性本身未使用的那种引号：

#### 字体风格
font-style 属性最常用于规定斜体文本。
该属性有三个值：
- normal - 文本正常显示
- italic - 文本斜体显示
- oblique - 文本倾斜显示

#### italic 和 oblique 的区别
font-style 非常简单：用于在 normal 文本、italic 文本和 oblique 文本之间选择。唯一有点复杂的是明确 italic 文本和 oblique 文本之间的差别。
斜体（italic）是一种简单的字体风格，对每个字母的结构有一些小改动，来反映变化的外观。与此不同，倾斜（oblique）文本则是正常竖直文本的一个倾斜版本。

#### 字体变形
font-variant 属性可以设定小型大写字母。
小型大写字母不是一般的大写字母，也不是小写字母，这种字母采用不同大小的大写字母。

#### 字体加粗
font-weight 属性设置文本的粗细。
使用 bold 关键字可以将文本设置为粗体。
关键字 100 ~ 900 为字体指定了 9 级加粗度。如果一个字体内置了这些加粗级别，那么这些数字就直接映射到预定义的级别，100 对应最细的字体变形，900 对应最粗的字体变形。数字 400 等价于 normal，而 700 等价于 bold。
如果将元素的加粗设置为 bolder，浏览器会设置比所继承值更粗的一个字体加粗。与此相反，关键词 lighter 会导致浏览器将加粗度下移而不是上移。

#### 字体大小
font-size 属性设置文本的大小。
有能力管理文本的大小在 web 设计领域很重要。但是，您不应当通过调整文本大小使段落看上去像标题，或者使标题看上去像段落。
请始终使用正确的 HTML 标题，比如使用 <h1> - <h6> 来标记标题，使用 <p> 来标记段落。
font-size 值可以是绝对或相对值。
绝对值：
- 将文本设置为指定的大小
- 不允许用户在所有浏览器中改变文本大小（不利于可用性）
- 绝对大小在确定了输出的物理尺寸时很有用
相对大小：
- 相对于周围的元素来设置大小
- 允许用户在浏览器改变文本大小

1. 使用像素来设置字体大小
通过像素设置文本大小，可以对文本大小进行完全控制

2. 使用em来设置字体大小
如果要避免在 Internet Explorer 中无法调整文本的问题，许多开发者使用 em 单位代替 pixels。
W3C 推荐使用 em 尺寸单位。
1em 等于当前的字体尺寸。如果一个元素的 font-size 为 16 像素，那么对于该元素，1em 就等于 16 像素。在设置字体大小时，em 的值会相对于父元素的字体大小改变。
浏览器中默认的文本大小是 16 像素。因此 1em 的默认尺寸是 16 像素。
可以使用下面这个公式将像素转换为 em：pixels/16=em
（注：16 等于父元素的默认字体大小，假设父元素的 font-size 为 20px，那么公式需改为：pixels/20=em）

3. 结合使用百分比和em
在所有浏览器中均有效的方案是为 body 元素（父元素）以百分比设置默认的 font-size 值：
```css
body {font-size:100%;}
h1 {font-size:3.75em;}
h2 {font-size:2.5em;}
p {font-size:0.875em;}
```
### CSS链接
我们能够以不同的方法为链接设置样式。
#### 设置链接的样式
能够设置链接样式的 CSS 属性有很多种（例如 color, font-family, background 等等）。
链接的特殊性在于能够根据它们所处的状态来设置它们的样式。
链接的四种状态：
- a:link - 普通的、未被访问的链接
- a:visited - 用户已访问的链接
- a:hover - 鼠标指针位于链接的上方
- a:active - 链接被点击的时刻
当为链接的不同状态设置样式时，请按照以下次序规则：
- a:hover 必须位于 a:link 和 a:visited 之后
- a:active 必须位于 a:hover 之后

#### 常见的链接样式
1. 文本修饰
text-decoration 属性大多用于去掉链接中的下划线
2. 背景色
background-color 属性规定链接的背景色

### 列表
**CSS 列表属性允许你放置、改变列表项标志，或者将图像作为列表项标志。**

#### CSS列表
要影响列表的样式，最简单（同时支持最充分）的办法就是改变其标志类型。
例如，在一个无序列表中，列表项的标志 (marker) 是出现在各列表项旁边的圆点。在有序列表中，标志可能是字母、数字或另外某种计数体系中的一个符号。
要修改用于列表项的标志类型，可以使用属性 list-style-type。
```css
ul {list-style-type : square}
```
#### 列表项图像
时，常规的标志是不够的。你可能想对各标志使用一个图像，这可以利用 list-style-image 属性做到
```css
ul li {list-style-image : url(xxx.gif)}
```
#### 列表标志位置
确定标志出现在列表项内容之外还是内容内部。这是利用 list-style-position 完成的
#### 简写列表样式
可以将以上 3 个列表样式属性合并为一个方便的属性：list-style，就像这样
```css
li {list-style : url(example.gif) square inside}
```
#### 列表属性
属性 | 描述
--- | ---
list-style | 简写属性。用于把所有用于列表的属性设置于一个声明中
list-style-image | 将图像设置为列表项标志
list-style-position | 设置列表中列表项标志的位置
list-style-type | 设置列表项标志的类型

### 表格
CSS 表格属性可以帮助您极大地改善表格的外观。
#### 表格边框
如需在 CSS 中设置表格边框，请使用 border 属性。

#### 折叠边框
border-collapse 属性设置是否将表格边框折叠为单一边框
#### 表格宽度和高度
通过 width 和 height 属性定义表格的宽度和高度。
#### 表格文本对齐
text-align 和 vertical-align 属性设置表格中文本的对齐方式。
text-align 属性设置水平对齐方式，比如左对齐、右对齐或者居中
vertical-align 属性设置垂直对齐方式，比如顶部对齐、底部对齐或居中对齐

#### 表格内边距
如需控制表格中内容与边框的距离，请为 td 和 th 元素设置 padding 属性

#### 表格颜色
使用background-color设置

#### CSS Table属性
属性 | 描述
--- | ---
border-collapse | 设置是否把表格边框合并为单一的边框
border-spacing | 设置分隔单元格边框的距离
caption-side | 设置表格标题的位置
empty-cells | 设置是否显示表格中的空单元格
table-layout | 设置显示单元、行和列的算法

### 轮廓
**轮廓（outline）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。
  CSS outline 属性规定元素轮廓的样式、颜色和宽度。**

属性 | 描述
--- | ---
outline | 在一个声明中设置所有的轮廓属性
outline-color | 设置轮廓的颜色
outline-style | 设置轮廓的样式
outline-width | 设置轮廓的宽度

---
## 框模型
**CSS 框模型 (Box Model) 规定了元素框处理元素内容、内边距、边框 和 外边距 的方式。**
### CSS框模型概述
![img](http://www.w3school.com.cn/i/ct_boxmodel.gif)
元素框的最内部分是实际的内容，直接包围内容的是内边距。内边距呈现了元素的背景。内边距的边缘是边框。边框以外是外边距，外边距默认是透明的，因此不会遮挡其后的任何元素。
提示：背景应用于由内容和内边距、边框组成的区域。
内边距、边框和外边距都是可选的，默认值是零。但是，许多元素将由用户代理样式表设置外边距和内边距。可以通过将元素的 margin 和 padding 设置为零来覆盖这些浏览器样式。这可以分别进行，也可以使用通用选择器对所有元素进行设置
> 内边距、边框和外边距可以应用于一个元素的所有边，也可以应用于单独的边。
外边距可以是负值，而且在很多情况下都要使用负值的外边距。

#### 浏览器兼容性
一旦为页面设置了恰当的 DTD，大多数浏览器都会按照上面的图示来呈现内容。然而 IE 5 和 6 的呈现却是不正确的。根据 W3C 的规范，元素内容占据的空间是由 width 属性设置的，而内容周围的 padding 和 border 值是另外计算的。不幸的是，IE5.X 和 6 在怪异模式中使用自己的非标准模型。这些浏览器的 width 属性不是内容的宽度，而是内容、内边距和边框的宽度的总和。
虽然有方法解决这个问题。但是目前最好的解决方案是回避这个问题。也就是，不要给元素添加具有指定宽度的内边距，而是尝试将内边距或外边距添加到元素的父元素和子元素。

### 内边距
**元素的内边距在边框和内容区之间。控制该区域最简单的属性是 padding 属性。
  CSS padding 属性定义元素边框与元素内容之间的空白区域。**
  
#### CSS padding属性
CSS padding 属性定义元素的内边距。padding 属性接受长度值或百分比值，但不允许使用负值。
```css
h1 {padding: 10px;}
```
还可以按照上、右、下、左的顺序分别设置各边的内边距，各边均可以使用不同的单位或百分比值
```css
h1 {padding: 10px 0.25em 2ex 20%;}
```

1. 单位内边距属性
也通过使用下面四个单独的属性，分别设置上、右、下、左内边距
- padding-top
- padding-right
- padding-bottom
- padding-left

2. 内边距的百分比数值
前面提到过，可以为元素的内边距设置百分数值。百分数值是相对于其父元素的 width 计算的，这一点与外边距一样。所以，如果父元素的 width 改变，它们也会改变。
> 上下内边距与左右内边距一致；即上下内边距的百分数会相对于父元素宽度设置，而不是相对于高度。

### 边框
**元素的边框 (border) 是围绕元素内容和内边距的一条或多条线。
  CSS border 属性允许你规定元素边框的样式、宽度和颜色。**
#### CSS边框
在 HTML 中，我们使用表格来创建文本周围的边框，但是通过使用 CSS 边框属性，我们可以创建出效果出色的边框，并且可以应用于任何元素。
元素外边距内就是元素的的边框 (border)。元素的边框就是围绕元素内容和内边据的一条或多条线。
每个边框有 3 个方面：宽度、样式，以及颜色。在下面的篇幅，我们会为您详细讲解这三个方面。

#### 边框与背景
元素的背景是内容、内边距和边框区的背景。

#### 边框的样式
样式是边框最重要的一个方面，这不是因为样式控制着边框的显示（当然，样式确实控制着边框的显示），而是因为如果没有样式，将根本没有边框。
CSS 的 border-style 属性定义了 10 个不同的非 inherit 样式，包括 none。
1. 定义多种样式
可以为一个边框定义多个样式
```css
p.aside {border-style: solid dotted dashed double;}
```
2. 定义单边样式
如果您希望为元素框的某一个边设置边框样式，而不是设置所有 4 个边的边框样式，可以使用下面的单边边框样式属性：
- border-top-style
- border-right-style
- border-bottom-style
- border-left-style

#### 边框的宽度
您可以通过 border-width 属性为边框指定宽度。
为边框指定宽度有两种方法：可以指定长度值，比如 2px 或 0.1em；或者使用 3 个关键字之一，它们分别是 thin 、medium（默认值） 和 thick。
> CSS 没有定义 3 个关键字的具体宽度，所以一个用户代理可能把 thin 、medium 和 thick 分别设置为等于 5px、3px 和 2px，而另一个用户代理则分别设置为 3px、2px 和 1px。

1. 定义单边宽度
您可以按照 top-right-bottom-left 的顺序设置元素的各边边框
```css
p {border-style: solid; border-width: 15px 5px 15px 5px;}
```
上面的例子也可以简写为（这样写法称为值复制）：
```css
p {border-style: solid; border-width: 15px 5px;}
```
您也可以通过下列属性分别设置边框各边的宽度
- border-top-width
- border-right-width
- border-bottom-width
- border-left-width

2. 没有边框
由于 border-style 的默认值是 none，如果没有声明样式，就相当于 border-style: none。因此，如果您希望边框出现，就必须声明一个边框样式。

#### 边框的颜色
设置边框颜色非常简单。CSS 使用一个简单的 border-color 属性，它一次可以接受最多 4 个颜色值。
> 默认的边框颜色是元素本身的前景色。如果没有为边框声明颜色，它将与元素的文本颜色相同。另一方面，如果元素没有任何文本，假设它是一个表格，其中只包含图像，那么该表的边框颜色就是其父元素的文本颜色（因为 color 可以继承）。这个父元素很可能是 body、div 或另一个 table。

1. 定义单边颜色
- border-top-color
- border-right-color
- border-bottom-color
- border-left-color

2. 透明边框
边框颜色值 transparent

#### 边框属性
属性 | 描述
--- | ---
border | 简写属性，用于把针对四个边的属性设置在一个声明。
border-style | 用于设置元素所有边框的样式，或者单独地为各边设置边框样式。
border-width | 简写属性，用于为元素的所有边框设置宽度，或者单独地为各边边框设置宽度。
border-color | 简写属性，设置元素的所有边框中可见部分的颜色，或为 4 个边分别设置颜色。
border-bottom | 简写属性，用于把下边框的所有属性设置到一个声明中。
border-bottom-color | 设置元素的下边框的颜色。
border-bottom-style | 设置元素的下边框的样式。
border-bottom-width | 设置元素的下边框的宽度。
border-left | 简写属性，用于把左边框的所有属性设置到一个声明中。
border-left-color | 设置元素的左边框的颜色。
border-left-style | 设置元素的左边框的样式。
border-left-width | 设置元素的左边框的宽度。
border-right | 简写属性，用于把右边框的所有属性设置到一个声明中。
border-right-color | 设置元素的右边框的颜色。
border-right-style | 设置元素的右边框的样式。
border-right-width | 设置元素的右边框的宽度。
border-top | 简写属性，用于把上边框的所有属性设置到一个声明中。
border-top-color | 设置元素的上边框的颜色。
border-top-style | 设置元素的上边框的样式。
border-top-width | 设置元素的上边框的宽度。

### 外边距
**围绕在元素边框的空白区域是外边距。设置外边距会在元素外创建额外的“空白”。
  设置外边距的最简单的方法就是使用 margin 属性，这个属性接受任何长度单位、百分数值甚至负值。**

#### margin属性
设置外边距的最简单的方法就是使用 margin 属性。
margin 属性接受任何长度单位，可以是像素、英寸、毫米或 em。
margin 可以设置为 auto。更常见的做法是为外边距设置长度值。

#### 单边外边距属性
使用下列任何一个属性来只设置相应上的外边距，而不会直接影响所有其他外边距
- margin-top
- margin-right
- margin-bottom
- margin-left
 
### 外边距合并
**外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。
  合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。**
外边距合并（叠加）是一个相当简单的概念。但是，在实践中对网页进行布局时，它会造成许多混淆。
简单地说，外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。
1. 当一个元素出现在另一个元素上面时，第一个元素的下外边距与第二个元素的上外边距会发生合并。
2. 当一个元素包含在另一个元素中时（假设没有内边距或边框把外边距分隔开），它们的上和/或下外边距也会发生合并。
3. 尽管看上去有些奇怪，但是外边距甚至可以与自身发生合并。
   假设有一个空元素，它有外边距，但是没有边框或填充。在这种情况下，上外边距与下外边距就碰到了一起，它们会发生合并

---
## 定位
### 定位
#### 定位和浮动

#### 一切皆为框
div、h1 或 p 元素常常被称为块级元素。这意味着这些元素显示为一块内容，即“块框”。与之相反，span 和 strong 等元素称为“行内元素”，这是因为它们的内容显示在行中，即“行内框”。
您可以使用 display 属性改变生成的框的类型。这意味着，通过将 display 属性设置为 block，可以让行内元素（比如 `<a>` 元素）表现得像块级元素一样。还可以通过把 display 设置为 none，让生成的元素根本没有框。这样的话，该框及其所有内容就不再显示，不占用文档中的空间。
但是在一种情况下，即使没有进行显式定义，也会创建块级元素。这种情况发生在把一些文本添加到一个块级元素（比如 div）的开头。即使没有把这些文本定义为段落，它也会被当作段落对待

#### 定位机制
CSS 有三种基本的定位机制：普通流、浮动和绝对定位。
除非专门指定，否则所有框都在普通流中定位。也就是说，普通流中的元素的位置由元素在 (X)HTML 中的位置决定。
块级框从上到下一个接一个地排列，框之间的垂直距离是由框的垂直外边距计算出来。
行内框在一行中水平布置。可以使用水平内边距、边框和外边距调整它们的间距。但是，垂直内边距、边框和外边距不影响行内框的高度。由一行形成的水平框称为行框（Line Box），行框的高度总是足以容纳它包含的所有行内框。不过，设置行高可以增加这个框的高度。

#### position属性
通过使用 position 属性，我们可以选择 4 种不同类型的定位，这会影响元素框生成的方式。
position 属性值的含义：
1. static
元素框正常生成。块级元素生成一个矩形框，作为文档流的一部分，行内元素则会创建一个或多个行框，置于其父元素中。
2. relative
元素框偏移某个距离。元素仍保持其未定位前的形状，它原本所占的空间仍保留。
3. absolute
元素框从文档流完全删除，并相对于其包含块定位。包含块可能是文档中的另一个元素或者是初始包含块。元素原先在正常文档流中所占的空间会关闭，就好像元素原来不存在一样。元素定位后生成一个块级框，而不论原来它在正常流中生成何种类型的框。
4. fixed
元素框的表现类似于将 position 设置为 absolute，不过其包含块是视窗本身。

#### 定位属性
属性 | 描述
--- | ---
position | 把元素放置到一个静态的、相对的、绝对的、或固定的位置中。
top | 定义了一个定位元素的上外边距边界与其包含块上边界之间的偏移。
right |	定义了定位元素右外边距边界与其包含块右边界之间的偏移。
bottom | 定义了定位元素下外边距边界与其包含块下边界之间的偏移。
left | 定义了定位元素左外边距边界与其包含块左边界之间的偏移。
overflow | 设置当元素的内容溢出其区域时发生的事情。
clip | 设置元素的形状。元素被剪入这个形状之中，然后显示出来。
vertical-align | 设置元素的垂直对齐方式。
z-index | 设置元素的堆叠顺序。

### 相对定位
**设置为相对定位的元素框会偏移某个距离。元素仍然保持其未定位前的形状，它原本所占的空间仍保留。**

相对定位是一个非常容易掌握的概念。如果对一个元素进行相对定位，它将出现在它所在的位置上。然后，可以通过设置垂直或水平位置，让这个元素“相对于”它的起点进行移动。
如果将 top 设置为 20px，那么框将在原位置顶部下面 20 像素的地方。如果 left 设置为 30 像素，那么会在元素左边创建 30 像素的空间，也就是将元素向右移动。

### 绝对定位
**设置为绝对定位的元素框从文档流完全删除，并相对于其包含块定位，包含块可能是文档中的另一个元素或者是初始包含块。元素原先在正常文档流中所占的空间会关闭，就好像该元素原来不存在一样。元素定位后生成一个块级框，而不论原来它在正常流中生成何种类型的框。**
绝对定位使元素的位置与文档流无关，因此不占据空间。这一点与相对定位不同，相对定位实际上被看作普通流定位模型的一部分，因为元素的位置相对于它在普通流中的位置。
> 因为绝对定位的框与文档流无关，所以它们可以覆盖页面上的其它元素。可以通过设置 z-index 属性来控制这些框的堆放次序。

### 浮动
**浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。
  由于浮动框不在文档的普通流中，所以文档的普通流中的块框表现得就像浮动框不存在一样。**
  
#### float属性
在 CSS 中，我们通过 float 属性实现元素的浮动。
#### 行框和清理
浮动框旁边的行框被缩短，从而给浮动框留出空间，行框围绕浮动框。
因此，创建浮动框可以使文本围绕图像

---
## 选择器
### 元素选择器
最常见的 CSS 选择器是元素选择器。换句话说，文档的元素就是最基本的选择器。
### 选择器分组
将 h2 和 p 选择器放在规则左边，然后用逗号分隔，就定义了一个规则。其右边的样式（color:gray;）将应用到这两个选择器所引用的元素。逗号告诉浏览器，规则中包含两个不同的选择器。如果没有这个逗号，那么规则的含义将完全不同。
#### 通配符选择器
CSS2 引入了一种新的简单选择器 - 通配选择器（universal selector），显示为一个星号（*）。该选择器可以与任何元素匹配，就像是一个通配符。

### 类选择器
**类选择器允许以一种独立于文档元素的方式来指定样式。**
#### CSS类选择器
类选择器允许以一种独立于文档元素的方式来指定样式。
该选择器可以单独使用，也可以与其他元素结合使用。
### id选择器
**ID 选择器允许以一种独立于文档元素的方式来指定样式。**
#### 类选择器还是 ID 选择器？
在类选择器这一章中我们曾讲解过，可以为任意多个元素指定类。前一章中类名 important 被应用到 p 和 h1 元素，而且它还可以应用到更多元素。
- 区别 1：只能在文档中使用一次
与类不同，在一个 HTML 文档中，ID 选择器会使用一次，而且仅一次。
- 区别 2：不能使用 ID 词列表
不同于类选择器，ID 选择器不能结合使用，因为 ID 属性不允许有以空格分隔的词列表。
- 区别 3：ID 能包含更多含义
类似于类，可以独立于元素来选择 ID。有些情况下，您知道文档中会出现某个特定 ID 值，但是并不知道它会出现在哪个元素上，所以您想声明独立的 ID 选择器。例如，您可能知道在一个给定的文档中会有一个 ID 值为 mostImportant 的元素。您不知道这个最重要的东西是一个段落、一个短语、一个列表项还是一个小节标题。您只知道每个文档都会有这么一个最重要的内容，它可能在任何元素中，而且只能出现一个。

#### 区分大小写
请注意，类选择器和 ID 选择器可能是区分大小写的。这取决于文档的语言。HTML 和 XHTML 将类和 ID 值定义为区分大小写，所以类和 ID 值的大小写必须与文档中的相应值匹配。

### 属性选择器
**属性选择器可以根据元素的属性及属性值来选择元素。**
#### 简单属性选择
如果希望选择有某个属性的元素，而不论属性值是什么，可以使用简单属性选择器。
```css
/* 如果您希望把包含标题（title）的所有元素变为红色，可以写作：*/
*[title] {color:red;}
/* 与上面类似，可以只对有 href 属性的锚（a 元素）应用样式 */
a[href] {color:red;}
/*
还可以根据多个属性进行选择，只需将属性选择器链接在一起即可。
为了将同时有 href 和 title 属性的 HTML 超链接的文本设置为红色，可以这样写
 */
a[href][title] {color:red;}
/*
可以采用一些创造性的方法使用这个特性。
可以对所有带有 alt 属性的图像应用样式，从而突出显示这些有效的图像
*/
img[alt] {border: 5px solid red;}
/*
为 XML 文档使用属性选择器
属性选择器在 XML 文档中相当有用，因为 XML 语言主张要针对元素和属性的用途指定元素名和属性名。
*/
planet[moons] {color:red;}
```

#### 根据具体属性值选择
除了选择拥有某些属性的元素，还可以进一步缩小选择范围，只选择有特定属性值的元素。
```css
/* 假设希望将指向 Web 服务器上某个指定文档的超链接变成红色 */
a[href="http://www.w3school.com.cn/about_us.asp"] {color: red;}
/* 与简单属性选择器类似，可以把多个属性-值选择器链接在一起来选择一个文档。 */
a[href="http://www.w3school.com.cn/"][title="W3School"] {color: red;}
```

#### 属性与属性值必须完全匹配
请注意，这种格式要求必须与属性值完全匹配。
如果属性值包含用空格分隔的值列表，匹配就可能出问题。
```css
<p class="important warning">This paragraph is a very important warning.</p>
/* 如果写成 p[class="important"]，那么这个规则不能匹配示例标记。
   要根据具体属性值来选择该元素，必须这样写：*/
p[class="important warning"] {color: red;}
```

#### 根据部分属性值选择
如果需要根据属性值中的词列表的某个词进行选择，则需要使用波浪号（~）。假设您想选择 class 属性中包含 important 的元素，可以用下面这个选择器做到这一点。
```css
p[class~="important"] {color: red;}
```
#### 部分值属性选择器与点号类名记法的区别
该选择器等价于我们在类选择器中讨论过的点号类名记法。
也就是说，p.important 和 p[class="important"] 应用到 HTML 文档时是等价的。
那么，为什么还要有 "~=" 属性选择器呢？因为它能用于任何属性，而不只是 class。
```css
img[title~="Figure"] {border: 1px solid gray;}
```
#### 子串匹配属性选择器

类型 | 描述
--- | ---
[abc^="def"] | 选择 abc 属性值以 "def" 开头的所有元素
[abc$="def"] | 选择 abc 属性值以 "def" 结尾的所有元素
[abc*="def"] | 选择 abc 属性值中包含子串 "def" 的所有元素

#### 特定属性选择类型
```css
*[lang|="en"] {color: red;}
```
上面这个规则会选择 lang 属性等于 en 或以 en- 开头的所有元素。

#### CSS选择器参考手册
选择器 | 描述
--- | ---
[attribute] | 用于选取带有指定属性的元素。
[attribute=value] | 用于选取带有指定属性和值的元素。
[attribute~=value] | 用于选取属性值中包含指定词汇的元素。
[attribute&#124;=value] | 用于选取带有以指定值开头的属性值的元素，该值必须是整个单词。
[attribute^=value] | 匹配属性值以指定值开头的每个元素。
[attribute$=value] | 匹配属性值以指定值结尾的每个元素。
[attribute*=value] | 匹配属性值中包含指定值的每个元素。

### 后代选择器
**后代选择器（descendant selector）又称为包含选择器。
  后代选择器可以选择作为某元素后代的元素。**
#### 根据上下文选择元素
```css
h1 em {color:red;}
```
### 子元素选择器
**与后代选择器相比，子元素选择器（Child selectors）只能选择作为某元素子元素的元素。**

#### 选择子元素
```css
h1 > strong {color:red;}
```
### 相邻兄弟选择器
**相邻兄弟选择器（Adjacent sibling selector）可选择紧接在另一元素后的元素，且二者有相同父元素。**

#### 选择相邻兄弟
如果需要选择紧接在另一个元素后的元素，而且二者有相同的父元素，可以使用相邻兄弟选择器（Adjacent sibling selector）。
```css
h1 + p {margin-top:50px;}
```
### 伪类
**CSS 伪类用于向某些选择器添加特殊的效果。**
#### 锚伪类
在支持 CSS 的浏览器中，链接的不同状态都可以不同的方式显示，这些状态包括：活动状态，已被访问状态，未被访问状态，和鼠标悬停状态。
```css
a:link {color: #FF0000}		/* 未访问的链接 */
a:visited {color: #00FF00}	/* 已访问的链接 */
a:hover {color: #FF00FF}	/* 鼠标移动到链接上 */
a:active {color: #0000FF}	/* 选定的链接 */
```
> 在 CSS 定义中，a:hover 必须被置于 a:link 和 a:visited 之后，才是有效的。
在 CSS 定义中，a:active 必须被置于 a:hover 之后，才是有效的。
伪类名称对大小写不敏感。

#### 伪类与CSS类
:lang 伪类使你有能力为不同的语言定义特殊的规则。在下面的例子中，:lang 类为属性值为 no 的 q 元素定义引号的类型
```css
q:lang(no)
   {
   quotes: "~" "~"
   }
```

#### 伪类
属性 | 描述 | CSS
--- | --- | ---
:active | 向被激活的元素添加样式。 | 1
:focus | 向拥有键盘输入焦点的元素添加样式。 | 2
:hover | 当鼠标悬浮在元素上方时，向元素添加样式。 | 1
:link | 向未被访问的链接添加样式。 | 1
:visited | 向已被访问的链接添加样式。 | 1
:first-child | 向元素的第一个子元素添加样式。 | 2
:lang | 向带有指定 lang 属性的元素添加样式。 | 2

### 伪元素
**CSS 伪元素用于向某些选择器设置特殊效果。**
#### :first-line 伪元素
"first-line" 伪元素用于向文本的首行设置特殊样式。
> "first-line" 伪元素只能用于块级元素。
> 下面的属性可应用于 "first-line" 伪元素：
- font
- color
- background
- word-spacing
- letter-spacing
- text-decoration
- vetical-align
- text-transfrom
- line-height
- clear

#### :first-letter 伪元素
"first-letter" 伪元素用于向文本的首字母设置特殊样式：
> "first-letter" 伪元素只能用于块级元素。
> 下面的属性可应用于 "first-letter" 伪元素：
- font
- color
- background
- margin
- padding
- border
- text-decoration
- vetical-align(仅当float为none时)
- text-transfrom
- line-height
- float
- clear

#### 伪元素和CSS类
```css
p.article:first-letter
  {
  color: #FF0000;
  }

<p class="article">This is a paragraph in an article。</p>
```

#### 多重伪元素
可以结合多个伪元素来使用。

#### :before 伪元素
":before" 伪元素可以在元素的内容前面插入新内容。
```css
h1:before
  {
  content:url(logo.gif);
  }
```

#### :after 伪元素
":after" 伪元素可以在元素的内容之后插入新内容。
```css
h1:after
  {
  content:url(logo.gif);
  }
```

#### 伪元素
属性 | 描述 | CSS
--- | --- | ---
:first-letter |	向文本的第一个字母添加特殊样式。 | 1
:first-line | 向文本的首行添加特殊样式。 | 1
:before | 在元素之前添加内容。 | 2
:after | 在元素之后添加内容。 | 2

---
## 高级
### 对齐
#### CSS水平对齐
1. 对齐块元素
2. 使用margin属性来水平对齐
可通过将左和右外边距设置为"auto"，来对齐块元素。
3. 使用position属性进行左和右对齐
4. 使用float属性来进行左和右对齐

### 尺寸
#### CSS尺寸属性
属性 | 描述
--- | ---
height | 设置元素的高度。
line-height | 设置行高。
max-height | 设置元素的最大高度。
max-width | 设置元素的最大宽度。
min-height | 设置元素的最小高度。
min-width | 设置元素的最小宽度。
width | 设置元素的宽度。

### 分类
#### CSS分类属性
属性 | 描述
--- | ---
clear | 设置一个元素的侧面是否允许其他的浮动元素。
cursor | 规定当指向某元素之上时显示的指针类型。
display | 设置是否及如何显示元素。
float | 定义元素在哪个方向浮动。
position | 把元素放置到一个静态的、相对的、绝对的、或固定的位置中。
visibility | 设置元素是否可见或不可见。

### 导航栏
### 图片库
### 图片透明
### 媒介类型
**媒介类型(Media Types)允许你定义以何种媒介来提交文档。文档可以被显示在显示器、纸媒介或者听觉浏览器等等。**
1. 媒介类型
某些 CSS 属性仅仅被设计为针对某些媒介。比方说 "voice-family" 属性被设计为针对听觉用户终端。其他的属性可被用于不同的媒介。例如，"font-size" 属性可被用于显示器以及印刷媒介，但是也许会带有不同的值。显示器上面的显示的文档通常会需要比纸媒介文档更大的字号，同时，在显示器上，sans-serif 字体更易阅读，而在纸媒介上，serif 字体更易阅读。
2. @meidia规则
@media 规则使你有能力在相同的样式表中，使用不同的样式规则来针对不同的媒介。
3. 不同的媒介类型

媒介类型 | 描述
--- | ---
all | 用于所有的媒介设备。
aural | 用于语音和音频合成器。
braille | 用于盲人用点字法触觉回馈设备。
embossed | 用于分页的盲人用点字法打印机。
handheld | 用于小的手持的设备。
print | 用于打印机。
projection | 用于方案展示，比如幻灯片。
screen | 用于电脑显示器。
tty | 用于使用固定密度字母栅格的媒介，比如电传打字机和终端。
tv | 用于电视机类型的设备。

---
## 属性
[参考](http://www.w3school.com.cn/cssref/index.asp)
### 动画
属性 | 描述 | CSS
--- | --- | ---
@keyframes | 规定动画。 | 3
animation | 所有动画属性的简写属性，除了 animation-play-state 属性。 | 3
animation-name | 规定 @keyframes 动画的名称。 | 3
animation-duration | 规定动画完成一个周期所花费的秒或毫秒。 | 3
animation-timing-function | 规定动画的速度曲线。 | 3
animation-delay | 规定动画何时开始。 | 3
animation-iteration-count | 规定动画被播放的次数。 | 3
animation-direction | 规定动画是否在下一周期逆向地播放。 | 3
animation-play-state | 规定动画是否正在运行或暂停。 | 3
animation-fill-mode | 规定对象动画时间之外的状态。 | 3
### 背景
属性 | 描述 | CSS
--- | --- | ---
background | 在一个声明中设置所有的背景属性。 | 1
background-attachment | 设置背景图像是否固定或者随着页面的其余部分滚动。 | 1
background-color | 设置元素的背景颜色。 | 1
background-image | 设置元素的背景图像。 | 1
background-position | 设置背景图像的开始位置。 | 1
background-repeat | 设置是否及如何重复背景图像。 | 1
background-clip | 规定背景的绘制区域。 | 3
background-origin | 规定背景图片的定位区域。 | 3
background-size	| 规定背景图片的尺寸。 | 3
### 边框和轮廓
属性 | 描述 | CSS
--- | --- | ---
border | 在一个声明中设置所有的边框属性。 | 1
border-bottom | 在一个声明中设置所有的下边框属性。 | 1
border-bottom-color | 设置下边框的颜色。 | 2
border-bottom-style | 设置下边框的样式。 | 2
border-bottom-width | 设置下边框的宽度。 | 1
border-color | 设置四条边框的颜色。 | 1
border-left | 在一个声明中设置所有的左边框属性。 | 1
border-left-color | 设置左边框的颜色。 | 2
border-left-style | 设置左边框的样式。 | 2
border-left-width | 设置左边框的宽度。 | 1
border-right | 在一个声明中设置所有的右边框属性。 | 1
border-right-color | 设置右边框的颜色。 | 2
border-right-style | 设置右边框的样式。 | 2
border-right-width | 设置右边框的宽度。 | 1
border-style | 设置四条边框的样式。 | 1
border-top | 在一个声明中设置所有的上边框属性。 | 1
border-top-color | 设置上边框的颜色。 | 2
border-top-style | 设置上边框的样式。 | 2
border-top-width | 设置上边框的宽度。 | 1
border-width | 设置四条边框的宽度。 | 1
outline | 在一个声明中设置所有的轮廓属性。 | 2
outline-color | 设置轮廓的颜色。 | 2
outline-style | 设置轮廓的样式。 | 2
outline-width | 设置轮廓的宽度。 | 2
border-bottom-left-radius | 定义边框左下角的形状。 | 3
border-bottom-right-radius | 定义边框右下角的形状。 | 3
border-image | 简写属性，设置所有 border-image-* 属性。 | 3
border-image-outset | 规定边框图像区域超出边框的量。 | 3
border-image-repeat | 图像边框是否应平铺(repeated)、铺满(rounded)或拉伸(stretched)。 | 3
border-image-slice | 规定图像边框的向内偏移。 | 3
border-image-source | 规定用作边框的图片。 | 3
border-image-width | 规定图片边框的宽度。 | 3
border-radius | 简写属性，设置所有四个 border-*-radius 属性。 | 3
border-top-left-radius | 定义边框左上角的形状。 | 3
border-top-right-radius | 定义边框右下角的形状。 | 3
box-decoration-break | 		 | 3
box-shadow	向方框添加一个或多个阴影。 | 3
### 盒（框）
属性 | 描述 | CSS
--- | --- | ---
overflow-x | 如果内容溢出了元素内容区域，是否对内容的左/右边缘进行裁剪。 | 3
overflow-y | 如果内容溢出了元素内容区域，是否对内容的上/下边缘进行裁剪。 | 3
overflow-style | 规定溢出元素的首选滚动方法。 | 3
rotation | 围绕由 rotation-point 属性定义的点对元素进行旋转。 | 3
rotation-point | 定义距离上左边框边缘的偏移点。 | 3
### 颜色
属性 | 描述 | CSS
--- | --- | ---
color-profile | 允许使用源的颜色配置文件的默认以外的规范。 | 3
opacity | 规定书签的级别。 | 3
rendering-intent | 允许使用颜色配置文件渲染意图的默认以外的规范。 | 3
### 内容分页媒体(Content for Paged Media)
属性 | 描述 | CSS
--- | --- | ---
bookmark-label | 规定书签的标记。 | 3
bookmark-level | 规定书签的级别。 | 3
bookmark-target | 规定书签链接的目标。 | 3
float-offset | 将元素放在 float 属性通常放置的位置的相反方向。 | 3
hyphenate-after | 规定连字单词中连字符之后的最小字符数。 | 3
hyphenate-before | 规定连字单词中连字符之前的最小字符数。 | 3
hyphenate-character | 规定当发生断字时显示的字符串。 | 3
hyphenate-lines | 指示元素中连续断字连线的最大数。 | 3
hyphenate-resource | 规定帮助浏览器确定断字点的外部资源（逗号分隔的列表）。 | 3
hyphens | 设置如何对单词进行拆分，以改善段落的布局。 | 3
image-resolution | 规定图像的正确分辨率。 | 3
marks | 向文档添加裁切标记或十字标记。 | 3
string-set |  | 3
### 尺寸
属性 | 描述 | CSS
--- | --- | ---
height | 设置元素高度。 | 1
max-height | 设置元素的最大高度。 | 2
max-width | 设置元素的最大宽度。 | 2
min-height | 设置元素的最小高度。 | 2
min-width | 设置元素的最小宽度。 | 2
width | 设置元素的宽度。 | 1
### 可伸缩框
属性 | 描述 | CSS
--- | --- | ---
box-align | 规定如何对齐框的子元素。 | 3
box-direction | 规定框的子元素的显示方向。 | 3
box-flex | 规定框的子元素是否可伸缩。 | 3
box-flex-group | 将可伸缩元素分配到柔性分组。 | 3
box-lines | 规定当超出父元素框的空间时，是否换行显示。 | 3
box-ordinal-group | 规定框的子元素的显示次序。 | 3
box-orient | 规定框的子元素是否应水平或垂直排列。 | 3
box-pack | 规定水平框中的水平位置或者垂直框中的垂直位置。 | 3
### 字体
属性 | 描述 | CSS
--- | --- | ---
font | 在一个声明中设置所有字体属性。 | 1
font-family | 规定文本的字体系列。 | 1
font-size | 规定文本的字体尺寸。 | 1
font-size-adjust | 为元素规定 aspect 值。 | 2
font-stretch | 收缩或拉伸当前的字体系列。 | 2
font-style | 规定文本的字体样式。 | 1
font-variant | 规定是否以小型大写字母的字体显示文本。 | 1
font-weight | 规定字体的粗细。 | 1
### 生成内容(Generated Content)
属性 | 描述 | CSS
--- | --- | ---
content | 与 :before 以及 :after 伪元素配合使用，来插入生成内容。 | 2
counter-increment | 递增或递减一个或多个计数器。 | 2
counter-reset | 创建或重置一个或多个计数器。 | 2
quotes | 设置嵌套引用的引号类型。 | 2
crop | 允许被替换元素仅仅是对象的矩形区域，而不是整个对象。 | 3
move-to | 从流中删除元素，然后在文档中后面的点上重新插入。 | 3
page-policy | 确定元素基于页面的 occurrence 应用于计数器还是字符串值。 | 3
### 网格(Grid)
属性 | 描述 | CSS
--- | --- | ---
grid-columns | 规定网格中每个列的宽度。 | 3
grid-rows | 规定网格中每个列的高度。 | 3
### 超链接(Hyperlink)
属性 | 描述 | CSS
--- | --- | ---
target | 简写属性，设置target-name、target-new以及target-position属性。 | 3
target-name | 规定在何处打开链接（链接的目标）。 | 3
target-new | 规定目标链接在新窗口还是在已有窗口的新标签页中打开。 | 3
target-position | 规定在何处放置新的目标链接。 | 3
### 行框

### 列表
属性 | 描述 | CSS
--- | --- | ---
list-style | 在一个声明中设置所有的列表属性。 | 1
list-style-image | 将图象设置为列表项标记。 | 1
list-style-position | 设置列表项标记的放置位置。 | 1
list-style-type | 设置列表项标记的类型。 | 1
marker-offset |   |  2
### 外边距
属性 | 描述 | CSS
--- | --- | ---
margin | 在一个声明中设置所有外边距属性。 | 1
margin-bottom | 设置元素的下外边距。 | 1
margin-left | 设置元素的左外边距。 | 1
margin-right | 设置元素的右外边距。 | 1
margin-top | 设置元素的上外边距。 | 1
### Marquee
属性 | 描述 | CSS
--- | --- | ---
marquee-direction | 设置移动内容的方向。 | 3
marquee-play-count | 设置内容移动多少次。 | 3
marquee-speed | 设置内容滚动得多快。 | 3
marquee-style | 设置移动内容的样式。 | 3
### 多列
属性 | 描述 | CSS
--- | --- | ---
column-count | 规定元素应该被分隔的列数。 | 3
column-fill | 规定如何填充列。 | 3
column-gap | 规定列之间的间隔。 | 3
column-rule | 设置所有 column-rule-* 属性的简写属性。 | 3
column-rule-color | 规定列之间规则的颜色。 | 3
column-rule-style | 规定列之间规则的样式。 | 3
column-rule-width | 规定列之间规则的宽度。 | 3
column-span | 规定元素应该横跨的列数。 | 3
column-width | 规定列的宽度。 | 3
columns | 规定设置 column-width 和 column-count 的简写属性。 | 3
### 内边距
属性 | 描述 | CSS
--- | --- | ---
padding | 在一个声明中设置所有内边距属性。 | 1
padding-bottom | 设置元素的下内边距。 | 1
padding-left | 设置元素的左内边距。| 1
padding-right | 设置元素的右内边距。 | 1
padding-top | 设置元素的上内边距。| 1
### 分页媒体
属性 | 描述 | CSS
--- | --- | ---
fit | 示意如何对width和height属性均不是auto的被替换元素进行缩放。 | 3
fit-position | 定义盒内对象的对齐方式。 | 3
image-orientation | 规定用户代理应用于图像的顺时针方向旋转。 | 3
page | 规定元素应该被显示的页面特定类型。 | 3
size | 规定页面内容包含框的尺寸和方向。 | 3
### 定位
属性 | 描述 | CSS
--- | --- | ---
bottom | 设置定位元素下外边距边界与其包含块下边界之间的偏移。 | 2
clear | 规定元素的哪一侧不允许其他浮动元素。 | 1
clip | 剪裁绝对定位元素。 | 2
cursor | 规定要显示的光标的类型（形状）。 | 2
display | 规定元素应该生成的框的类型。 | 1
float | 规定框是否应该浮动。 | 1
left | 设置定位元素左外边距边界与其包含块左边界之间的偏移。 | 2
overflow | 规定当内容溢出元素框时发生的事情。 | 2
position | 规定元素的定位类型。 | 2
right | 设置定位元素右外边距边界与其包含块右边界之间的偏移。 | 2
top | 设置定位元素的上外边距边界与其包含块上边界之间的偏移。 | 2
vertical-align | 设置元素的垂直对齐方式。 | 1
visibility | 规定元素是否可见。 | 2
z-index | 设置元素的堆叠顺序。 | 2
### 打印
属性 | 描述 | CSS
--- | --- | ---
orphans | 设置当元素内部发生分页时必须在页面底部保留的最少行数。 | 2
page-break-after | 设置元素后的分页行为。 | 2
page-break-before | 设置元素前的分页行为。 | 2
page-break-inside | 设置元素内部的分页行为。 | 2
widows | 设置当元素内部发生分页时必须在页面顶部保留的最少行数。 | 2
### Ruby

### 语音

### 表格
属性 | 描述 | CSS
--- | --- | ---
border-collapse | 规定是否合并表格边框。 | 2
border-spacing | 规定相邻单元格边框之间的距离。 | 2
caption-side | 规定表格标题的位置。 | 2
empty-cells | 规定是否显示表格中的空单元格上的边框和背景。 | 2
table-layout | 设置用于表格的布局算法。 | 2
### 文本
属性 | 描述 | CSS
--- | --- | ---
color | 设置文本的颜色。  | 1
direction | 规定文本的方向 / 书写方向。  | 2
letter-spacing | 设置字符间距。 | 1
line-height | 设置行高。 | 1
text-align | 规定文本的水平对齐方式。 | 1
text-decoration | 规定添加到文本的装饰效果。 | 1
text-indent | 规定文本块首行的缩进。 | 1
text-shadow | 规定添加到文本的阴影效果。 | 2
text-transform | 控制文本的大小写。 | 1
unicode-bidi | 设置文本方向。 | 2
white-space | 规定如何处理元素中的空白。 | 1
word-spacing | 设置单词间距。 | 1
hanging-punctuation | 规定标点字符是否位于线框之外。 | 3
punctuation-trim | 规定是否对标点字符进行修剪。| 3
text-align-last | 设置如何对齐最后一行或紧挨着强制换行符之前的行。 | 3
text-emphasis | 向元素的文本应用重点标记以及重点标记的前景色。 | 3
text-justify | 规定当 text-align 设置为 "justify" 时所使用的对齐方法。 | 3
text-outline | 规定文本的轮廓。 | 3
text-overflow | 规定当文本溢出包含元素时发生的事情。 | 3
text-shadow | 向文本添加阴影。 | 3
text-wrap | 规定文本的换行规则。 | 3
word-break | 规定非中日韩文本的换行规则。 | 3
word-wrap | 允许对长的不可分割的单词进行分割并换行到下一行。 | 3
### 2D/3D转换
属性 | 描述 | CSS
--- | --- | ---
transform | 向元素应用 2D 或 3D 转换。 | 3
transform-origin | 允许你改变被转换元素的位置。 | 3
transform-style | 规定被嵌套元素如何在 3D 空间中显示。 | 3
perspective | 规定 3D 元素的透视效果。 | 3
perspective-origin | 规定 3D 元素的底部位置。 | 3
backface-visibility | 定义元素在不面对屏幕时是否可见。 | 3
### 过渡
属性 | 描述 | CSS
--- | --- | ---
transition | 简写属性，用于在一个属性中设置四个过渡属性。 | 3
transition-property | 规定应用过渡的 CSS 属性的名称。 | 3
transition-duration | 定义过渡效果花费的时间。 | 3
transition-timing-function | 规定过渡效果的时间曲线。 | 3
transition-delay | 规定过渡效果何时开始。 | 3
### 用户界面
属性 | 描述 | CSS
--- | --- | ---
appearance | 允许您将元素设置为标准用户界面元素的外观 | 3
box-sizing | 允许您以确切的方式定义适应某个区域的具体内容。| 3
icon | 为创作者提供使用图标化等价物来设置元素样式的能力。 | 3
nav-down | 规定在使用 arrow-down 导航键时向何处导航。 | 3
nav-index | 设置元素的 tab 键控制次序。 | 3
nav-left | 规定在使用 arrow-left 导航键时向何处导航。 | 3
nav-right | 规定在使用 arrow-right 导航键时向何处导航。 | 3
nav-up | 规定在使用 arrow-up 导航键时向何处导航。 | 3
outline-offset | 对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓。 | 3
resize | 规定是否可由用户对元素的尺寸进行调整。 | 3

---
## CSS3
[参考](http://www.w3school.com.cn/css3/index.asp)
### 边框
### 背景
### 文本效果
### 字体
### 2D转换
### 3D转换
### 过渡
### 动画
### 多列
### 用户界面
