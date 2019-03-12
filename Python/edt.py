# 错误、调试和测试
### try
import logging #Python内置的logging模块可以非常容易地记录错误信息
"""
try:
    num = int(input('你输入数字'))
    print('try...')
    r = 10 / num
    print('result:', r)
except ValueError as e: #int()函数可能会抛出ValueError
    print('ValueError:', e)
    logging.exception(e)
except ZeroDivisionError as e:
    print('ZeroDivisionError:', e)
    logging.exception(e)
else:
    print('no error!')
finally:
    print('finally...')
print('END')
"""
"""
### raise  抛出错误
def foo(s):
    n = int(s)
    if n==0:
        raise ValueError('invalid value: %s' % s)
    return 10 / n

def bar():
    try:
        foo('0')
    except ValueError as e:
        print('ValueError!')
        raise

bar()
"""
"""
##### 运行下面的代码，根据异常信息进行分析，定位出错误源头，并修复
from functools import reduce

def str2num(s):
    return float(s) #将int改成float

def calc(exp):
    ss = exp.split('+')
    ns = map(str2num, ss)
    return reduce(lambda acc, x: acc + x, ns)

def main():
    r = calc('100 + 200 + 345')
    print('100 + 200 + 345 =', r)
    r = calc('99 + 88 + 7.6') # 小数类型但是44行要求整型
    print('99 + 88 + 7.6 =', r)

try:
    main()
except ZeroDivisionError as e:
    logging.exception(e)
finally:
    print('finally...')
"""
### 调试
"""
##### assert 断言
def foo(s):
    n = int(s)
    assert n != 0, 'n is zero!' 
    #assert的意思是，表达式n != 0应该是True，
    # 否则，根据程序运行的逻辑，后面的代码肯定会出错。
    #如果断言失败，assert语句本身就会抛出AssertionError（返回n is zero）
    return 10 / n

def main():
    foo('0')
main()
"""
# 启动Python解释器时可以用-O参数来关闭assert python -O 
# 会把所有的assert语句当成pass来看
"""
##### logging 和assert比，logging不会抛出错误，而且可以输出到文件
logging.basicConfig(level=logging.INFO)
# ↑ 有debug，info，warning，error等几个级别
# 当我们指定level=INFO时，logging.debug就不起作用了 
# 通过简单的配置，一条语句可以同时输出到不同的地方
s = '0'
n = int(s)
logging.info('n = %d' % n) #类似于console打印
print(10 / n)
"""
"""
##### pdb 启动Python的调试器pdb，让程序以单步方式运行，可以随时查看运行状态
# python -m pdb edt.py 
# 输入命令l来查看代码
# 输入命令n可以单步执行代码
# 任何时候都可以输入命令p 变量名来查看变量 p s ; p n
# 输入命令q结束调试，退出程序
s = '0'
n = int(s)
print(10 / n)
"""
####### pdb.set_trace() 优化pdb
"""
这个方法也是用pdb，但是不需要单步执行，
我们只需要import pdb，然后，在可能出错的地方放一个pdb.set_trace()，
就可以设置一个断点：
"""
"""
import pdb
s = '0'
n = int(s)
pdb.set_trace() # 运行到这里会自动暂停
print(10 / n)
"""

# 单元测试
"""
对函数abs()，我们可以编写出以下几个测试用例:

1、输入正数，比如1、1.2、0.99，期待返回值与输入相同；
2、输入负数，比如-1、-1.2、-0.99，期待返回值与输入相反；
3、输入0，期待返回0；
4、输入非数值类型，比如None、[]、{}，期待抛出TypeError。

把上面的测试用例放到一个测试模块里，就是一个完整的单元测试。
"""
import unittest
"""
from dycs.mydict import Dict
class TestDict(unittest.TestCase):#编写单元测试时，我们需要编写一个测试类，从unittest.TestCase继承。

    #以test开头的方法就是测试方法，不以test开头的方法不被认为是测试方法，测试的时候不会被执行。
    def test_init(self):
        d = Dict(a=1, b='test')
        self.assertEqual(d.a, 1) # 断言函数返回的结果与1相等
        self.assertEqual(d.b, 'test')
        self.assertTrue(isinstance(d, dict)) #期待返回True

    def test_key(self):
        d = Dict()
        d['key'] = 'value'
        self.assertEqual(d.key, 'value')

    def test_attr(self):
        d = Dict()
        d.key = 'value'
        self.assertTrue('key' in d)
        self.assertEqual(d['key'], 'value')

    def test_keyerror(self):
        d = Dict()
        with self.assertRaises(KeyError): # 另一种重要的断言就是期待抛出指定类型的Error，比如通过d['empty']访问不存在的key时，断言会抛出KeyError：
            value = d['empty']

    def test_attrerror(self):
        d = Dict()
        with self.assertRaises(AttributeError): # 而通过d.empty访问不存在的key时，我们期待抛出AttributeError：
            value = d.empty
    
    def setUp(self):
        print('setUp...')

    def tearDown(self):
        print('tearDown...')

if __name__ == '__main__':
    unittest.main()
#另一种运行方式： python -m unittest mydict_test

# setUp与tearDown 这两个方法会分别在每调用一个测试方法的前后分别被执行
### 用例 见上方法
"""
"""
##### 对Student类编写单元测试，结果发现测试不通过，请修改Student类
class Student(object):#自写，带异常抛出
    def __init__(self, name, score):
        self.name = name
        self.score = score
    def get_grade(self):
        try:
            if self.score > 100 or self.score < 0:
                raise ValueError('invalid value: %s, Value must Less than 100' % self.score)
            if self.score >= 80:
                return 'A'
            if self.score >= 60:
                return 'B'
            return 'C'
        except ValueError as e:
            print(e)
            raise

class Student2(object):#我网查
    def __init__(self, name, score):
        self.name = name
        self.score = score
    def get_grade(self):
        if self.score >= 80 and self.score <= 100:
            return 'A'
        elif self.score >= 60 and self.score <= 79:
            return 'B'
        elif self.score >= 0 and self.score <= 59:
            return 'C'
        else:
            raise ValueError('value is not between 0 and 100')

className = Student
#通过配置传参
class TestStudent(unittest.TestCase):
    def setUp(self):#每个测试用例开始前设置私有值
        self.className = className

    def test_80_to_100(self):
        s1 = className('Bart', 80)
        s2 = className('Lisa', 100)
        self.assertEqual(s1.get_grade(), 'A')
        self.assertEqual(s2.get_grade(), 'A')

    def test_60_to_80(self):
        s1 = className('Bart', 60)
        s2 = className('Lisa', 79)
        self.assertEqual(s1.get_grade(), 'B')
        self.assertEqual(s2.get_grade(), 'B')

    def test_0_to_60(self):
        s1 = className('Bart', 0)
        s2 = className('Lisa', 59)
        self.assertEqual(s1.get_grade(), 'C')
        self.assertEqual(s2.get_grade(), 'C')

    def test_invalid(self):
        s1 = className('Bart', -1)
        s2 = className('Lisa', 101)
        with self.assertRaises(ValueError):
            s1.get_grade()
        with self.assertRaises(ValueError):
            s2.get_grade()

if __name__ == '__main__':
    unittest.main()
"""

