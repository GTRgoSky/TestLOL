<template>
    <div id="classT">
        ket
        <p v-pre>666{{aa}}</p>
        <p v-once class="class1">This will never change: {{msg}}</p>
        <p class="class2">This will change: {{msg}}</p>
        <input type="text" @keyup.enter="enter" name="" id="">
        <button @click="testBus">testBus</button>
        <button @click="replaceRoute">replaceRoute</button>
        <test-com></test-com>
    </div>
</template>

<script>
import { bus } from '../common/bus';
export default {
    data(){
        return {
            msg:'helo'
        }
    },
    mounted(){
      console.log(this.$router.currentRoute);
    },
    methods:{
        testBus(){
            bus.$emit('isAlsoGetUserTansInfo','');
            this.msg = 'bye'
        },
        enter(e){
            alert(e.target.value)
        },
        replaceRoute(){
            this.$router.replace({path:'/foo?u=123',query:{test:1,tes:2}})
        }
    },
    beforeDestroy(){
        bus.$off('isAlsoGetUserTansInfo')
    }
}
</script>

<style lang="less" scoped>

</style>
