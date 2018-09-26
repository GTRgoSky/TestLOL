1、声明MVVM，
2、实例化observer(数据劫持者)，用ob.defineProperty为data里面的值创建set和get方法.并创建dep(数据订阅者)用来添加监听器
3、模板渲染后,compile(模板解析器)根据特殊标识找到对应的DOM元素，并将data上的值附在fragment内的对应节点，并实例化watcher(数据通知者)，
传入回调函数(参数为：dom，新值，旧值)，放入更新DOM节点的方法。
4、watcher实例化后将自己添加在dep中。
5、更新data，set会劫持修改，先将自己的值修改为新值，然后通知订阅者（dep遍历，如果新值==旧值不变）。
6、如果值更新，则触发回调，修改对应DOM节点的内容

这里面涉及到DOM的修改都是用fragment缓存处理，否则影响性能。