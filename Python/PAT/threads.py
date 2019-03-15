# 多线程

### _thread (低级模块) 和 threading (高级模块)
"""
启动一个线程就是把一个函数传入并创建Thread实例，然后调用start()开始执行
"""
import time, threading

"""
##### 新线程执行的代码:
def loop():
    print('thread %s is running...' % threading.current_thread().name) #子线程名称 LoopThread
    n = 0
    while n < 5:
        n = n + 1
        print('thread %s >>> %s' % (threading.current_thread().name, n))
        time.sleep(1)
    print('thread %s ended.' % threading.current_thread().name)

print('thread %s is running...' % threading.current_thread().name) #主线程名称 MainThread
t = threading.Thread(target=loop, name='LoopThread') # 传入子线程执行函数 ，传入子线程执行名称
t.start()
t.join()
print('thread %s ended.' % threading.current_thread().name)
"""

##### 设置锁 lock
"""
# 假定这是你的银行存款:
lock = threading.Lock()
balance = 0

def change_it(n):
    # 先存后取，结果应该为0:
    global balance
    balance = balance + n
    balance = balance - n

def run_thread(n):
    for i in range(100):
        lock.acquire()
        try:
            # 放心地改吧:
            change_it(n)
        finally:
            # 改完了一定要释放锁:
            lock.release()
    # for i in range(100000): # 如果未加锁可能导致结果错乱，因为多线程共享参数
    #     change_it(n)

t1 = threading.Thread(target=run_thread, args=(5,))
t2 = threading.Thread(target=run_thread, args=(8,))
t1.start()
t2.start()
t1.join()
t2.join()
print(balance)
"""
"""
锁的好处就是确保了某段关键代码只能由一个线程从头到尾完整地执行，
坏处当然也很多，首先是阻止了多线程并发执行，包含锁的某段代码实际上只能以单线程模式执行，
效率就大大地下降了。其次，由于可以存在多个锁，不同的线程持有不同的锁，并试图获取对方持有的锁时，
可能会造成死锁，导致多个线程全部挂起，既不能执行，也无法结束，只能靠操作系统强制终止。
"""

##### 多核CPU

##### ThreadLocal 使多线程有私有变量的同时还能再函数间传递
"""
ThreadLocal最常用的地方就是为每个线程绑定一个数据库连接，HTTP请求，
用户身份信息等，这样一个线程的所有调用到的处理函数都可以非常方便地访问这些资源。
"""
# 创建全局ThreadLocal对象:
local_school = threading.local()

def process_student():
    # 获取当前线程关联的student:
    std = local_school.student
    print('Hello, %s (in %s)' % (std, threading.current_thread().name))

def process_thread(name):
    # 绑定ThreadLocal的student:
    local_school.student = name
    process_student()

t1 = threading.Thread(target= process_thread, args=('Alice',), name='Thread-A')
t2 = threading.Thread(target= process_thread, args=('Bob',), name='Thread-B')
t1.start()
t2.start()
t1.join()
t2.join()