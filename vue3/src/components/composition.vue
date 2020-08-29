<template>
    <Suspense>
        <div id="test">666</div>
        <button @click="increment">Count is: {{ state.count }}, double is: {{ state.double }}</button>
    </Suspense>
</template>

<script>
import { reactive, computed, watchEffect } from "vue";
export default {
    setup() {
        // state 现在是一个响应式的状态
        // reactive 几乎等价于 2.x 中现有的 Vue.observable()
        // 这里返回的 state 是一个所有 Vue 用户都应该熟悉的响应式对象。
        const state = reactive({
            count: 0,
            double: computed(() => state.count * 2),
        });

        // watchEffect 应该接收一个应用预期副作用 (这里即设置 innerHTML) 的函数
        // 副作用：在 DOM 当中渲染内容会被视为一种“副作用
        // state.count 会在首次执行后作为依赖被追踪。当 state.count 未来发生变更时，里面这个函数又会被重新执行。
        watchEffect(() => {
            let str = `count is ${state.count}`;
            if (document.getElementById("test"))
                document.getElementById("test").innerHTML = str;
        });

        function increment() {
            state.count++;
        }

        return {
            state,
            increment,
        };
    },
};
</script>