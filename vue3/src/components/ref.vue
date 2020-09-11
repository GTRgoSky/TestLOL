<template>
    <div ref="root"></div>
    <div v-for="(item, i) in list" :ref="el => { refs[i] = el }" :key="item">{{ item }}</div>
    <input type="text" v-model="foo" />
</template>

<script>
import { ref, onMounted, reactive, toRefs, watchEffect } from "vue";
// unref - 是 val = isRef(val) ? val.value : val 的语法糖。
// 当您要将一个 prop 中的属性作为 ref 传给组合逻辑函数时，toRef 就派上了用场 - toRef(props, 希望操作的key)
// toRefs - 当想要从一个组合逻辑函数中返回响应式对象时，用 toRefs 是很有效的，该 API 让消费组件可以 解构 / 扩展（使用 ... 操作符）返回的对象，并不会丢失响应性：
// isRef - 检查一个值是否为一个 ref 对象。
export default {
    setup() {
        const root = ref(null);
        let list = reactive(["a", "b", "c"]);
        let refs = ref([]);

        onMounted(() => {
            // 在渲染完成后, 这个 div DOM 会被赋值给 root ref 对象
            console.log(root.value); // <div/>
            let span = document.createElement("span");
            span.innerText = "span Add";
            span.style.color = "red";
            root.value.appendChild(span);
            console.log(refs.value); // ref循环列表
        });

        // 可以解构，不会丢失响应性
        const { foo } = useFeatureX();

        watchEffect(() => {
            console.log(foo.value);
        });

        return {
            root,
            list,
            refs,
            foo,
        };
    },
};

function useFeatureX() {
    const state = reactive({
        foo: 1,
        bar: 2,
    });

    // 对 state 的逻辑操作

    // 返回时将属性都转为 ref
    return toRefs(state);
}
</script>

<style>
</style>