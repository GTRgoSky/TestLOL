import MVVM from "./mvvm.js";
var vm = new MVVM({
    el: '#mvvm-app',
    data: {
        word: 'Hello World!',
        // fx: {
        //     a:1,
        //     b:2,
        //     c:{asd:3}
        // },
        // fff:{aa:4},
        // f:5
    },
    methods: {
        sayHi: function () {
            this.word = 'Hi, everybody! i click ';
            // this.fx = {
            //     a:666,
            //     b:2,
            //     c:{asd:3}
            // },
            console.log(this)
        }
    },
    mounted(){
        
        
    }
});


//commonjs规范。 在文件定义的变量属于内部变量。 如果要定义在全局，用 window.funName = function