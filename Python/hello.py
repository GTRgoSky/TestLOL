#输入与输出
'''
print('The quick brown fox', 'jumps over', 'the lazy dog')
print('加法：', 100 + 300, '乘法：', 1024*768)
name = input('请输入一个姓名：')
print('hello,',name)
'''

# \一般用于转义，如果长字符串不进行转义可以写在r'内部（示例如下）
"""
print('I\' am using \\n \nfor a new line\n')
print(r'in r"" nothing will be transferred(转义), even if i use \n')
print('''\nline1
line2
line3''')  
"""

#布尔值(请注意大小写)
"""
print(3 > 2, True and True, True and False, 5 > 3 and 3 > 1, 
3 < 2 and 1 > 0, 1 > 2 or 2 > 1, 1 < 0 or 2 < 1, '\n')
###not运算是非运算，它是一个单目运算符，把True变成False，False变成True:
print(not True)
###一个判断语句
age = int(input('请输入年龄:'))
if age < 18 and True:
    print('you are not yet an adult')
else:
    print('you are an adult man')
"""

#数组
"""
classmates = ['Monday', 'Tuesday', 'wednesday']
###增加到数组最后一位append
classmates.append('Thursday')
_tips = '请输入索引，长度不超过：0-'+ str(len(classmates)-1)+ ':\n'
_index = int(input(_tips))
print(classmates[_index])
###增加数组insert(i,'')将''增加到置顶索引位置
classmates.insert(4, 'Friday')
###删除数组pop(i) 删除得位置索引，不填为最后一位
classmates.pop()
###tuple 不可变数组
classmates = ('Monday', 'Tuesday', 'wednesday')
print(classmates, '\n', classmates[1])
"""

"""
###快速生成数组
_list = list(range(5))
print(_list)

#循环
sum = 0
for x in _list:
    sum += x
    # print(x)
print(sum)    

###while 循环
_n = 0
while sum > 0:
    _n += 1
    sum -= 2
print(_n)
"""

#dict 字典
"""
_dict = {'a':1, 'b':2}
print(_dict['b'], 'a' in _dict, 'c' in _dict)
###dict 的get方法自己指定如果值不存在返回的value，如果存在则返回对应key值
print(_dict.get('a'), _dict.get('c',166))
### pop(key)删除指定key
"""

#set 去重、交集List
"""
_set1 = set([1,2,3,4,4])
print(_set1)
_set1.add(4)
_set1.add(5)
print(_set1)
_set1.remove(3)
print(_set1)
_set2 = set([1,3,4,6,8])
print(_set1 & _set2, _set1 | _set2)
for _i in _set1:
    print(_i)
"""

#声明函数 def
"""
###声明一个简单函数
def judgeX(x):
    ### isinstance(object, classinfo) Return true if the object argument is an instance(实例) of the classinfo argument,
    ### if not 相当于js中的！
    if not isinstance(x, (int, float)):
        ### raise 抛出异常 后面不在执行
        raise TypeError('bad operand type')
    if x == 10:
        print ('the parmas is same as 10')
    elif x > 10:
        print ('the parmas is greater than 10')
    else :
        print ('then parmas is smaller than 10')
    return x
_inX = int(input('请输入参数：'))
judgeX(_inX)
"""
####math模块 https://blog.csdn.net/ben_ben_niao/article/details/40955439 
# import math
"""
###返回多个值（涉及到引用包） 返回的值是一个tuple
def move(x, y, step, angle=0):
    nx = x + step * math.cos(angle)
    ny = y - step * math.sin(angle)
    return nx, ny
_r = x, y = move(100, 100, 60, math.pi/6)
print(x, y, '\n', _r)
"""

"""
#####练习：请定义一个函数quadratic(a, b, c)，接收3个参数，返回一元二次方程
##### ax2 + bx + c = 0 的两个解。
def quadratic(a, b, c):
    x1 = (-b + math.sqrt(math.pow(b,2) - 4 * a * c)) / (2 * a)
    x2 = (-b - math.sqrt(math.pow(b,2) - 4 * a * c)) / (2 * a)
    return x1, x2
_a = int(input())
_b = int(input())
_c = int(input())
__r = quadratic(_a, _b, _c)
print(__r)
"""
"""
###可变参数 使用方法如下： 接收的是一个tuple ()
def calc(*number):
    sum = 0
    for n in number:
        sum += n * n
    return sum
print(calc(1, 2, 3), calc(*{1, 2, 3}))
"""
"""
###关键字参数  接收的是一个dict {}
def person(name, age, **kw):
    print('name:', name, 'age:', age, 'other:', kw)
person('Adam', 45, gender='M', job='Engineer')
"""
##### 参数组合 顺序必须是：必选参数、默认参数、可变参数、命名关键字参数和关键字参数
"""
#######指定参数名为c，d 的关键字参数
def product1(a, b = 1, *, c, d):
    print(a, b, c, d)
product1(4, c=2, d=3)
"""
"""
#######未指定名称的关键字参数
def product2(a, b = 2, **arg):
    print(a, b, arg)
product2(1, e=3,v=4)
product2(6, 7, **{'c':1, 'd': 2})
"""
"""
#######关键字参数混合
def product3(a, b = 2, *, c, **d):
    print(a, b, c, d)
product3(6, 7, **{'c':1, 'd': 2, 'e': 4})
"""
"""
#######参数混合集中
def product4(a, b = 2, *c, **e):
    print(a,b,c,e)
product4(1, 2, *{'c'}, d = 4, **{'ef':6})
product4(1, 2, 3, 4, 5 , d = 4, **{'ef':6})
"""
"""
###递归函数
def fatc(n):
    if n == 1:
        return 1
    return n * fatc(n-1)
print(fatc(3))
#####尾递归 上面的方法占用多个栈帧 会造成内存溢出。 此方法只占用一个
def fatc_iter(n, product):
    if n == 1:
        return product
    return fatc_iter(n - 1, n * product)
def fatc2(n):
    return fatc_iter(n, 1)
print(fatc2(5))
"""
"""
#####汉诺塔移动算法 
def hmove(n, a, b, c):
    if n == 1:
        #一阶执行方式
        print(a, '--->', c)
    else:
        #二+阶执行方式。以acb a-c cab 的方式执行一阶（执行2次一阶）
        hmove(n - 1, a, c, b)
        print(a, '-->', c)
        hmove(n - 1, b, a, c)
def _homve(n, a, b, c):
    return hmove(n, a, b, c)
hmove(3,'A','B','C')
"""

"""
#切片 从下标0开始截取到下标2（3-1）
_List = [1, 2, 3, 4]
print(_List[0:3], _List[:3], _List[-1:], , _List[-3:-2])
###前10个数，每两个取一个：
_L = list(range(100))
print(_L[:10:2])
###所有数，每5个取一个:
print(_L[::5])
###字符串'xxx'也可以看成是一种list，每个元素就是一个字符。因此，字符串也可以用切片操作，只是操作结果仍是字符串
print('ABCDEFG'[:3], 'ABCDEFG'[::2])
#####利用切片操作，实现一个trim()函数，去除字符串首尾的空格，注意不要调用str的strip()方法：
def trim(_str):
    if 0 == len(_str):
        return '字符串为空'
    while ' ' == _str[0]:
        _str = _str[1:]
        if len(_str) == 0:
            return "字符串为前空"
    while ' ' == _str[-1]:
        _str = _str[:-1]
        if len(_str) == 0:
            return "字符串为后空"
    return _str
print(trim(' hello! '), trim(" "), trim(""), trim(" hello!"), trim("hello! "))
"""

#迭代
"""
_d = {'a': 1, 'b': 2, 'c': 3}
for k,v in _d.items():
    print('Key is:',k,', Values:', v)
###判断对象是否可以迭代 通过collections.abc模块的Iterable类型判断
from collections.abc import Iterable
print(isinstance('abc', Iterable)) # str是否可迭代 isinstance(o1,o2)判断o1是否是o2的实例
print(isinstance(123, Iterable)) # 整形不可以被迭代
###Python内置的enumerate函数可以把一个list变成索引-元素对，这样就可以在for循环中同时迭代索引和元素本身：
for i, value in enumerate(['A', 'B', 'C']):
    print('Index is:',i,', Values:', value)
for x, y in [(1, 1), (2, 4), (3, 9)]:
    print(x, y)
"""
#####使用迭代查找一个list中最小和最大值，并返回一个tuple：
def findMinAndMax(_list):
    if len(_list) == 0:
        return (None, None)
    else:
        Max = Min = _list[0]
        for v in _list:
            if v > Max:
                Max = v 
            if v < Min:
                Min = v
    return (Min, Max)
print(findMinAndMax([0,1,3,7]), findMinAndMax([]))