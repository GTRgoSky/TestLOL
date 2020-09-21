<!-- provideStore.vue -->
<template>
    <div>
        <h1>{{state}}</h1>
        <button @click="setgrandsonProp">点我修改grandsonProp</button>
        <button @click="setchildProp">点我修改childProp</button>
        <child :childProp="childProp" @setprop="setPropFun" :grandsonProp="grandsonProp"></child>
    </div>
</template>


<script lang="ts">
/* eslint-disable */
import { ref, defineComponent, reactive } from "vue";
import child from "./children.vue";
interface DeepObj {
    [propName: string]: any;
}

interface ChildProp {
    a: number;
    b: DeepObj;
    [propName: string]: any;
}
// 通过emit修改父级数据
function setProp(childProp: ChildProp) {
    return function _setProp(val: any, key: string): void {
        childProp[key] = val;
    };
}
export default defineComponent({
    components: {
        child,
    },
    setup() {
        // 创建标题
        const state = ref("parent");
        // 创建子数据
        const childProp = reactive({
            a: 1,
            b: { c: 1 },
        });
        // 创建孙子数据
        let grandsonProp = ref(123);
        // 获取修改emit的能力
        const setPropFun: (val: any, key: string) => void = setProp(childProp);
        // 修改孙子
        const setgrandsonProp = function () {
            grandsonProp.value++;
        };
        // 修改儿子
        const setchildProp = function () {
            childProp.a++;
        };
        return {
            state,
            childProp,
            setPropFun,
            setgrandsonProp,
            grandsonProp,
            setchildProp,
        };
    },
});
</script>