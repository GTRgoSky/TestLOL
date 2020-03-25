/**
 * ES5/ES6 的继承除了写法以外还有什么区别
 */

try {
	// 1、class 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量。
	function a() {
		const bar = new Bar(); // it's ok
		function Bar() {
			this.bar = 42;
		}
		const foo = new Foo(); // ReferenceError: Foo is not defined
		class Foo {
			constructor() {
				this.foo = 42;
			}
		}
	}
	// a();

	// 2、 class 声明内部会启用严格模式。
	function b() {
		// 引用一个未声明的变量
		function Bar() {
			baz = 42; // it's ok
		}
		const bar = new Bar();

		class Foo {
			constructor() {
				fol = 42; // ReferenceError: fol is not defined
			}
		}
		const foo = new Foo();
	}
	// b();

	// 3、class 的所有方法（包括静态方法和实例方法）都是不可枚举的
	function c() {
		// 引用一个未声明的变量
		function Bar() {
			this.bar = 42;
		}
		Bar.answer = function() {
			return 42;
		};
		Bar.prototype.print = function() {
			console.log(this.bar);
		};
		const barKeys = Object.keys(Bar); // ['answer']
		const barProtoKeys = Object.keys(Bar.prototype); // ['print']

		class Foo {
			constructor() {
				this.foo = 42;
			}
			static answer() {
				return 42;
			}
			print() {
				console.log(this.foo);
			}
		}
		const fooKeys = Object.keys(Foo); // []
		const fooProtoKeys = Object.keys(Foo.prototype); // []

		console.log(barKeys, barProtoKeys, fooKeys, fooProtoKeys);
	}
	// c();

	// 4、class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用。
	function d() {
		function Bar() {
			this.bar = 42;
		}
		Bar.prototype.print = function() {
			console.log(this.bar, 'bar');
		};

		const bar = new Bar();
		const barPrint = new bar.print(); // it's ok // 空对象

		class Foo {
			constructor() {
				this.foo = 42;
			}
			print() {
				console.log(this.foo);
			}
		}
		const foo = new Foo();
		const fooPrint = new foo.print(); // TypeError: foo.print is not a constructor
	}
	// d();

	// 5、必须使用 new 调用 class。
	function e() {
		function Bar() {
			this.bar = 42;
		}
		const bar = Bar(); // it's ok

		class Foo {
			constructor() {
				this.foo = 42;
			}
		}
		const foo = Foo(); // TypeError: Class constructor Foo cannot be invoked without 'new'
	}
	// e();

	// 6、class 内部无法重写类名。
	function f() {
		function Bar() {
			Bar = 'Baz'; // it's ok
			this.bar = 42;
		}
		const bar = new Bar();
		// Bar: 'Baz'
		// bar: Bar {bar: 42}

		class Foo {
			constructor() {
				this.foo = 42;
				Foo = 'Fol'; // TypeError: Assignment to constant variable
			}
		}
		const foo = new Foo();
		Foo = 'Fol'; // it's ok
	}
	f();
} catch (e) {
	console.log(e);
}
