# 返回函数
"""
### 利用闭包返回一个计数器函数，每次调用它返回递增整数：
def createCounter():
    n = 0
    def counter():
        nonlocal n # nonlocal counter()中就不再将n视为counter的内部变量，createCounter函数中对n的定义就不会被屏蔽掉
        #global s 引用全局变量
        n = n + 1
        return n
    return counter
_F = createCounter()
print(_F(), _F(), _F())
"""
"""
###简单版
def createCounter():
    s = [0] 
    def counter():
        s[0] = s[0]+1
        return s[0]
    return counter
_F = createCounter()
print(_F(), _F(), _F())
"""

#匿名函数 lambda
"""
def is_odd(n):
    return n % 2 == 1
L = list(filter(is_odd, range(1, 20)))
"""
"""
###用匿名函数改编上边的代码
L = list(filter(lambda n: n%2 == 1, range(1, 20)))
print(L)
"""

#装饰器
#在代码运行期间动态增加功能的方式，称之为“装饰器”（Decorator）
### 请设计一个decorator，它可作用于任何函数上，并打印该函数的执行时间
"""
import time
def metric(text='你好,开始执行:'):
    def decorator(fun):
        def warpper(*args, **kw):
            print('%s %s()' % (text, fun.__name__))
            print ('执行时间:', time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())))
            return fun(*args, **kw)
        return warpper
    return decorator
@metric('好的,开始执行:')
def test():
    time.sleep(1)
    return 1
test()
@metric()
def fast(x, y):
    time.sleep(1)
    return x + y
fast(1, 2)
"""
"""
import time
def log(fun):
    def warpper(*args, **kw):
        print('begin call')
        fun(*args, **kw)
        print('begin end')
        return 1
    return warpper
@log
def test():
    print('执行中,正在执行程序')
    time.sleep(1)
    return 1
test()
"""

#偏函数
