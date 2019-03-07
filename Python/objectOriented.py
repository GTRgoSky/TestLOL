#!/usr/bin/env python3
# -*- coding: utf-8 -*-
'Class-栏目'
__author__ = 'Wings V'

# 类 Class
"""
### 声明第一个类
class Student(object):
    def __init__(self, name, age):
        self.name = name
        self.age = age
bart = Student('Iron Man', 40)
print(bart, bart.name, bart.age)#存储地址/姓名/年龄
"""

"""
### 数据封装
class Student(object):
    def __init__(self, name, score):
        self.name = name
        self.score = score
    def print_score(self):
        print('%s: %s' % (self.name, self.score))
    def get_grade(self):
        if self.score >= 90:
            return 'A'
        elif self.score >= 60:
            return 'B'
        else:
            return 'C'
bart = Student('Iron Man', 88)
bart.print_score()
print(bart.get_grade())
"""

"""
### 访问限制 如果要让内部属性不被外部访问，可以把属性的名称前加上两个下划线__
### 直接访问__name是因为Python解释器对外把__name变量改成了_Student__name，所以，仍然可以通过_Student__name来访问__name变量
class Student(object):
    def __init__(self, name, score):
        self.__name = name
        self.__score = score
    def get_name(self):
        return self.__name
    def get_score(self):
        return self.__score
    def set_score(self, score):
        if 0 <= score <= 100:
            self.__score = score
        else:
            raise ValueError('bad score')
    def print_score(self):
        print('%s: %s' % (self.__name, self.__score))
    def get_grade(self):
        if self.__score >= 90:
            return 'A'
        elif self.__score >= 60:
            return 'B'
        else:
            return 'C'
bart = Student('Iron Man', 88)
bart.print_score()
print(bart.get_grade(), bart.get_name(), bart.get_score())
bart.set_score(99)
print(bart.get_grade(), bart.get_name(), bart.get_score())
"""

"""
### 继承和多态
class MyDog(object): #len 其实调用的就是父类的__len__
    def __init__(self, name):
        self.name = name
    def __len__(self):
        return 99
dog = MyDog('nihao')
print(len(dog))

##### 配合getattr()、setattr()以及hasattr()，我们可以直接操作一个对象的状态
print(hasattr(dog, 'name'), getattr(dog, 'name'), setattr(dog, 'y', 19), getattr(dog, 'y', 404), getattr(dog, 'z', 404))
"""

"""
##### 为了统计学生人数，可以给Student类增加一个类属性，每创建一个实例，该属性自动增加
class Student(object):
    count = 0
    def __init__(self, name):
        self.name = name
        print('class', self.count)
        #self.count = self.count + 1#此方法不行，因为self指向实例
        Student.count += 1#直接指向父类
print(Student.count)
bart = Student('Bart')
print(Student.count)
lisa = Student('Bart')
print('Students:', Student.count)
"""

### 使用__slots__
"""
##### 还可以尝试给实例绑定一个方法
class Student(object):
    pass
s = Student()
def set_age(self, age): # 定义一个函数作为实例方法
    self.age = age
from types import MethodType
s.set_age = MethodType(set_age, s) # 给实例绑定一个方法
s.set_age(25) # 调用实例方法
print(s.age) # 测试结果
"""
"""
##### 限制实例的属性
class Student(object):
    __slots__ = ('name', 'age') # 用tuple定义允许绑定的属性名称
s = Student() # 创建新的实例
s.name = 'Michael' # 绑定属性'name'
print(s.name)
s.score = 99 # 绑定属性'score'
class GraduateStudent(Student):
    pass
g = GraduateStudent()
g.score = 9999
print(g.score)
"""
"""
### 使用@property 负责把一个方法变成属性调用的
class Student(object):
    @property
    def score(self):
        return self._score

    @score.setter
    def score(self, value):
        if not isinstance(value, int):
            raise ValueError('score must be an integer!')
        if value < 0 or value > 100:
            raise ValueError('score must between 0 ~ 100!')
        self._score = value
    @property
    def grade(self):#只读属性
        if self._score >= 90:
            return 'A'
        elif self._score >= 60:
            return 'B'
        else:
            return 'C'
s = Student()
s.score = 1
print(s.score, s.grade)
""" 
"""
##### 利用@property给一个Screen对象加上width和height属性，以及一个只读属性resolution
class Screen(object):

    def __init__(self, width, height):
        self._width = width
        self._height = height

    @property
    def width(self):
        return self._width
    @width.setter
    def width(self, value):
        if not isinstance(value, int):
            raise ValueError('score must be an integer!')
        if value < 0 or value > 10000:
            raise ValueError('score must between 0 ~ 100!')
        self._width = value

    @property
    def height(self):
        return self._height
    @width.setter
    def height(self, value):
        if not isinstance(value, int):
            raise ValueError('score must be an integer!')
        if value < 0 or value > 10000:
            raise ValueError('score must between 0 ~ 100!')
        self._height = value
    
    @property
    def resolution(self):
        return self._height * self._width
    
zfx = Screen(10, 8)
print(zfx.width, zfx.height, zfx.resolution)
zfx.width = 1024
zfx.height = 768
print(zfx.width, zfx.height, zfx.resolution)
"""

### 定制类
"""
##### __str__
class Student1(object):
    def __init__(self, name):
        self.name = name
class Student2(object):
    def __init__(self, name):
        self.name = name
    def __str__(self):#
        return 'Student object (name: %s)' % self.name
s = Student1('Michael')
s
print(Student1('Michael'))#输出实例存储地址
print(Student2('Michael'))#输出自定义的__str__返回值
"""
"""
##### __iter__ 用于for ... in循环 __iter__返回一个迭代对象 for循环就会不断调用该迭代对象的__next__()方法 直到遇到StopIteration错误时退出循环
class Fib(object):
    def __init__(self):
        self.a, self.b = 0, 1 # 初始化两个计数器a，b

    def __iter__(self):
        return self # 实例本身就是迭代对象，故返回自己

    def __next__(self):
        self.a, self.b = self.b, self.a + self.b # 计算下一个值
        if self.a > 100: # 退出循环的条件
            raise StopIteration()
        return self.a # 返回下一个值
    def __getitem__(self, n):
        if isinstance(n, int): # n是索引
            a, b = 1, 1
            for x in range(n):
                a, b = b, a + b
            return a
        if isinstance(n, slice): # n是切片
            start = n.start
            stop = n.stop
            if start is None:
                start = 0
            a, b = 1, 1
            L = []
            for x in range(stop):
                if x >= start:
                    L.append(a)
                a, b = b, a + b
            return L
for n in Fib():
    print(n)
##### __getitem__ 类似List取值
f = Fib()
print(f, f[0], f[1], f[2], f[3], f[4], f[:5])
"""
"""
##### __getattr__ 只有在没有找到属性的情况下，才调用__getattr__。 已有的属性，不会在__getattr__中查找
####### 实现一个动态调用
class Chain(object):
    def __init__(self, path=''):
        self._path = path

    def __getattr__(self, path):
        return Chain('%s/%s' % (self._path, path))

    def __call__(self, name):
        return Chain('%s/%s' % (self._path, name))

    def __str__(self):
        return self._path

    __repr__ = __str__
    
print(Chain().status.user('test').timeline.list)

##### 能被调用的对象就是一个Callable对象 callable(判断对象)
##### 通过callable()函数，我们就可以判断一个对象是否是“可调用”对象。
print(callable(Chain), callable(max), callable([1, 2, 3]), callable('str'))
"""
from enum import Enum, unique
"""
Month = Enum('Month', ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'))
for name, member in Month.__members__.items():
    print(name, '=>', member, ',', member.value)
"""
"""
@unique #@unique装饰器可以帮助我们检查保证没有重复值。
class Weekday(Enum):
    Sun = 0 # Sun的value被设定为0
    Mon = 1
    Tue = 2
    Wed = 3
    Thu = 4
    Fri = 5
    Sat = 6
day1 = Weekday.Mon
print(day1, day1.value, Weekday(1))
"""
"""
####### 把Student的gender属性改造为枚举类型，可以避免使用字符串
@unique
class Gender(Enum):
    Male = 0
    Female = 1
    Wings = 2

class Student(object):
    def __init__(self, name, gender):
        self.name = name
        self.gender = gender
bart = Student('Bart', Gender.Male)
print(bart.gender, bart.gender.value, bart.gender == Gender.Male)
"""
### 使用元类 
##### type()函数可以查看一个类型或变量的类型
"""
class Hello(object):
    def hello(self, name='world'):
        print('Hello, %s.' % name)
h = Hello()
h.hello()
print(type(Hello))# Hello得类型为type
print(type(h))#h得类型是Hello
"""
"""
##### 可以用type创建Class 依次传入3个参数(class的名称, 继承的父类集合，注意Python支持多重继承，如果只有一个父类，别忘了tuple的单元素写法, class的方法名称与函数绑定，这里我们把函数fn绑定到方法名hello上)
def fn(self, name='world'): # 先定义函数
    print('Hello, %s.' % name)
def fnT(self, name='world'): # 先定义函数
    print('HelloT, %s.' % name)
Hello = type('Hello', (object,), dict(hello=fn)) # 创建Hello class
HelloT = type('Hello', (Hello,), dict(hello=fnT)) # 创建Hello class
h = Hello()
h.hello()
hT = HelloT()
hT.hello()
print(type(Hello))# Hello得类型为type
print(type(h))#h得类型是Hello
print(type(HelloT))#HelloT得类型为type
print(type(hT))#hT得类型是Hello
"""
##### metaclass 元类
####### 定义ListMetaclass，按照默认习惯，metaclass的类名总是以Metaclass结尾，以便清楚地表示这是一个metaclass
"""metaclass是类的模板，所以必须从`type`类型派生："""
class ListMetaclass(type):
    def __new__(cls, name, bases, attrs):
        attrs['add'] = lambda self, value: self.append(value)
        return type.__new__(cls, name, bases, attrs)# 他生成了一个类
####### 有了ListMetaclass，我们在定义类的时候还要指示使用ListMetaclass来定制类，传入关键字参数metaclass
"""
当我们传入关键字参数metaclass时, 指示Python解释器在创建MyList时,要通过ListMetaclass.__new__()来创建
在此，我们可以修改类的定义(再__new__中)，比如，加上新的方法，然后，返回修改后的定义。
__new__()方法接收到的参数依次是:
1、当前准备创建的类的对象(模板类[ListMetaclass]的实例对象)
2、类的名字（MyList）；
3、类继承的父类集合（[list] list是MyList的父类，不过生成新类是通过了metaclass）；
4、类的方法集合(MyList 的属性集合，是一个dist{}对象)。
"""
"相当于动态的给MyList创建（或者称为继承）了一个add方法(本身父类list并没有这个方法)"
class MyList(list, metaclass=ListMetaclass):
    pass
L = MyList()

####### 编写一个ORM(对象-关系映射)框架【一个类对应一个表】 【不用直接操作SQL语句】
"""下面为实现思路"""
# 想定义一个User类来操作对应的数据库表User ； 期待写出：
"""
父类Model和属性类型StringField、IntegerField是由ORM框架提供的，
剩下的魔术方法比如save()全部由metaclass自动完成
"""

"""
1、首先来定义Field类，它负责保存数据库表的字段名和字段类型
"""
class Field(object):

    def __init__(self, name, column_type):
        self.name = name
        self.column_type = column_type

    def __str__(self):
        # <self.__class__.__name__:self.name>
        return '<%s:%s>' % (self.__class__.__name__, self.name)
"""
2、在Field的基础上，
进一步定义各种类型的Field，比如StringField，IntegerField等等
"""
class StringField(Field):

    def __init__(self, name):
        super(StringField, self).__init__(name, 'varchar(100)')

class IntegerField(Field):

    def __init__(self, name):
        super(IntegerField, self).__init__(name, 'bigint')
"""
3、编写ModelMetaclass了
"""
class ModelMetaclass(type):

    def __new__(cls, name, bases, attrs):
        if name=='Model':#当前类的名字是 xxx 如果当先生成的类是Model则：
            return type.__new__(cls, name, bases, attrs)#不做处理直接返回
        print('Found model: %s' % name)
        mappings = dict()#生成一个dict {}
        for k, v in attrs.items():#循环attrs 生成 key-k 、 value-v
            if isinstance(v, Field):#如果v是Field的实例 子类的实例也属于Field
                print('Found mapping: %s ==> %s' % (k, v))
                mappings[k] = v#将对应的属性存到mappings中
        for k in mappings.keys():
            attrs.pop(k)#将上面保存的属性放到将要生成动态类的属性中
        attrs['__mappings__'] = mappings # 保存属性和列的映射关系
        attrs['__table__'] = name # 假设表名和类名一致
        return type.__new__(cls, name, bases, attrs)
"""
4、基类Model
"""
class Model(dict, metaclass=ModelMetaclass):

    def __init__(self, **kw):
        super(Model, self).__init__(**kw)#super调用父类的__init__方法 或 写super().__init__(**kw)接受一个dict

    def __getattr__(self, key):#没有找到属性的情况下调用并返回这个字段（相当于添加这个字段）
        try:
            return self[key]
        except KeyError:
            raise AttributeError(r"'Model' object has no attribute '%s'" % key)

    def __setattr__(self, key, value): #设置属性拦截 可以理解为在设置属性时进行数据劫持【有此方法不应再出现直接赋值方法eg:self.a = xxx】
        self[key] = value

    def save(self):
        fields = []
        params = []
        args = []
        for k, v in self.__mappings__.items():
            fields.append(v.name)
            params.append('?')
            args.append(getattr(self, k, None))#获取k的value值【获取实例属性的对应值】
        sql = 'insert into %s (%s) values (%s)' % (self.__table__, ','.join(fields), ','.join(params))#','.join(list)将list生成一个用，分割的字符串用（）包裹
        print('SQL: %s' % sql)
        print('ARGS: %s' % str(args))
class User(Model):
    # 定义类的属性到列的映射：
    id = IntegerField('id')
    name = StringField('username')
    email = StringField('email')
    password = StringField('password')

# 创建一个实例：
u = User(id=12345, name='Michael', email='test@orm.org', password='my-pwd')
# 保存到数据库：
u.save()
"""
当用户定义一个class User(Model)时，Python解释器首先在当前类User的定义中查找metaclass，
如果没有找到，就继续在父类Model中查找metaclass，
找到了，就使用Model中定义的metaclass的ModelMetaclass来创建User类，
也就是说，metaclass可以隐式地继承到子类，但子类自己却感觉不到。
"""
"""
在ModelMetaclass中，一共做了几件事情:
1、排除掉对Model类的修改
2、在当前类（比如User）中查找定义的类的所有属性，
如果找到一个Field属性，就把它保存到一个__mappings__的dict中，
同时从类属性中删除该Field属性，否则，容易造成运行时错误（实例的属性会遮盖类的同名属性）；
3、把表名保存到__table__中，这里简化为表名默认为类名。
"""