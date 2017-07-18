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

### 组织文件

#### shutil模块
shutil（或称为 shell 工具）模块中包含一些函数，让你在 Python 程序中复制、
移动、改名和删除文件。要使用 shutil 的函数，首先需要 import shutil。

1. 复制文件和文件夹
调用 shutil.copy(source, destination)，将路径 source 处的文件复制到路径 destination
处的文件夹（source 和 destination 都是字符串）。如果 destination 是一个文件名，它将
作为被复制文件的新名字。该函数返回一个字符串，表示被复制文件的路径。

2. 文件和文件夹的移动与改名
调用 shutil.move(source, destination)， 将路径 source 处的文件夹移动到路径
destination，并返回新位置的绝对路径的字符串。
如果 destination 指向一个文件夹， source 文件将移动到 destination 中， 并保持
原来的文件名。
```
>>> import shutil
>>> shutil.move('C:\\bacon.txt', 'C:\\eggs')
'C:\\eggs\\bacon.txt
```
假定在 C:\目录中已存在一个名为 eggs 的文件夹， 这个 shutil.move()调用就是
说，“将 C:\bacon.txt 移动到文件夹 C:\eggs 中。
如果在 C:\eggs 中原来已经存在一个文件 bacon.txt，它就会被覆写。因为用这
种方式很容易不小心覆写文件， 所以在使用 move()时应该注意。
destination 路径也可以指定一个文件名。
最后， 构成目的地的文件夹必须已经存在， 否则 Python 会抛出异常。

3. 永久删除文件和文件夹
利用 os 模块中的函数，可以删除一个文件或一个空文件夹。但利用 shutil 模块，
可以删除一个文件夹及其所有的内容。
- 用 os.unlink(path)将删除 path 处的文件。
- 调用 os.rmdir(path)将删除 path 处的文件夹。该文件夹必须为空，其中没有任
何文件和文件夹。
- 调用 shutil.rmtree(path)将删除 path 处的文件夹，它包含的所有文件和文件夹都
会被删除。
在程序中使用这些函数时要小心！可以第一次运行程序时， 注释掉这些调用，
并且加上 print()调用， 显示会被删除的文件。 这样做是一个好主意。

4. 用 send2trash 模块安全地删除
因为 Python 内建的 shutil.rmtree()函数不可恢复地删除文件和文件夹，所以 用起
来可能有危险。删除文件和文件夹的更好方法，是使用第三方的 send2trash 模块。

#### 遍历目录树
```
for folderName, subfolders, filenames in os.walk('C:\\delicious'):
```
os.walk()函数被传入一个字符串值，即一个文件夹的路径。你可以在一个 for
循环语句中使用 os.walk()函数，遍历目录树， 就像使用 range()函数遍历一个范围的
数字一样。不像 range()， os.walk()在循环的每次迭代中，返回 3 个值：
1． 当前文件夹名称的字符串。
2．当前文件夹中子文件夹的字符串的列表。
3． 当前文件夹中文件的字符串的列表。
所谓当前文件夹，是指 for 循环当前迭代的文件夹。程序的当前工作目录，不
会因为 os.walk()而改变。
就像你可以在代码 for i in range(10):中选择变量名称 i 一样， 你也可以选择前面
列出来的 3 个字的变量名称。我通常使用 foldername、 subfolders 和 filenames。

#### 用zipfile模块压缩文件
1. 读取zip文件
要读取 ZIP 文件的内容， 首先必须创建一个 ZipFile 对象（请注意大写首字母 Z
和 F）。 要创建一个 ZipFile对象，就调用 zipfile.ZipFile()函数， 向它传入一个字符串， 表示.zip 文件的文件名。
请注意， zipfile 是 Python 模块的名称， ZipFile()是函数的名称。

2. 从ZIP文件中解压缩
ZipFile 对象的 extractall()方法从 ZIP 文件中解压缩所有文件和文件夹， 放到当
前工作目录中。
```
import zipfile
exampleZip = zipfile.ZipFile('example.zip')
exampleZip.extractall()
exampleZip.close()
```
ZipFile 对象的 extract()方法从 ZIP 文件中解压缩单个文件。

3. 创建和添加到ZIP文件
要创建你自己的压缩 ZIP 文件， 必须以“写模式”打开 ZipFile 对象，即传入'w'
作为第二个参数（这类似于向 open()函数传入'w'，以写模式打开一个文本文件）。\
如果向 ZipFile 对象的 write()方法传入一个路径， Python 就会压缩该路径所指
的文件， 将它加到 ZIP 文件中。 write()方法的第一个参数是一个字符串， 代表要添
加的文件名。第二个参数是“压缩类型”参数，它告诉计算机使用怎样的算法来压
缩文件。可以总是将这个值设置为 zipfile.ZIP_DEFLATED（这指定了 deflate 压缩
算法，它对各种类型的数据都很有效）。

### 调试
#### 抛出异常
用 try 和 except 语句来处理 Python 的异常，这样程序就可以从你预期的异常中恢复。
但你也可以在代码中抛出自己的异常。抛出异常相当于是说：“停止运行这个函数
中的代码，将程序执行转到 except 语句 ”。
抛出异常使用 raise 语句。在代码中， raise 语句包含以下部分：
• raise 关键字；
• 对 Exception 函数的调用；
• 传递给 Exception 函数的字符串，包含有用的出错信息。

#### 取得反向跟踪的字符串
如果 Python 遇到错误，它就会生成一些错误信息，称为“反向跟踪”。反向跟踪
包含了出错消息、导致该错误的代码行号，以及导致该错误的函数调用的序列。这
个序列称为“调用栈”。

#### 断言
“断言”是一个心智正常的检查，确保代码没有做什么明显错误的事情。这些
心智正常的检查由 assert 语句执行。如果检查失败，就会抛出异常。在代码中， assert
语句包含以下部分：
• assert 关键字；
• 条件（即求值为 True 或 False 的表达式）；
• 逗号；
• 当条件为 False 时显示的字符串。

1. 禁用断言
在运行 Python 时传入-O 选项，可以禁用断言。如果你已完成了程序的编写和
测试，不希望执行心智正常检测，从而减慢程序的速度，这样就很好（尽管大多数
断言语句所花的时间，不会让你觉察到速度的差异）。断言是针对开发的，不是针
对最终产品。当你将程序交给其他人运行时，它应该没有缺陷，不需要进行心智正
常检查。

#### 日志
如果你曾经在代码中加入 print() 语句，在程序运行时输出某些变量的值，你
就使用了记日志的方式来调试代码。记日志是一种很好的方式，可以理解程序中
发生的事，以及事情发生的顺序。 Python 的 logging 模块使得你很容易创建自定义
的消息记录。这些日志消息将描述程序执行何时到达日志函数调用，并列出你指
定的任何变量当时的值。另一方面，缺失日志信息表明有一部分代码被跳过，从
未执行。
1. 使用日志模块
2. 不要用print()调试
3. 日志级别

级别 | 日志函数 | 描述
--- | --- | ---
DEBUG | logging.debug() | 最高级别。用于小细节。通常只有在诊断问题时，才会关系这些问题
INFO | logging.info() | 用于记录程序中一般事件的信息，或确认一切工作正常
WARNING | logging.warning() | 用于表示可能的问题，它不会阻止程序的工作，但将来可能会
ERROR | logging.error() | 用于记录错误，它导致程序做某事失败
CRITICAL | logging.critical() | 最高级别。用于表示致命的错误，它导致或将要导致程序完全停止工作

4. 禁用日志
在调试完程序后，你可能不希望所有这些日志消息出现在屏幕上。 logging.
disable() 函数禁用了这些消息，这样就不必进入到程序中，手工删除所有的日志调
用。只要向 logging.disable() 传入一个日志级别，它就会禁止该级别和更低级别的所
有日志消息。所以，如果想要禁用所有日志，只要在程序中添加 logging. disable
（logging.CRITICAL）

5. 将日志记录到文件
除了将日志消息显示在屏幕上，还可以将它们写入文本文件。 logging.basic
Config() 函数接受 filename 关键字参数。
```
import logging
logging.basicConfig(filename='myProgramLog.txt', level=logging.DEBUG, format='
%(asctime)s - %(levelname)s - %(message)s')
```

### 从Web抓取信息

webbrowser：是 Python 自带的，打开浏览器获取指定页面。\
requests：从因特网上下载文件和网页。\
Beautiful Soup：解析 HTML，即网页编写的格式。\
selenium：启动并控制一个 Web 浏览器。 selenium 能够填写表单，并模拟鼠标
在这个浏览器中点击。\

#### webbrowser模块的mapIt.py

#### 用requests模块从Web下载文件


#### 用BeautifulSoup模块解析HTML
Beautiful Soup 是一个模块，用于从 HTML 页面中提取信息（用于这个目的时，
它比正则表达式好很多）。 BeautifulSoup 模块的名称是 bs4（表示 Beautiful Soup，
第 4 版）。要安装它，需要在命令行中运行 pip install beautifulsoup4。
虽然安装时使用的名字是 beautifulsoup4，但要导入它，就使用 import bs4。


#### 用selenium模块控制浏览器
selenium 模块让 Python 直接控制浏览器，实际点击链接，填写登录信息，几乎
就像是有一个人类用户在与页面交互。与 Requests 和 Beautiful Soup 相比， Selenium
允许你用高级得多的方式与网页交互。但因为它启动了 Web 浏览器， 假如你只是想
从网络上下载一些文件，会有点慢，并且难以在后台运行。
1. 启动selenium控制的浏览器
```
from selenium import webdriver
browser = webdriver.Firefox()
browser.get('http://inventwithpython.com')

```

2. 在页面中寻找元素

3. 点击页面

4. 填写并提交表单

5. 发送特殊键

6. 点击浏览器按钮

### 处理Excel电子表格
#### Excel文档

#### 安装openpyxl模块

#### 读取Excel文档
1. 用openpyxl模块打开Excel文档
```
import openpyxl
wb = openpyxl.load_workbook('example.xlsx')
```

2. 从工作簿中取得工作表
调用 get_sheet_names()方法可以取得工作簿中所有表名的列表。

3. 从表中取得单元格
有了 Worksheet 对象后，就可以按名字访问 Cell 对象。
```
import openpyxl
wb = openpyxl.load_workbook('example.xlsx')
sheet = wb.get_sheet_by_name('Sheet1')
sheet['A1']
```

4. 列字母和数字之间的转换
要从字母转换到数字，就调用 openpyxl.cell.column_index_from_string()函数。
要从数字转换到字母，就调用 openpyxl.cell.get_column_letter()函数。

5. 从表中取得行和列


6. 工作簿、工作表、单元格

#### 写入Excel文档
OpenPyXL 也提供了一些方法写入数据，这意味着你的程序可以创建和编辑电子
表格文件。

    1. 创建并保存Excel文档
    调用 openpyxl.Workbook()函数，创建一个新的空 Workbook 对象。

    2. 创建和删除工作表
    利用 create_sheet() and remove_sheet()方法，可以在工作簿中添加或删除工作表。

    3. 将值写入单元格

7. 设置单元格的字体风格

8. Font对象

9. 公式

10. 调整行和列

### 处理PDF和Word文档


### 处理CSV文件和JSON数据


### 保持时间、计划任务和启动程序
#### time模块
计算机的系统时钟设置为特定的日期、时间和时区。内置的 time 模块让 Python
程序能读取系统时钟的当前时间。在 time 模块中， time.time()和 time.sleep()函数是
最有用的模块。

1. time.time()函数
Unix 纪元是编程中经常参考的时间： 1970 年 1 月 1 日 0 点，即协调世界时
（UTC）。 time.time()函数返回自那一刻以来的秒数，是一个浮点值（回想一下，浮
点值只是一个带小数点的数）。这个数字称为 UNIX 纪元时间戳。\
纪元时间戳可以用于剖析代码，也就是测量一段代码的运行时间。如果在代码块开
始时调用 time.time()， 并在结束时再次调用，就可以用第二个时间戳减去第一个，得到
这两次调用之间经过的时间。

2. time.sleep()函数
如果需要让程序暂停一下，就调用 time.sleep()函数，并传入希望程序暂停的秒数。

#### 数字四舍五入
在处理时间时，你会经常遇到小数点后有许多数字的浮点值。为了让这些值更
易于处理，可以用 Python 内置的 round()函数将它们缩短，该函数按照指定的精度
四舍五入到一个浮点数。只要传入要舍入的数字，再加上可选的第二个参数，指明
需要传入到小数点后多少位。



#### datetime模块
time 模块用于取得 Unix 纪元时间戳，并加以处理。但是，如果以更方便的格
式显示日期，或对日期进行算术运算，就应该使用 datetime 模块。


### 发送电子邮件和短信


### 操作图像


### 用GUI自动化控制键盘和鼠标