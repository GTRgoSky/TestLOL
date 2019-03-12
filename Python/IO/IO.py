# 文件读写
"""
由于文件读写时都有可能产生IOError，
一旦出错，后面的f.close()就不会调用。
所以，为了保证无论是否出错都能正确地关闭文件，
我们可以使用try ... finally来实现：
"""
"""
try:
    f = open('./test.txt', 'r')
    print(f.read())
finally:
    if f:
        f.close()
"""
### Python引入了with语句来自动帮我们调用close()方法
"""
with open('./test.txt', 'r') as f:
    print(f.read())
"""
"""
为了防止文件过大导致内存爆掉
反复调用read(size)方法，每次最多读取size个字节的内容
另外，调用readline()可以每次读取一行内容
调用readlines()一次读取所有内容并按行返回list
文件同一行只能用一种方式读取，读取过别的方法将不在读取
"""
"""
with open('./test.txt', 'r') as f:
    # print('second line: %s' % f.readlines()[1])
    # print('first Line :', f.readline())
    # for line in f.readlines():
    #     print(line.strip()) # 把末尾的'\n'删掉
    #print(f.read(1)) #返回 H
"""

### 前面讲的默认都是读取文本文件，并且是UTF-8编码的文本文件。
# 要读取二进制文件，比如图片、视频等等，
# 用'rb'模式打开文件即可
# f = open('/Users/michael/test.jpg', 'rb')

### 要读取非UTF-8编码的文本文件，
# 需要给open()函数传入encoding参数，例如，读取GBK编码的文件：
#  f = open('/Users/michael/gbk.txt', 'r', encoding='gbk')

### 遇到有些编码不规范的文件，
# 你可能会遇到UnicodeDecodeError，
# 因为在文本文件中可能夹杂了一些非法编码的字符。
# 遇到这种情况，open()函数还接收一个errors参数，
# 表示如果遇到编码错误后如何处理。最简单的方式是直接忽略： 
# f = open('/Users/michael/gbk.txt', 'r', encoding='gbk', errors='ignore')

### 写文件
"""
with open('./test2.txt', 'w') as f:
    f.write('\nuse code write')
"""
"""
### 以'w'模式写入文件时，如果文件已存在，会直接覆盖（相当于删掉后新写入一个文件）。
# 如果我们希望追加到文件末尾怎么办？
# 可以传入'a'以追加（append）模式写入。
with open('./test.txt', 'a') as f:
    f.write('\nuse code write')
"""

###### 测试读取 html js css
"""
with open('./index.html', 'r', encoding='utf-8', errors='ignore') as f:
    print(f.read())
"""
"""
with open('./index.css', 'r') as f:
    print(f.read())
"""
"""
with open('./index.js', 'r') as f:
    print(f.read())
"""
"""
with open('./index2.js', 'x') as f:
    f.write('function a(){}')
"""
"""
with open('./test.txt', 'r+') as f: #可读可写 覆盖
    t = f.read()
    t = t.replace('use code write', 'i changed txt ', 1) 
    f.seek(0, 0)# 重新设置文件读取指针到开头
    f.write(t)
"""

"""
https://yiyibooks.cn/xx/python_352/library/functions.html 搜open
'r'	打开阅读（默认）
'w'	打开写入，首先截断文件
'x'	打开独占创建，如果文件已经存在则失败
'a'	打开写入，追加到文件末尾（如果存在）
'b'	二进制模式
't'	文本模式（默认）
'+'	打开磁盘文件进行更新（读取和写入）
"""