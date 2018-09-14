<template>
    <div>
        <div @click="test">666</div>
        <p>{{comOne}}</p>
        <p>父级的<span>provide</span>传过来的值，用<span>inject</span>接收得到的值是<span>{{provideT}}</span></p>
        <p>com1的子集0：</p>
        <com-one-c-one></com-one-c-one>
        <p>import的引入测试:{{imoT}}</p>
        <switches v-model="enabled" class="test" theme="bulma" color="green" type-bold="true"></switches>
    </div>
</template>
<script> 
import comOneCOne from './com1_c1.vue'
import imo from '../pub/imo.js'
import Switches from 'vue-switches';
export default {
    name : 'com-one',
    data(){
        return {
            tt:123231,
            imoT:imo.testo,
            enabled: false
        }
    },
    inject: ['provideT'],
    testgo:1,
    celue:'测试一下子组件策略合并',
    props:{
        comOne:0
    },
    created() {
        //可以直接拿到父级的data
        console.log('这里是com1的created输出::')
        console.log(this)
        console.log(this.$options)//可以拿到testgo
        console.log(this.$options.celue)//可以拿到celue，可以看到返回策略被改变
        console.log(this.$options.testgo)//可以拿到testgo
        console.log(this.$options.parent.comOne)
    },
    methods:{
        test(){
            this.$emit('par');
            console.log(this.$options.parent)
            console.log(this.$options.parent.comOne)
        }
    },
    components:{
        comOneCOne,
        Switches
    }
}
</script>

<style lang="less">
    span{
        color: red;
    }
    .test{
        &.vue-switcher-theme--bulma{
            &.vue-switcher-color--green{
                div{
                    &::after{
                        background-color :#fff;
                    }
                }
                &.vue-switcher--unchecked{
                    div{
                        background-color: #ccc;
                        &::after{
                            background-color :#fff;
                        }
                    }
                } 
            }
        }
    }
    
</style>
