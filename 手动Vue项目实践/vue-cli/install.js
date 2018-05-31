// const common = {
//     data:{},
//     install:function(a,b){
//         this.other(a,b);
//     },
//     other(a,b){
//         // console.log(666,this)
//         // console.log()
//         this.data.msg = b
//         a.component('test-com',this.components);
//     },
//     components:{
//         template:'<p style="color:red">此组件是通过Vue.use的install方法注册的 该字段=>{{msg}}<=是msg由use传入</p>',
//         data(){
//             return {
//                 msg :common.data.msg
//             }
//         }
//     }
// }

class common {
    constructor(){
        
    }
    data(){}
    install(a,b){
        this.other(a,b);
    }
    other(a,b){
        // console.log(666,this)
        console.log(this)
        a.component('test-com',this.components(b));
    }
    components(...args){
        return {
            template:'<p style="color:red">此组件是通过Vue.use的install方法注册的 该字段=>{{msg}}<=是msg由use传入</p>',
            data(){
                let obj = {};
                return {
                    msg :args[0]
                }
            }
        }
    }
}

exports.common = new common();