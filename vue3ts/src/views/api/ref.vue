<template>
    <div @click="test">Ref</div>
    <div>{{ slowRef.a }}</div>
    <div>{{ rfReact.a }}</div>
</template>

<script lang="ts">
import {
    ref,
    // triggerRef,
    shallowRef,
    // isReactive,
    // reactive,
} from "vue";
interface ValueAny {
    value: object;
}
export default {
    setup() {
        // 返回一个不被 响应式代理 的双向绑定（但是也加入到了副作用数组中）。 （即变更不会调用 reactive）
        // 使用 triggerRef 强制更新 或者 改变其他 副作用 该值会被更新
        // 只对 对象 有效 因为 基础类型 不做 reactive 处理
        const slowRef = shallowRef({
            a: 0,
        });
        const rfReact = ref({
            a: 1,
        });
        function test() {
            const r = ref(2);
            // r.value = 6;
            // 这里触发的就是 reactive 的更新 而不是 ref 的 set
            rfReact.value.a = 9;
            // 不会触发更新
            // slowRef.value.a = 999;
            // 强制更新所有
            // triggerRef(slowRef);
        }
        return {
            test,
            slowRef,
            rfReact,
        };
    },
};
</script>
