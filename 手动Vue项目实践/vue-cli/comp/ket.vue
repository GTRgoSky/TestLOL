<template>
    <div>
        ket
        <p v-pre>666{{aa}}</p>
        <p v-once>This will never change: {{msg}}</p>
        <p>This will change: {{msg}}</p>
        <input type="text" @keyup.enter="enter" name="" id="">
        <button @click="testBus">testBus</button>
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
        }
    },
    beforeDestroy(){
        bus.$off('isAlsoGetUserTansInfo')
    }
}
</script>

<style lang="less" scoped>

</style>
