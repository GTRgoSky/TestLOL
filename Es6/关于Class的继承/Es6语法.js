class Parent {
    static height = 12
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    speakSomething(){
        console.log("I can speek chinese");
    }
}
Parent.prototype.color = 'yellow'


//定义子类，继承父类
class Child extends Parent {
    static width = 18
    constructor(name,age){
        super(name,age);
    }
    coding(){
        console.log("I can code JS");
    }
}

var c = new Child("job",30);
c.coding()