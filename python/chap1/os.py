# !usr/bin/sh
# -*-coding:utf8 -*-

import os
import shelve
import shutil
path = os.getcwd()
print '当前目录为',path
print '当前目录的大小是',os.path.getsize(path)
print '当前目录有',os.listdir(path)


readmeFile =  open(path + '\\README.md')
readmeContent = readmeFile.readlines()
print readmeContent

os.chdir('c:\\')
shutil.copy('c:\\offline_FtnInfo.txt',path)
os.unlink(path +'\\offline_FtnInfo.txt')