<template>
    <div>
        dom
        <div v-for="item in todo">
            <slot v-bind:todo="item"></slot>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        console.log('dom')
    },
    props:{
        todo:{
            default:[],
            type:Array
        }
    },
    methods:{
        test(){
            console.log('domTest')
        }
    }
}
</script>

<style lang="less" scoped>

</style>
