let count = 0;
let c = 0;
// 测试注释
class Person {
    protected name: string = 'xx';
    public sayHello() {
        c++;
        console.log(this.name + ' say Hello')  //此处不报错
    }
}

class Teacher extends Person {
    public sayBye() {
        count++;
        console.log(super.sayHello());
    }
}


var t = new Teacher();

console.log(t.sayBye(), c, count);