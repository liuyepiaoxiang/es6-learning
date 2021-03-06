# 用法
## 父元素
```
<html>
```

## 说明
文档的基本URL，一份文档中只能有一个<base>元素

## 属性
### href
用于文档中相对URL地址的基础URL。允许绝对和相对URL。

### target
以下的关键字指定特殊的意思：
- _self: 载入结果到当前浏览上下文中。（该值是元素的默认值）。
- _blank: 载入结果到一个新的未命名的浏览上下文。
- _parent: 载入结果到父级浏览上下文（如果当前页是内联框）。如果没有父级结构，该选项的行为和_self一样。
- _top: 载入结果到顶级浏览上下文（该浏览上下文是当前上下文的最顶级上下文）。如果没有父级，该选项的行为和_self一样。


## 使用
### 页内锚
指向文档中某个片段的链接，例如 <a href="#some-id"> 用 <base> 解析，触发对带有附加片段的基本 URL 的 HTTP 请求。

例如：给定 <base href="https://example.com">

以及此链接 <a href="#anchor">Anker</a>

链接指向 https://example.com/#anchor