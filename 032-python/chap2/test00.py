#!usr/bin/sh
# -*- coding:utf8 -*-
# collatz序列
def collatz(num):
    if num%2==0:
        num /=2
        print('偶数得到的结果是'+str(num))
    else:
        num = 3*num + 1
        print('奇数得到的结果是'+ str(num))
    if num !=1:
        collatz(num)
    else:
      return num

print('请输入一个数字：')
try:
    getNum = int(input())
except RuntimeError:
    print('Error:非法数字')

collatz(getNum)
