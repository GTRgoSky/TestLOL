class Dict(dict):

    def __init__(self, **kw):
        super().__init__(**kw)

    def __getattr__(self, key):
        try:
            return self[key]
        except KeyError:
            raise AttributeError(r"'Dict' object has no attribute '%s'" % key)

    def __setattr__(self, key, value):
        self[key] = value

### 文档测试 doctest
# 当模块正常导入时，doctest不会被执行。
# 只有在命令行直接运行时，才执行doctest。
# 所以，不必担心doctest会在非测试环境下执行。
import doctest
"""
class Dict2(dict):
    #下面代码被执行了
    '''
    Simple dict but also support access as x.y style.

    >>> d1 = Dict2()
    >>> d1['x'] = 100
    >>> d1.x
    100
    >>> d1.y = 200
    >>> d1['y']
    200
    >>> d2 = Dict2(a=1, b=2, c='3')
    >>> d2.c
    '3'
    >>> d2['empty']
    Traceback (most recent call last):
        ...
    KeyError: 'empty'
    >>> d2.empty
    Traceback (most recent call last):
        ...
    AttributeError: 'Dict2' object has no attribute 'empty'
    '''
    def __init__(self, **kw):
        super(Dict2, self).__init__(**kw)

    def __getattr__(self, key):
        try:
            return self[key]
        except KeyError:
            raise AttributeError(r"'Dict2' object has no attribute '%s'" % key)

    def __setattr__(self, key, value):
        self[key] = value

"""

##### 对函数fact(n)编写doctest并执行
def fact(n):
    '''
    Calculate 1*2*...*n

    >>> fact(1)
    1
    >>> fact(10)
    3628800
    >>> fact(-1)
    Traceback (most recent call last):
        ...
    ValueError
    '''
    #Traceback (most recent call last) 标识错误信息
    # ...  表示中间省略了一堆输出代码，最后输出错误类型 ValueError
    if n < 1:
        raise ValueError()
    if n == 1:
        return 1
    return n * fact(n - 1)

if __name__=='__main__':
    doctest.testmod()