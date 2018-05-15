<template>
    <div>
        <p>home</p>
        <button
            v-for="tab in tabs"
            v-bind:key="tab"
            v-bind:class="['tab-button', { active: currentTab === tab }]"
            v-on:click="currentTab = tab"
        >{{ tab }}</button>
        <keep-alive include="foo">
            <component
                v-bind:is="currentTabComponent"
                class="tab"
            ></component>
        </keep-alive>
         <p is="dom" :todo="todoT">
            <template slot-scope="slotProps">
                <a :href="'http://www.baidu.com?id='+slotProps.todo" >
                    <p>3123 and {{slotProps.todo}}</p>
                </a>
            </template>
        </p>
        
    </div>
</template>

<script>
// import foo from "./foo.vue";
// import bar from "./bar.vue"
export default {
    data(){
        return {
            currentTab: 'foo',
            tabs: ['foo', 'bar'],
            todoT:[1,2,3,4,5]
        }
    },
    computed: {
        currentTabComponent: function () {
            return this.currentTab.toLowerCase()
        }
    },
    components:{
        // foo,
        bar : () => import('./bar.vue'),
        foo : () => import('./foo.vue'),
        dom : () => import('./dom.vue')
    }
}
</script>

<style lang="less" scoped>
    .tab-button {
    padding: 6px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    margin-right: -1px;
    }
    .tab-button:hover {
    background: #e0e0e0;
    }
    .tab-button.active {
    background: #e0e0e0;
    }
    .tab {
    border: 1px solid #ccc;
    padding: 10px;
    }
</style>
