#! usr/bin/sh
# -*-  coding:utf8 -*-

import os
import shelve
cwd = os.getcwd();
print('当前工作目录是：',os.getcwd());

fileName = open(cwd+'\\README.md')
#fileContent = fileName.readlines()
#print('文件内容：',fileContent)

shelfFile = shelve.open('mydata')
cats = ['白猫','黑猫','红猫']
shelfFile['cats'] = cats
shelfFile.close()

shelfFile =shelve.open('mydata')
print(type(shelfFile))
print(shelfFile['cats'])