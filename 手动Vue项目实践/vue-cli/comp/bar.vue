<template>
    <div>
        <p>bar</p>
        <ul>
            <li><router-link to="/bar/barC1">/barC1(子路由1)</router-link></li>
            <li><router-link to="/bar/barC2">/barC2(子路由2)</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
import { bus } from '../common/bus';
export default {
    created(){
        console.log('bar')
        console.log(this.$router.currentRoute);
    },
    components:{
    }
}
</script>

<style lang="less" scoped>

</style>
