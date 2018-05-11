import MVVM from "./mvvm.js";
var vm = new MVVM({
    el: '#mvvm-app',
    data: {
        word: 'Hello World!'
    },
    methods: {
        sayHi: function () {
            this.word = 'Hi, everybody! i click ';
        }
    }
});


//commonjs规范。 在文件定义的变量属于内部变量。 如果要定义在全局，用 window.funName = function