## 进阶
### 正则表达式

### 读写文件

#### 文件与文件路径
文件有两个关键属性：“文件名”（通常写成一个单词）和“路径”。
1. Windows上的倒斜杠以及OS X和Linux上的正斜杠
    在 Windows 上， 路径书写使用倒斜杠作为文件夹之间的分隔符。但在 OS X 和
Linux 上， 使用正斜杠作为它们的路径分隔符。如果想要程序运行在所有操作系统
上，在编写 Python 脚本时， 就必须处理这两种情况。\
    好在，用 os.path.join()函数来做这件事很简单。如果将单个文件和路径上的文
件夹名称的字符串传递给它， os.path.join()就会返回一个文件路径的字符串， 包含正
确的路径分隔符。

2. 当前工作目录
    每个运行在计算机上的程序， 都有一个“当前工作目录”， 或 cwd。所有没有
从根文件夹开始的文件名或路径， 都假定在当前工作目录下。利用 os.getcwd()函数，
可以取得当前工作路径的字符串， 并可以利用 os.chdir()改变它。

3. 绝对路径与相对路径
    - 绝对路径：总是从根文件夹开始
    - 相对路径：相对于程序的当前工作目录
    还有点（.）和点点（..）文件夹。它们不是真正的文件夹，而是可以在路径中
使用的特殊名称。单个的句点（“点”）用作文件夹目名称时，是“这个目录”的缩
写。两个句点（“点点”）意思是父文件夹。

4. 用os.makedirs()创建新文件夹

5. os.path 模块
    os.path 模块包含了许多与文件名和文件路径相关的有用函数。

6. 处理绝对路径和相对路径
    os.path 模块提供了一些函数， 返回一个相对路径的绝对路径， 以及检查给定的
路径是否为绝对路径。
    - 调用 os.path.abspath(path)将返回参数的绝对路径的字符串。这是将相对路径转
换为绝对路径的简便方法。
    - 调用 os.path.isabs(path)，如果参数是一个绝对路径，就返回 True，如果参数是
一个相对路径，就返回 False。
    - 调用 os.path.relpath(path, start)将返回从 start 路径到 path 的相对路径的字符串。
如果没有提供 start，就使用当前工作目录作为开始路径。
    - 调用 os.path.dirname(path)将返回一个字符串，它包含 path 参数中最后一个斜杠
之前的所有内容。
    - 调用 os.path.basename(path)将返回一个字符串，它包含 path 参数
中最后一个斜杠之后的所有内容。
     - 如果同时需要一个路径的目录名称和基本名称， 就可以调用 os.path.split()，获
得这两个字符串的元组

7. 查看文件大小和文件夹内容
    - 调用 os.path.getsize(path)将返回 path 参数中文件的字节数。
    - 调用 os.listdir(path)将返回文件名字符串的列表，包含 path 参数中的每个文件
（请注意，这个函数在 os 模块中，而不是 os.path）。

8. 检查路径有效性
    - 如果 path 参数所指的文件或文件夹存在， 调用 os.path.exists(path)将返回 True，
否则返回 False。
    - 如果 path 参数存在，并且是一个文件， 调用 os.path.isfile(path)将返回 True， 否
则返回 False。
    - 如果 path 参数存在， 并且是一个文件夹， 调用 os.path.isdir(path)将返回 True，
否则返回 False。


#### 文件读写过程
模块：shelve

1. 用open()函数打开文件
这些命令都将以读取纯文本文件的模式打开文件， 或简称为“读模式”。当文件
以读模式打开时，Python 只让你从文件中读取数据，你不能以任何方式写入或修改它。
在 Python 中打开文件时， 读模式是默认的模式。但如果你不希望依赖于 Python 的默
认值， 也可以明确指明该模式， 向 open()传入字符串'r'， 作为第二个参数。所以
open('/Users/asweigart/hello.txt', 'r')和 open('/Users/asweigart/hello.txt')做的事情一样。

2. 读取文本内容
既然有了一个 File 对象，就可以开始从它读取内容。如果你希望将整个文件的
内容读取为一个字符串值，就使用 File 对象的 read()方法。

3. 写入文件
写模式将覆写原有的文件，从头开始，就像你用一个新值覆写一个变量的值。
将'w'作为第二个参数传递给 open()，以写模式打开该文件。不同的是，添加模式将
在已有文件的末尾添加文本。你可以认为这类似向一个变量中的列表添加内容，而
不是完全覆写该变量。将'a'作为第二个参数传递给 open()，以添加模式打开该文件。

#### 用shelve模块保存变量
利用 shelve 模块， 你可以将 Python 程序中的变量保存到二进制的 shelf 文件中。
这样， 程序就可以从硬盘中恢复变量的数据。 shelve 模块让你在程序中添加“保存”
和“打开” 功能。例如， 如果运行一个程序，并输入了一些配置设置，就可以将这
些设置保存到一个 shelf 文件，然后让程序下一次运行时加载它们。
```
>>> import shelve
>>> shelfFile = shelve.open('mydata')
>>> cats = ['Zophie', 'Pooka', 'Simon']
>>> shelfFile['cats'] = cats
>>> shelfFile.close()
```
就像字典一样， shelf 值有 keys()和 values()方法，

#### 用pprint.pformat()函数保存变量
pprint.pprint()函数将列表或字典中的内容“漂
亮打印” 到屏幕， 而 pprint.pformat()函数将返回同样的文本字符串，但不是打印它。
这个字符串不仅是易于阅读的格式， 同时也是语法上正确的 Python 代码。 假定你有
一个字典， 保存在一个变量中， 你希望保存这个变量和它的内容， 以便将来使用。
pprint.pformat()函数将提供一个字符串， 你可以将它写入.py 文件。该文件将成为你自
己的模块， 如果你需要使用存储在其中的变量， 就可以导入它。
```
>>> import pprint
>>> cats = [{'name': 'Zophie', 'desc': 'chubby'}, {'name': 'Pooka', 'desc': 'fluffy'}]
>>> pprint.pformat(cats)
"[{'desc': 'chubby', 'name': 'Zophie'}, {'desc': 'fluffy', 'name': 'Pooka'}]"
>>> fileObj = open('myCats.py', 'w')
>>> fileObj.write('cats = ' + pprint.pformat(cats) + '\n')
83
>>> fileObj.close()
```