# 使用MySQL
# 数据库连接

# 导入MySQL驱动:
import mysql.connector
"""
# 注意把password设为你的root口令:
conn = mysql.connector.connect(user='root', password='6768', database='python_use')
cursor = conn.cursor()

# 创建user表:
# cursor.execute('create table user (id varchar(20) primary key, name varchar(20))')
# 插入一行记录，注意MySQL的占位符是%s:
cursor.execute('insert into user (id, name) values (%s, %s)', ['12', 'Michael2'])

# 影响了几行
print(cursor.rowcount)

# 提交事务:
conn.commit()
cursor.close()

# 运行查询:
cursor = conn.cursor()
cursor.execute('select * from user where id = %s', ('1',))
values = cursor.fetchall()

print(values)

# 关闭Cursor和Connection:
cursor.close()
conn.close()
"""

### ORM技术
# Object-Relational Mapping，把关系数据库的表结构映射到对象上 
# SQLAlchemy

# 导入:
from sqlalchemy import Column, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# 创建对象的基类:
Base = declarative_base()

# 定义User对象:
class User(Base):
    # 表的名字:
    __tablename__ = 'user'

    # 表的结构:
    id = Column(String(20), primary_key=True)
    name = Column(String(20))
    # 一对多:
    # books = relationship('Book')

'''
class Book(Base):
    __tablename__ = 'book'

    id = Column(String(20), primary_key=True)
    name = Column(String(20))
    # “多”的一方的book表是通过外键关联到user表的:
    user_id = Column(String(20), ForeignKey('user.id'))
'''
'''
class School(Base):
    __tablename__ = 'school'
    id = ...
    name = ...
'''

# 初始化数据库连接: （'数据库类型+数据库驱动名称://用户名:口令@机器地址:端口号/数据库名'）
engine = create_engine('mysql+mysqlconnector://root:6768@localhost:3306/python_use')
# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)

# 存储

# 创建session对象:
session = DBSession()
# 创建新User对象:
new_user = User(id='25', name='Bob2')
# 添加到session:
session.add(new_user)
# 提交即保存到数据库:
session.commit()
# 关闭session:
session.close()

# 查询

# 创建Session:
session = DBSession()
# 创建Query查询，filter是where条件，最后调用one()返回唯一行，如果调用all()则返回所有行:
user = session.query(User).filter(User.id=='5').one()
# 打印类型和对象的name属性:
print('type:', type(user))
print('name:', user.name)
# 关闭Session:
session.close()