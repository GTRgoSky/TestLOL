<template>
    <div>
        <p>祖先的<span>provide</span>传过来的值，用<span>inject</span>接收得到的值是<span>{{provideT}}</span></p>
        <p>我是没有被赋值的default值：<span>{{provideTT}}</span></p>
    </div>
</template>

<script>
export default {
    name : 'com-one',
    data(){
        return {
        }
    },
    testgo:2,
    inject: {
        provideT:{
            default:'我是default'
        },
        provideTT:{
            default:'我是default'
        }
    },
    created() {

    },
    methods:{
        
    }
}
</script>

<style>
    span{
        color: red;
    }
</style>
