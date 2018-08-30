<template>
    <div>
        foo
        <slot></slot>
        {{count}}
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    mounted(){
        console.log('foo');
        console.log(this.$router.currentRoute);
        // setTimeout(() => {
        //     console.log('time')
        // }, 1000);
    },
    name:"foo",
    activated(){
        //激活
        // console.log('ac')
    },
    deactivated(){
        //失去激活
        // console.log('de');
    },
    computed: {
        ...mapState(['count'])
        // count () {
        //     return this.$store.state.count
        // }
    }
}
</script>

<style lang="less" scoped>

</style>
