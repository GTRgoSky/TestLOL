<template>
    <div>
        <div v-for="item in list">
            <p :ref="'test'" @click="t(item-1)">{{item}}</p>
        </div>
        <input type="text" @blur="b">
        <div @click='inner'>
            <span>gegege</span>gogogo
        </div>
    </div>
</template>

<script>
export default {
    name : 'test-a',
    data(){
        return {
            list : [1,2,3,4]
        }
    },
    methods:{
        t(v){
            console.log(this.$refs.test[v])
        },
        b(){
            console.log(666,this)
        },
        inner(e){
            console.log(e.target.innerHTML)
            console.log(e.target.innerText)
            console.log(e.target.outerHTML)
            console.log(e.target.textContent)
        }
    }
}
</script>
