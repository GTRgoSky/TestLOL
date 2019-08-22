```html
Class Parnet            Class Child             Function

① P.__proto__  ==  Function(){}
② P.portotype  ==  P.prototype
③ [Parent的实例]pvm.__proto__ == P.prototype
④ C.__proto__  ==  Parnet
⑤ C.portotype  ==  C.portotype
⑥ C.__proto__.portotype  == P.portotype
⑦ C.portotype.__proto__ ==  P.portotype

构造函数的__proto__ 指向 父级 本身  eg:④
构造函数实例的__proto__指向构造函数的prototype   eg:③
构造函数的prototype指向自己的prototype   eg: ②⑤
一级构造函数都是 Function 的子集

对象只有__proto__[实例]，函数拥有prototype。
构造函数既是对象，又是函数
```