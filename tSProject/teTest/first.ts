class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

let a:number[][] = [[1,2,3],[5,5,6],[1,2]]

console.log(a)

document.body.innerHTML = greeter(user);

let input: [number, number] = [0, 1];
function f([first, second]: [number, number]) {
    document.body.innerHTML += 
    '<br\>输出：<br\>first:' + first + '<br\>second' + second;
}
f(input);

//解构
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { b, ...passthrough }: {b:number} = o;
console.log(b, passthrough);

//函数声明
type C = { a: string, b?: number }
function f2({ a, b }: C): void {
    // ...
}
function f3({ a="", b=0 } = {}): void {
    // ...
}
f3();

//数组解构展开
let first = [1, 2];
let second = [3, 4];
let third = second;
let bothPlus = [0, ...first, ...second, 5];
console.log(first, second, bothPlus, third);
second[0] = 7;
console.log(first, second, bothPlus, third);
second = [5,6];
console.log(first, second, bothPlus, third);

//接口
interface LabelledValue {
    label: string;
  }
  
  function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj);
  }
  
  let myObj = {size: 10, label: "Size 10 Object"};
  printLabel(myObj);
  

//类接口
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

digital.tick()
console.log(analog);

//接口继承
interface Shape {
    color: string;
    //[propName: string]: any; 当有该值，意味着接口允许自定义属性
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
//square.test = 'tets'报错，未在接口定义
