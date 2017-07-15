# usr/bin/sh
# -*- coding:utf8 -*-

# @function listDeal
# @parma {list} list
def listDeal(list):
    listString = ''
    for i in range(0,len(list)):
        print(i)
        if i!=(len(list)-1):
            listString += list[i]+',';
        else:
            listString += 'and '+list[i]
    print(listString)
spam = ['apples','bananas','tofu','cats']
listDeal(spam)