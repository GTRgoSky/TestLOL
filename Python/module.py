#!/usr/bin/env python3
# -*- coding: utf-8 -*-
' a test module '
__author__ = 'Wings V'

#模块
import sys

def test():
    args = sys.argv #sys.argv获取一个list 第一个是文件名，第二个开始是执行命令后面跟的参数
    if len(args)==1:
        print('Hello, world!')
    elif len(args)==2:
        print('Hello, %s!' % args[1])
    else:
        print('Too many arguments!')

if __name__=='__main__':#直接执行文件时name == main 如果时引入则 !=
    test()