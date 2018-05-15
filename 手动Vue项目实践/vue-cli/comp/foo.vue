<template>
    <div>
        foo
        <slot></slot>
    </div>
</template>

<script>
export default {
    created(){
        console.log('foo');
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
    }
}
</script>

<style lang="less" scoped>

</style>
