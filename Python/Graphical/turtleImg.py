# 海龟绘图
# 导入turtle包的所有内容:
from turtle import *

"""
# 设置笔刷宽度:
width(4)

# 前进:
forward(200)
# 右转90度:
right(90)

# 笔刷颜色:
pencolor('red')
forward(100)
right(90)

pencolor('green')
forward(200)
right(90)

pencolor('blue')
forward(100)
right(90)

# 调用done()使得窗口等待被关闭，否则将立刻关闭窗口:
done()

"""

"""
def drawStar(x, y):
    pu()
    goto(x, y) #画笔移动到当前位置
    pd()
    # set heading: 0
    seth(0) # 前进的方向
    for i in range(5):
        fd(40)# 向前走40 #
        rt(144)

for x in range(0, 250, 50):
    drawStar(x, 0)

'''
1.forward() | fd():向前移动指定的距离
2.backward() | bk() | back():向后移动指定的距离
3.right() | rt():以角度单位向右转动
4.left() | lt():以角度单位向左转动
5.goto() | steps() | setposition()：移动到绝对位置，如果笔落下，画线，不改变方向.setpos(60,30)
6.setx():设置第一个坐标的值即X方向
7.sety():设置第二个坐标的值即Y方向
8.setheading() | seth(): 将方向设置为to_angle.就是东西南北方向
具体如下：
标准模式：0 - 东  90 - 北 180 - 西 270 - 南  标志模式 0- 北   90- 东    180- 南    270 - 西
9.home() : 移动到原点 - 坐标（0，0）：并将其标题设置为其起始方向
'''

done()
"""
"""

from turtle import *

# 设置色彩模式是RGB:
colormode(255)

lt(90)

lv = 14
l = 120
s = 45

width(lv)

# 初始化RGB颜色:
r = 0
g = 0
b = 0
pencolor(r, g, b)

penup()
bk(l)
pendown()
fd(l)

def draw_tree(l, level):
    global r, g, b
    # save the current pen width
    w = width()

    # narrow the pen width
    width(w * 3.0 / 4.0)
    # set color:
    r = r + 1
    g = g + 2
    b = b + 3
    pencolor(r % 200, g % 200, b % 200)

    l = 3.0 / 4.0 * l

    lt(s)
    fd(l)

    if level < lv:
        draw_tree(l, level + 1)
    bk(l)
    rt(2 * s)
    fd(l)

    if level < lv:
        draw_tree(l, level + 1)
    bk(l)
    lt(s)

    # restore the previous pen width
    width(w)

speed("fastest")

draw_tree(l, 4)

done()
"""

from random import *
from math import *

def tree(n, l):
    pd() # 下笔
    # 阴影效果
    t = cos(radians(heading() + 45)) / 8 + 0.25
    pencolor(t, t, t)
    pensize(n / 3)
    forward(l) # 画树枝


    if n > 0:
        b = random() * 15 + 10 # 右分支偏转角度
        c = random() * 15 + 10 # 左分支偏转角度
        d = l * (random() * 0.25 + 0.7) # 下一个分支的长度
        # 右转一定角度，画右分支
        right(b)
        tree(n - 1, d)
        # 左转一定角度，画左分支
        left(b + c)
        tree(n - 1, d)

        # 转回来
        right(c)
    else:
        # 画叶子
        right(90)
        n = cos(radians(heading() - 45)) / 4 + 0.5
        pencolor(n, n*0.8, n*0.8)
        circle(3)
        left(90)

        # 添加0.3倍的飘落叶子
        if(random() > 0.7):
            pu()
            # 飘落
            t = heading()
            an = -40 + random()*40
            setheading(an)
            dis = int(800*random()*0.5 + 400*random()*0.3 + 200*random()*0.2)
            forward(dis)
            setheading(t)


            # 画叶子
            pd()
            right(90)
            n = cos(radians(heading() - 45)) / 4 + 0.5
            pencolor(n*0.5+0.5, 0.4+n*0.4, 0.4+n*0.4)
            circle(2)
            left(90)
            pu()

            #返回
            t = heading()
            setheading(an)
            backward(dis)
            setheading(t)

    pu()
    backward(l)# 退回

bgcolor(0.5, 0.5, 0.5) # 背景色
ht() # 隐藏turtle
speed(0) # 速度，1-10渐进，0最快
tracer(0, 0)
pu() # 抬笔
backward(100)
left(90) # 左转90度
pu() # 抬笔
backward(300) # 后退300
tree(12, 100) # 递归7层


done()