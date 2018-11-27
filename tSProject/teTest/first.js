"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
exports.__esModule = true;
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
var a = [[1, 2, 3], [5, 5, 6], [1, 2]];
console.log(a);
document.body.innerHTML = greeter(user);
var input = [0, 1];
function f(_a) {
    var first = _a[0], second = _a[1];
    document.body.innerHTML +=
        '<br\>输出：<br\>first:' + first + '<br\>second' + second;
}
f(input);
//解构
var o = {
    a: "foo",
    b: 12,
    c: "bar"
};
var b = o.b, passthrough = __rest(o, ["b"]);
console.log(b, passthrough);
function f2(_a) {
    var a = _a.a, b = _a.b;
    // ...
}
function f3(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.a, a = _c === void 0 ? "" : _c, _d = _b.b, b = _d === void 0 ? 0 : _d;
    // ...
}
f3();
//数组解构展开
var first = [1, 2];
var second = [3, 4];
var third = second;
var bothPlus = [0].concat(first, second, [5]);
console.log(first, second, bothPlus, third);
second[0] = 7;
console.log(first, second, bothPlus, third);
second = [5, 6];
console.log(first, second, bothPlus, third);
function printLabel(labelledObj) {
    console.log(labelledObj);
}
var myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
var DigitalClock = /** @class */ (function () {
    function DigitalClock(h, m) {
    }
    DigitalClock.prototype.tick = function () {
        console.log("beep beep");
    };
    return DigitalClock;
}());
var AnalogClock = /** @class */ (function () {
    function AnalogClock(h, m) {
    }
    AnalogClock.prototype.tick = function () {
        console.log("tick tock");
    };
    return AnalogClock;
}());
var digital = createClock(DigitalClock, 12, 17);
var analog = createClock(AnalogClock, 7, 32);
digital.tick();
console.log(analog);
var square = {};
square.color = "blue";
square.sideLength = 10;
//square.test = 'tets'报错，未在接口定义
/// <reference path="./test.d.ts" />
var a_js_1 = require("./a.js");
console.log(a_js_1["default"]);
