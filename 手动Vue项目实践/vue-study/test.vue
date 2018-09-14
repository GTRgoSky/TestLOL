<template>
    <div>
        <div v-for="item in list">
            <p :ref="'test'" @click="t(item-1)">{{item}}</p>
            <p v-show="id == item">显示{{item}}</p>
        </div>
        <input type="text" @blur="b">
        <div @click='inner'>
            <span>gegege</span>gogogo
        </div>
        <com-one @par="changeC" :com-one='comOne'></com-one>
    </div>
</template>

<script>
import comOne from './com/como.vue'
export default {
    name : 'test-a',
    data(){
        return {
            list : [1,2,3,4],
            id:1,
            comOne:1,
            ttss: 'testProvide'
        }
    },
    // provide: {
    //     provideT: 'testProvide'
    // },
    provide() {
        return {
            'provideT' : this.ttss
        }
    },
    created() {
    },
    components:{
        comOne
    },
    methods:{
        t(v){
            console.log(this.$refs.test[v])
            this.id = v+1;
        },
        b(){
            console.log(666,this)
            performance.mark('for-start')//开始标记
            for (let i = 0; i < 100; i++) {
                console.log(i)
            }
            performance.mark('for-end')//结束标记
            performance.measure('for-measure','for-start','for-end')//在Performance的 User Timing里查看代码段性能
        },
        inner(e){
            console.log(e.target.innerHTML)
            console.log(e.target.innerText)
            console.log(e.target.outerHTML)
            console.log(e.target.textContent)
        },
        changeC(){
            this.comOne = 2;
            console.log(this)
        }
    }
}
</script>
