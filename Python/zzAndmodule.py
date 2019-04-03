# 正则表达式 和常用内置模块：

### 正则表达式篇：

import re

"""
##### 请尝试写一个验证Email地址的正则表达式。版本一应该可以验证出类似的Email：
re_email = re.compile(r'\S+?@\w+\.{1}com')
def is_valid_email(addr):
    global re_email
    # print(re_email.match(addr)[0])
    if(re_email.match(addr)):
        print(re_email.match(addr)[0])
        return True
    print('-------------\n',addr,'is not a email','\n-------------')
    return False 

# assert is_valid_email('someone@gmail.com')
# assert is_valid_email('bill.gates@microsoft.com')
# assert not is_valid_email('bob#example.com')
# assert not is_valid_email('mr-bob@example.com')
print(is_valid_email('someone@gmail.com'),is_valid_email('bill.gates@microsoft.com'),
is_valid_email('bob#example.com'), is_valid_email('mr-bob@example.com'))
"""

### 常用内置模块篇：

##### collections模块
from collections import namedtuple, deque, defaultdict, OrderedDict
"""
tuple 又名：元组
格式 (1,2,) 不可变（一旦初始化，无法修改）
"""
####### namedtuple 集合类
"""
namedtuple是一个函数，它用来创建一个自定义的tuple对象，并且规定了tuple元素的个数，并可以用属性而不是索引来引用tuple的某个元素。
这样一来，我们用namedtuple可以很方便地定义一种数据类型，它具备tuple的不变性，又可以根据属性来引用，使用十分方便。
常规tuple 只能用下标标识tuple[0]
"""
"""
Point = namedtuple('Point', ['x', 'y'])
p = Point(1, 2)
print(p.x, p.y)
"""

####### deque
"""
使用list存储数据时，按索引访问元素很快，但是插入和删除元素就很慢了，
因为list是线性存储，数据量大的时候，插入和删除效率很低。

deque是为了高效实现插入和删除操作的双向列表，适合用于队列和栈

deque除了实现list的append()和pop()外，还支持appendleft()和popleft()，
这样就可以非常高效地往头部添加或删除元素
"""
"""
q = deque(['a', 'b', 'c'])
q.append('x')
q.appendleft('y')
print(q)
q.pop()
print(q)
"""

####### defaultdict
"""
dict 又名：字典 
类似于对象Object {key：value}
取值 dict[key]
优势： 查询速度快

使用dict时，如果引用的Key不存在，就会抛出KeyError。如果希望key不存在时，返回一个默认值，就可以用defaultdict
"""
# dd = defaultdict(lambda: 'N/A')
# print(dd['dsa'])#本来应该报错，现在返回 N/A

####### OrderedDict
"""
使用dict时，Key是无序的。在对dict做迭代时，我们无法确定Key的顺序
如果要保持Key的顺序，可以用OrderedDict
OrderedDict的Key会按照插入的顺序排列，不是Key本身排序  # 按照插入的Key的顺序返回
"""
"""
d = dict([('a', 1), ('b', 3), ('c', 2)])
od = OrderedDict([('a', 1), ('b', 2), ('c', 3)])
print(d, '\n', od, '\n',  list(od.keys()), '\n', dict(od))

######### OrderedDict可以实现一个FIFO（先进先出）的dict，当容量超出限制时，先删除最早添加的Key
class LastUpdatedOrderedDict(OrderedDict):

    def __init__(self, capacity):
        super(LastUpdatedOrderedDict, self).__init__()
        self._capacity = capacity

    def __setitem__(self, key, value):
        containsKey = 1 if key in self else 0
        if len(self) - containsKey >= self._capacity:
            last = self.popitem(last=False)
            print('remove:', last)
        if containsKey:
            del self[key]
            print('set:', (key, value))
        else:
            print('add:', (key, value))
        OrderedDict.__setitem__(self, key, value)
"""

##### ChainMap


##### contextlib
from contextlib import contextmanager

class Query(object):

    def __init__(self, name):
        self.name = name

    # def __enter__(self):
    #     print('Begin')
    #     return self

    # def __exit__(self, exc_type, exc_value, traceback):
    #     if exc_type:
    #         print('Error')
    #     else:
    #         print('End')

    def query(self):
        print('Query info about %s...' % self.name)

# with Query('Bob') as q:
#     q.query()

# @contextmanager
# def create_query(name):
#     print('Begin')
#     q = Query(name)
#     yield q
#     print('End')

# with create_query('Bob') as q:
#     q.query()

# @contextmanager
# def tag(name):
#     print("<%s>" % name)
#     yield
#     print("</%s>" % name)

# with tag("h1"):
#     print("hello")
#     print("world")

##### urllib urllib提供了一系列用于操作URL的功能。
from urllib import request, parse

"""
with request.urlopen('https://www.baidu.com') as f:
    data = f.read()
    print('Status:', f.status, f.reason, 'end')
    for k, v in f.getheaders():
        print('%s: %s' % (k, v))
    print('Data:', data.decode('utf-8'))
"""

"""
如果我们要想模拟浏览器发送GET请求，就需要使用Request对象，
通过往Request对象添加HTTP头，我们就可以把请求伪装成浏览器。
"""
"""
req = request.Request('http://www.douban.com/')
req.add_header('User-Agent', 'Mozilla/6.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/8.0 Mobile/10A5376e Safari/8536.25')
with request.urlopen(req) as f:
    print('Status:', f.status, f.reason)
    for k, v in f.getheaders():
        print('%s: %s' % (k, v))
    print('Data:', f.read().decode('utf-8'))
"""

"""
'''
如果要以POST发送一个请求，只需要把参数data以bytes形式传入
'''

print('Login to weibo.cn...')
email = input('Email: ')
passwd = input('Password: ')
login_data = parse.urlencode([
    ('username', email),
    ('password', passwd),
    ('entry', 'mweibo'),
    ('client_id', ''),
    ('savestate', '1'),
    ('ec', ''),
    ('pagerefer', 'https://passport.weibo.cn/signin/welcome?entry=mweibo&r=http%3A%2F%2Fm.weibo.cn%2F')
])

req = request.Request('https://passport.weibo.cn/sso/login')
req.add_header('Origin', 'https://passport.weibo.cn')
req.add_header('User-Agent', 'Mozilla/6.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/8.0 Mobile/10A5376e Safari/8536.25')
req.add_header('Referer', 'https://passport.weibo.cn/signin/login?entry=mweibo&res=wel&wm=3349&r=http%3A%2F%2Fm.weibo.cn%2F')

with request.urlopen(req, data=login_data.encode('utf-8')) as f:
    print('Status:', f.status, f.reason)
    for k, v in f.getheaders():
        print('%s: %s' % (k, v))
    print('Data:', f.read().decode('utf-8'))

"""

"""
'''
利用urllib读取JSON，然后将JSON解析为Python对象：
'''
import json
def fetch_data(url):
    req = request.Request(url)  # 请求url（GET请求）
    with request.urlopen(req) as f:     # 打开url请求（如同打开本地文件一样）
        return json.loads(f.read().decode('utf-8'))  # 读数据 并编码同时利用json.loads将json格式数据转换为python对象

URL = 'http://m.maoyan.com/ajax/movieOnInfoList?token='
data = fetch_data(URL)
print(data, '\n' ,data['movieIds'])
print('ok')
"""
"""
from xml.parsers.expat import ParserCreate

class DefaultSaxHandler(object):
    def start_element(self, name, attrs):
        print('sax:start_element: %s, attrs: %s' % (name, str(attrs)))

    def end_element(self, name):
        print('sax:end_element: %s' % name)

    def char_data(self, text):
        print('sax:char_data: %s' % text)

xml = r'''<?xml version="1.0"?>
<ol>
    <li><a href="/python">Python</a></li>
    <li><a href="/ruby">Ruby</a></li>
</ol>
'''

handler = DefaultSaxHandler()
parser = ParserCreate()
parser.StartElementHandler = handler.start_element
parser.EndElementHandler = handler.end_element
parser.CharacterDataHandler = handler.char_data
parser.Parse(xml)
"""
from html.parser import HTMLParser
from html.entities import name2codepoint
from urllib import request

class MyHTMLParser(HTMLParser):
    def __init__(self):
        HTMLParser.__init__(self)
        self._title = [False]
        self._time = [False]
        self._place = [False]
        self.time = ''  # 用于拼接时间

    def _attr(self, attrlist, attrname):
        for attr in attrlist:
            if attr[0] == attrname:
                return attr[1]
        return None

    def handle_starttag(self, tag, attrs):
        if tag == 'h3' and self._attr(attrs, 'class') == 'event-title':
            self._title[0] = True
        if tag == 'time':
            self._time[0] = True
        if tag == 'span' and self._attr(attrs, 'class') == 'event-location':
            self._place[0] = True

    def handle_endtag(self, tag):
       if tag == 'time':
           self._time.append(self.time)  # 将time完整内容放入self._time
           self.time = ''  # 初始化 self.time
           self._time[0] = False

    def handle_startendtag(self, tag, attrs):
        pass

    def handle_data(self, data):
        if self._title[0]:
            self._title.append(data)
            self._title[0] = False
        if self._time[0]:
            self.time += data  # 拼接time
        if self._place[0]:
            self._place.append(data)
            self._place[0] = False

    def handle_comment(self, data):
        pass

    def handle_entityref(self, name):
        if self._time[0]:
            self.time += '-'  

    def handle_charref(self, name):
        print('&#%s;' % name)

    def show_content(self):
        for n in range(1, len(self._title)):
            print('Title: %s' % self._title[n])
            print('Time:  %s' % self._time[n])
            print('Place: %s' % self._place[n])
            print('--------------------------------------')

url = "https://www.python.org/events/python-events/"
req = request.Request(url)
with request.urlopen(req) as f:
     html = f.read().decode('utf-8')

parser = MyHTMLParser()
parser.feed(html)
parser.show_content()