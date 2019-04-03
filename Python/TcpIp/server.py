# 服务端：
# 导入socket库:
import socket
import time, threading # 线程模块
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# 监听端口:
s.bind(('192.168.8.194', 8088))

# 等待连接的最大数量
s.listen(5)

print('Waiting for connection...')

'''
每个连接都必须创建新线程（或进程）来处理，否则，单线程在处理连接的过程中，无法接受其他客户端的连接：
'''
def tcplink(sock, addr):
    print('Accept new connection from %s:%s...' % addr)
    sock.send(b'Welcome!')
    while True:
        data = sock.recv(1024) # 用于接收数据 输入端
        time.sleep(1)
        if not data or data.decode('utf-8') == 'exit':
            break
        sock.send(('Hello, %s!' % data.decode('utf-8')).encode('utf-8')) #输出端
    sock.close()
    print('Connection from %s:%s closed.' % addr)

# 接受来自客户端的连接
while True:
    # 接受一个新连接:
    sock, addr = s.accept() #accept()会等待并返回一个客户端的连接
    # 创建新线程来处理TCP连接:
    t = threading.Thread(target=tcplink, args=(sock, addr))
    t.start()
