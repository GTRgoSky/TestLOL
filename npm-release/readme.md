自用时间管理
npm

timeFormat (str)
传入 YYYY-MM-DD 或者 YYYY-MM-DD hh:mm:ss 获取当前时间

timeSetFormat (date, str)
格式化导入时间。第一参数传入 new Date()可以解析的时间 第二参数传入 YYYY-MM-DD 或者 YYYY-MM-DD hh:mm:ss

getTimeFormat (str, format)
获取时间对应值
str: YYYY-MM-DD hh:mm:ss 格式 或者时间戳格式
format: YYYY 或者 MM 或者 YYYY-MM 格式 得到对应格式

whichType(v)
判断对象类型

timeCompare
比较 2 个时间大小(v1 > v2 返回 1 ； v1 == v2 返回 0 ； v1 < v2 返回 -1)
参数格式最好为入 YYYY-MM-DD 或者 YYYY-MM-DD hh:mm:ss 否则可能引起未知错误

htmlStr
处理 html 特殊字符串

```javascript
// 使用举例：
// 直接引入对应方法
import { timeFormat } from 'wing-time';
timeFormat('YYYY-MM-DD hh:mm:ss');
// => 当前 年月日 时分秒
```
