<template>
    <div>
        <async-component></async-component>
        <p ref="refD">home and params: {{ $route.params.userId }}</p>
        <button
            v-for="tab in tabs"
            v-bind:key="tab"
            v-bind:class="['tab-button', { active: currentTab === tab }]"
            v-on:click="currentTab = tab"
        >{{ tab }}</button>
        <keep-alive>
            <component v-bind:is="currentTabComponent" class="tab"></component>
        </keep-alive>
        <p ref="refT" is="dom" :todo="todoT">
            <template slot-scope="slotProps">
                <!-- <a :href="'http://www.baidu.com?id='+slotProps.todo"> -->
                <p>3123 and {{slotProps.todo}}</p>
                <!-- </a> -->
            </template>
        </p>
        <h1 slot="header">About Me</h1>
        <slotsdemo>
            <div slot="test">现在我改变了你</div>
            <div slot="created">createdDom</div>
        </slotsdemo>
        <button @click="changeTodo">点我试试</button>
        <base-input v-on:click="onFocus"></base-input>
    </div>
</template>

<script>
// import foo from "./foo.vue";
// import bar from "./bar.vue"

import { bus } from "../common/bus";
export default {
    name: "home",
    data() {
        return {
            currentTab: "foo",
            tabs: ["foo", "bar"],
            todoT: [1, 2]
        };
    },
    computed: {
        currentTabComponent: function() {
            return this.currentTab.toLowerCase();
        }
    },
    components: {
        // ues {"plugins": ["syntax-dynamic-import"]}
        bar: () => import("./bar.vue"),
        foo: () => import("./foo.vue"),
        dom: () => import("./dom.vue"),
        slotsdemo: () => import("./slotsdemo.vue"),
        "base-input": () => import("./base-input.vue")
    },
    methods: {
        changeTodo() {
            this.todoT = [2, 1];
            this.$refs.refT.test();
            // console.log(this.$refs.refD);
        },
        onFocus(e) {
            // console.log(this, e, "base-input-onFocus");
        }
    },
    created() {},
    mounted() {
        bus.$on("isAlsoGetUserTansInfo", function(status) {
            console.log(1);
        });
        // console.log(this.$router.currentRoute, 66);
    }
};
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
