#主要用于输出运行日志，可以设置输出日志的等级、日志保存路径、日志文件回滚等
import logging; logging.basicConfig(level=logging.INFO)

# https://docs.python.org/zh-cn/3/library/asyncio-eventloop.html
import asyncio, os, json, time
from datetime import datetime

from aiohttp import web

def index(request):
    # web 返回 web.Response(body=b'<h1>Awesome</h1>')
    return web.Response(body = '<h1>Awesome</h1>'.encode('utf-8'), content_type='text/html')

async def init(loop):
    app = web.Application(loop=loop) # loop为Eventloop用来处理HTTP请求
    app.router.add_route('GET', '/', index)
    srv = await loop.create_server(app.make_handler(), '127.0.0.1', 8856)
    logging.info('server started at http://127.0.0.1:8856...')
    return srv

loop = asyncio.get_event_loop()
loop.run_until_complete(init(loop))
loop.run_forever()