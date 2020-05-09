import MVVM from './mvvm.js';
var vm = new MVVM({
	el: '#mvvm-app',
	data: {
		word: 'Hello World!',
		obj: {
			ts: {
				a: 123,
			},
		},
	},
	methods: {
		sayHi: function () {
			this.word = 'Hi, everybody! i click ';

			console.log(this);
		},
		changeObj() {
			// this.obj.name = 'test' + new Date(); // 这种方法不会有双向绑定，因为无法进入劫持逻辑
			if (this.obj.name) {
				this.obj.name = 'test2' + new Date();
				return;
			}
			this.obj = { name: 'test' + new Date().valueOf() };
		},
	},
	mounted() {},
});

//commonjs规范。 在文件定义的变量属于内部变量。 如果要定义在全局，用 window.funName = function
