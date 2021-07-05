#!usr/bin/sh
# -*- coding:utf8 -*-
# this is a guess number game
import random
secretNumber = random.randint(1,20)
print('请猜一个0到20的数')

# ask the player to guess 6 times.
for guessTaken in range(1,7):
    print('Take a guess.')
    guess = int(input())

    if guess < secretNumber:
        print('你猜的数字太小')
    elif guess > secretNumber:
        print('你猜的数字太大')
    else:
        break
if guess == secretNumber:
    print('好NB！你猜了'+str(guessTaken)+'次就猜中了')
else:
    print('很抱歉，谜底是'+str(secretNumber))