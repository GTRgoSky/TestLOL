#高阶函数(Higher-order function)
"""
###变量可以指向函数 f = abs
###函数名也是变量 abs = 10
###传入函数
def add(x, y, f):
    return f(x) + f(y)
print(add(-5, 6, abs))
"""
### map/reduce
"""
##### map函数接收两个参数，一个是函数，一个是Iterable，map将传入的函数依次作用到序列的每个元素，并把结果作为新的Iterator返回。
def f(x):
    return x * x
R = map(f, [1,2,3,4,5,6,7,8,9])
print(R, list(R)) 
print(list(map(str, [1,2,3,4,5,6,7,8,9])))
"""
##### reduce 把结果继续和序列的下一个元素做累积计算 效果：reduce(f, [x1, x2, x3, x4]) = f(f(f(x1, x2), x3), x4)
##### reduce求和 
# from functools import reduce #引入reduce
"""
def add(x, y):
    return x + y
print(reduce(add, [1,3,5,7,9]))
"""
"""
#####通过 reduce 和 map 将str转成int
def fn(x, y):
    return x * 10 + y
def char2num(s):
    digits = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9}
    return digits[s]
print(reduce(fn, map(char2num, '13579')))
#######将上述过程整理成一个函数
Digits = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9}
def str2int(s):
    def fn(x, y):
        return x * 10 + y
    def char2num(s):
        return Digits[s]
    return reduce(fn, map(char2num, s))
print(str2int('12657'))
"""
#####把用户输入的不规范的英文名字，变为首字母大写，其他小写的规范名字 
####### 自写方法：
"""
print(str.upper())          # 把所有字符中的小写字母转换成大写字母
print(str.lower())          # 把所有字符中的大写字母转换成小写字母
print(str.capitalize())     # 把第一个字母转化为大写字母，其余小写
print(str.title())          # 把每个单词的第一个字母转化为大写，其余小写
""" 
"""
def normalize(name):
    def standardName(x):
        return x.capitalize() #capitalize 
    _l = list(map(standardName, name))
    print(_l)
    return _l
normalize(['adam', 'LISA', 'barT'])
print('adamLISAbarT tes'.title())
"""
"""
####### 网查答案：
def normalize(name):
    name = name[0].upper() + name[1:].lower()
    return name
print(list(map(normalize,['adam', 'LISA', 'barT'])))
"""
#####编写一个prod()函数，可以接受一个list并利用reduce()求积
"""
#######自写方法：
def prod(L):
    def multiplication(x, y):
        return x * y
    return reduce(multiplication, L)
print(prod([1,2,3,4,6]))
"""
"""
#######网查方法：
def prod(L):
    return reduce(lambda x, y: x*y, L)#lambda暂时不详细了解用法
print(prod([1,2,3,4,6]))
"""
"""
#####利用map和reduce编写一个str2float函数，把字符串'123.456'转换成浮点数123.456
Digits = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9}
def str2float(s):
    def mapUse(x):
        return Digits[x]
    def reduceUse(x, y):
        return 10 * x + y
    _n = s.find('.')#find寻找.的位置
    print(_n, len(s))
    if(_n != -1):
        print('Value is :', reduce(reduceUse, map(mapUse, s.replace('.', '')))/pow(10, len(s) - _n - 1))#pow(x, y),相当于x的y次方
    else:
        print('Value is :', reduce(reduceUse, map(mapUse, s.replace('.', ''))))
str2float('11.')
"""

###filter过滤序列 把传入的函数依次作用于每个元素，然后根据返回值是True还是False决定保留还是丢弃该元素。
"""
##### 在一个list中，删掉偶数，只保留奇数
def is_odd(n):
    return n % 2 == 1
print(list(filter(is_odd, [1,2,3,4,5,6,7,8])))
"""
"""
#####把一个序列中的空字符串删掉
def no_empty(s):
    return s and s.strip() # strip(x) 移除字符串头尾指定的字符x
print(list(filter(no_empty, ['A', '', 'B', None, 'C', '  '])))
"""
"""
####### 埃氏筛法 计算素数
def _odd_iter():
    n = 1
    while True:
        n = n + 2
        yield n
def _not_divisible(n):
    return lambda x: x % n > 0
def primes():
    yield 2 #第一次返回2
    it = _odd_iter() # 初始序列
    while True:
        n = next(it) #第一次拿it的yield为3
        yield n 
        it = filter(_not_divisible(n), it) #it 从新赋值 it为从 n 开始的并且整除 n 以外的值 (n第一次为3,it为除3以外的 Iterator 第一个值为5)
for n in primes():
    if n < 10:
        # print(n)
        pass
    else:
        break
"""
"""
####### 回数
def is_palindrome(n):
    #[::] a[i:j:s]  a[i:j:1]相当于a[i:j]  当s<0时，i缺省时，默认为-1. j缺省时，默认为-len(a)-1 所以a[::-1]相当于 a[-1:-len(a)-1:-1]，也就是从最后一个元素到第一个元素复制一遍，即倒序。
    return str(n) == str(n)[::-1]
print(list(filter(is_palindrome, range(1, 200))))
"""

### sorted 排序算法
"""
print(sorted([36, 5, -12, 9, -21]))#正常排序
print(sorted([36, 5, -12, 9, -21], key=abs))#通过绝对值排序
print(sorted(['bob', 'about', 'Zoo', 'Credit'], key=str.lower, reverse=True))#反转排序
print(sorted(['bob', 'about', 'Zoo', 'Credit'], key=str.lower))#字母排序先转换为小写
"""
##### 对下述列表分别按名字排序
L = [('Bob', 75), ('Adam', 92), ('Bart', 66), ('Lisa', 88)]
def useName(name):
    return name[0].lower()
#####按照分数排序
def Score(score):
    return int(score[1])
print('按照姓名排序(a-z):', sorted(L, key=useName), '\n', '按照分数排序(低到高):' ,sorted(L, key=Score))