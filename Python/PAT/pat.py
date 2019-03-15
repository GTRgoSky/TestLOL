# 进程和线程
### 多进程

##### fork 多进程模块。
"""
Python的os模块封装了常见的系统调用，
其中就包括fork，可以在Python程序中轻松创建子进程
os.getpid() : 获取当前进程号
os.getppid() ： 获取父级进程号
"""
import os
"""
print('Process (%s) start...' % os.getpid())
# Only works on Unix/Linux/Mac:
pid = os.fork()
if pid == 0:
    print('I am child process (%s) and my parent is %s.' % (os.getpid(), os.getppid()))
else:
    print('I (%s) just created a child process (%s).' % (os.getpid(), pid))
"""
"""
结果：
Process (876) start...
I (876) just created a child process (877).
I am child process (877) and my parent is 876.
Linux和Unix 或者 Mac 可执行， Window 不能执行
"""

##### multiprocessing 提供了跨平台 的 多进程模块。
"""
from multiprocessing import Process
# 子进程要执行的代码
def run_proc(name):
    print('Run child process %s (%s)...' % (name, os.getpid()))

if __name__=='__main__':
    print('Parent process %s.' % os.getpid())
    p = Process(target=run_proc, args=('test',))
    print('Child process will start.')
    p.start()
    p.join()
    print('Child process end.')
"""
"""
执行结果如下：
Parent process 928.
Process will start.
Run child process test (929)...
Process end.
-----------------------------------
执行过程：
创建子进程时，只需要传入一个执行函数和函数的参数，
创建一个Process实例，用start()方法启动
join()方法可以等待子进程结束后再继续往下运行，通常用于进程间的同步
"""

##### Pool 进程池
"""
如果要启动大量的子进程，可以用进程池的方式批量创建子进程
"""
"""
from multiprocessing import Pool
import time, random
def long_time_task(name):
    print('Run task %s (%s)...' % (name, os.getpid()))
    start = time.time()
    time.sleep(random.random() * 3)#进程休息（阻塞执行）
    end = time.time()
    print('Task %s runs %0.2f seconds.' % (name, (end - start)))# %0.2f保留两位小数

if __name__=='__main__':
    print('Parent process %s.' % os.getpid())#当前进程号
    p = Pool(4)#开启4个进程，最多执行4个进程，所以第五个进程会等待其中一个结束后在执行
    for i in range(5):#循环5次
        p.apply_async(long_time_task, args=(i,))#（传入进程执行函数，传入函数所需参数（trip类型））
    print('Waiting for all subprocesses done...')
    p.close()#调用后不能添加新的进程 Process
    p.join()#必须在close之后，等待所有子进程执行完毕
    print('All subprocesses done.')
"""
"""
输出情况（不一定是这个顺序）：
Parent process 669.
Waiting for all subprocesses done...
Run task 0 (671)...
Run task 1 (672)...
Run task 2 (673)...
Run task 3 (674)...
Task 2 runs 0.14 seconds.#task2 执行结束，杀死进程号
Run task 4 (673)...#使用进程号673
Task 1 runs 0.27 seconds.
Task 3 runs 0.86 seconds.
Task 0 runs 1.41 seconds.
Task 4 runs 1.91 seconds.
All subprocesses done.
"""

##### 子进程 (上述情况子进程是自身，下面的子进程并不是自身)
####### subprocess 模块可以让我们非常方便地启动一个子进程，然后控制其输入和输出
import subprocess

"""
print('$ nslookup www.python.org')
r = subprocess.call(['nslookup', 'www.python.org'])
print('Exit code:', r)
"""

"""
print('$ nslookup')
p = subprocess.Popen(['nslookup'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
output, err = p.communicate(b'set q=mx\npython.org\nexit\n')# 相当于手动输入 set q=mx python.org exit
print(output.decode('oem'))# win下要用oem ，Linux用utf-8
print('Exit code:', p.returncode)
"""

##### 进程间通信 Queue、Pipes等多种方式
####### Queue
######### 在父进程中创建两个子进程，一个往Queue里写数据，一个从Queue里读数据
from multiprocessing import Process, Queue
import time, random
#写数据进程执行的代码:
def write(q):
    print('Process to write: %s' % os.getpid())#输出当前进程号
    for value in ['A', 'B', 'C']:
        print('Put %s to queue...' % value)
        q.put(value)#
        time.sleep(random.random())#进程休眠（阻塞

# 读数据进程执行的代码:
def read(q):
    print('Process to read: %s' % os.getpid())
    while True:
        value = q.get(True)
        print('Get %s from queue.' % value)

if __name__=='__main__':
    # 父进程创建Queue，并传给各个子进程：
    q = Queue()
    pw = Process(target=write, args=(q,))#赋值子进程 写
    pr = Process(target=read, args=(q,))#赋值子进程 读
    # 启动子进程pw，写入:
    pw.start()
    # 启动子进程pr，读取:
    pr.start()
    # 等待pw结束:
    pw.join()
    # pr进程里是死循环，无法等待其结束，只能强行终止:
    pr.terminate()