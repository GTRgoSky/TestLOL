<template>
    <section class="section-bg">
        <button v-for="item in List" @click="changSection(item)" :key="item">{{item}}</button>
        <section v-if="showTab == 'sync'">
            <p>v-on:xxx.sync</p>
            <syncc v-bind:datat.sync="syncData"></syncc>
            <p>observable</p>
            <p @click="addObservable">{{observableTest}}</p>
        </section>
        <section v-if="showTab == 'useself'">
            <useself :test="0"></useself>
        </section>
    </section>
</template>
<script>
const state = Vue.observable({ count: 0 })
export default {
    data() {
        return {
            syncData:'sync start',
            List:['sync','useself'],
            showTab:""
        }
    },
    components: {
        syncc : () => import('./sync.vue'),
        useself : () => import('./useself.vue'),
    },
    computed: {
        observableTest() {//监听了state.count 返回值未改变则不触发
            console.log('computed:observableTest:---', state.count)
            return state.count
        }
    },
    mounted() {
        console.log('%c new Test Start', 'background:#000;color:#fff')
        console.log(state)
        console.log('%c new Test End', 'background:#000;color:#fff')
    },
    methods: {
        addObservable() {
            if(state.count > 4 ) return;
            state.count++;
        },
        changSection(name) {
            this.showTab = name
        }
    }
}
</script>

