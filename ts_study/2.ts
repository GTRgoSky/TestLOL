class Lady {
    content = "Hi，帅哥";
    sayHello() {
        return this.content;
    }
}

class XiaoJieJie extends Lady {
    constructor() {
        super() // 实例父构造函数
    }
    sayLove() {
        return "I love you!";
    }
    sayHello() {
        return super.sayHello() + "。你好！";
    }
}

const x = new XiaoJieJie();
console.log(x.sayHello())