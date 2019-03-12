# 操作文件和目录
import os
# print(os.name) # 操作系统类型
# print(os.path.abspath('.')) # 查看当前目录的绝对路径:?
# _path = os.path.abspath('.')
# 在某个目录下创建一个新目录，首先把新目录的完整路径表示出来:
# os.path.join(_path, 'testdir')
# os.mkdir(_path+'/testdir')# 然后创建一个目录:
# os.rmdir(_path+'/testdir')# 删掉一个目录:

"""
把两个路径合成一个时，不要直接拼字符串，而要通过os.path.join()函数，
这样可以正确处理不同操作系统的路径分隔符。
在Linux/Unix/Mac下，os.path.join()返回这样的字符串 :part-1/part-2
而Windows下会返回这样的字符串：part-1\part-2
"""

"""
拆分路径时，也不要直接去拆字符串，而要通过os.path.split()函数，
这样可以把一个路径拆分为两部分，后一部分总是最后级别的目录或文件名：
os.path.split('/Users/michael/testdir/file.txt'):
('/Users/michael/testdir', 'file.txt') #得到一个trip
"""

"""
os.path.splitext()可以直接让你得到文件扩展名，很多时候非常方便：
os.path.splitext('/path/to/file.txt')
('/path/to/file', '.txt')
"""

# os.rename('test.txt', 'test.py') # 对文件重命名:

# os.remove('test.py') # 删掉文件:

# shutil模块提供了copyfile()的函数 复制文件

### 我们要列出当前目录下的所有目录 dir 文件夹
# print([x for x in os.listdir('.') if os.path.isdir(x)])

### 要列出所有的.py文件 file 文件
# print([x for x in os.listdir('.') if os.path.isfile(x) and os.path.splitext(x)[1]=='.py'])

"""
for x in os.listdir('.'):#列出当且列表下的所有文件&&文件夹
    print(x)
"""

##### 编写一个程序，能在当前目录以及当前目录的所有子目录下查找文件名包含指定字符串的文件，并打印出相对路径。
"""
def serchPath(path, name):
    for em in os.listdir(path):
        if os.path.isfile(os.path.join(path, em)):#isfile 要绝对路径
            if name in em:
                print(em, '=>', os.path.join(path, em))
        else:
            print(os.path.join(path, em),2)
            serchPath(os.path.join(path, em), 'py')

if __name__ == "__main__":
    serchPath(os.path.abspath('.'),'py')
"""

##### 利用os模块编写一个能实现dir -l输出的程序
"""
from datetime import datetime
pwd = os.path.abspath('.')
# 获取文件夹下文件个数，只取一层
print('      Size     Last Modified  Name')
print('------------------------------------------------------------')
for f in os.listdir(pwd):
    fsize = os.path.getsize(f)#获取大小
    mtime = datetime.fromtimestamp(os.path.getmtime(f)).strftime('%Y-%m-%d %H:%M')#时间格式化
    flag = '/' if os.path.isdir(f) else ''#如果是文件则flag = / 否则为''
    print('%10d  %s  %s%s' % (fsize, mtime, f, flag))
"""

"""
%c	转换成字符（ASCII 码值，或者长度为一的字符串）
%r	优先用repr()函数进行字符串转换
%s	优先用str()函数进行字符串转换
%d / %i	转成有符号十进制数
%u	转成无符号十进制数
%o	转成无符号八进制数
%x / %X	转成无符号十六进制数（x / X 代表转换后的十六进制字符的大小写）
%e / %E	转成科学计数法（e / E控制输出e / E）
%f / %F	转成浮点数（小数部分自然截断）
%g / %G	%e和%f / %E和%F 的简写
%%	输出% （格式化字符串里面包括百分号，那么必须使用%%）
"""

### 序列化 pickle
import pickle
d = dict(name='Bob', age=20, score=88)
# print(pickle.dumps(d))#
##### file-like Object
"""
像open()函数返回的这种有个read()方法的对象，在Python中统称为file-like Object。
除了file外，还可以是内存的字节流，网络流，自定义流等等。
file-like Object不要求从特定类继承，只要写个read()方法就行。
"""
"""
f = open('./byte.txt', 'wb')
pickle.dump(d, f)
f.close()
"""
"""
with open('./byte.txt', 'rb') as f:
    m = pickle.load(f)
    print(m)
"""

"""
JSON类型            Python类型
  {}	              dict
  []	              list
  "string"	          str
  1234.56	        int或float
  true/false	    True/False
  null	              None
"""

### 如何把Python对象变成一个JSON
import json
# print(json.dumps(d))

##### dump()方法可以直接把JSON写入一个file-like Object
"""
要把JSON反序列化为Python对象:
loads() 把JSON的字符串反序列化，
load() 从file-like Object中读取字符串并反序列化
"""
json_str = '{"age": 20, "score": 88, "name": "Bob"}'
"""
print(json.loads(json_str))
with open('./json.txt', 'w') as f:
    f.write(json.dumps(d))
with open('./json.txt', 'r') as f:
    m = json.load(f)
    print(m,1) #都出来是一个dict {'name': 'Bob', 'age': 20, 'score': 88}
    # print(f.read(), 2) #读出来是一个json '{"name": "Bob", "age": 20, "score": 88}'
"""

### JSON进阶
"""
json.dump(obj, fp, skipkeys=False, ensure_ascii=True, 
        check_circular=True, allow_nan=True, cls=None, 
        indent=None, separators=None, default=None, 
        sort_keys=False, **kw)
可选参数default就是把任意一个对象变成一个可序列为JSON的对象，
我们只需要为Student专门写一个转换函数，再把函数传进去即可：
"""

class Student(object):
    def __init__(self, name, age, score):
        self.name = name
        self.age = age
        self.score = score

# s = Student('Bob', 20, 88)
"""
def student2dict(std): #转换函数
    return {
        'name': std.name,
        'age': std.age,
        'score': std.score
    }
print(json.dumps(s, default=student2dict)) #default传入转换函数即可序列化实例成Json
"""
"""
不过，下次如果遇到一个Teacher类的实例，照样无法序列化为JSON。我们可以偷个懒，把任意class的实例变为dict：
因为通常class的实例都有一个__dict__属性，它就是一个dict，用来存储实例变量。也有少数例外，
比如定义了__slots__的class
"""
# print(json.dumps(s, default=lambda obj: obj.__dict__))

"""
同样的道理，如果我们要把JSON反序列化为一个Student对象实例，
loads()方法首先转换出一个dict对象，
然后，我们传入的  object_hook  函数负责把dict转换为Student实例：
"""
"""
def dict2student(d):
    return Student(d['name'], d['age'], d['score'])
print(json.loads(json_str, object_hook=dict2student))#将json转成实例
"""
####### 对中文进行JSON序列化时，json.dumps()提供了一个ensure_ascii参数，观察该参数对结果的影响：
"""
ensure_ascii为true（这是默认值），则输出将保证所有传入的非ASCII字符都转义。
如果ensure_ascii为false，则这些字符将按原样输出。
"""
obj = dict(name='小明', age=20)
s = json.dumps(obj, ensure_ascii=True)
f = json.dumps(obj, ensure_ascii=False)
print(s,'\n',f)