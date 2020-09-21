<!-- children.vue -->
<template>
    <h1>{{children}}</h1>
    <p>{{childProp}}</p>
    <button @click="changeParent">点我修改父级数据</button>
    <grandson :grandsonProp="attrProp"></grandson>
</template>


<script lang="ts">
import { ref, defineComponent, toRef } from "vue";
import grandson from "./grandson.vue";
export default defineComponent({
    components: {
        grandson,
    },
    props: {
        childProp: {
            type: Object,
        },
    },
    setup(prop, context) {
        const children = ref("children");
        // 为了修改prop需要先将对应字段转为ref
        const getP = toRef(prop.childProp, "a");
        // 修改父级数据
        function changeParent(): void {
            context.emit("setprop", ++getP.value, "a");
        }
        // 将attr传给孙子节点
        const attrProp = toRef(context.attrs, "grandsonProp");
        return {
            children,
            changeParent,
            attrProp,
        };
    },
});
</script>