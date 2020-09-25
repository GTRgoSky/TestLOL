<!-- provideStore.vue -->
<template>
    <h1>{{ count }}</h1>
    <button @click="count++">点击+1</button>
</template>


<script lang="ts">
import { ref, defineComponent, watch } from "vue";
export default defineComponent({
    setup() {
        const count = ref(1);

        watch(
            // getter - 初始加载就会执行
            [
                () => {
                    console.log("第二函数新值取自这里", count.value);
                    return count.value;
                },
                () => {
                    console.log("第二函数新值取自这里2", count.value);
                    return count.value;
                },
            ],
            // callback - 这里用来在做变更后的处理，value 接受的是 上面的返回值
            (value, oldValue) => {
                console.log("count  1 is: ", value, "old:", oldValue);
            },
            {
                // immediate: true, // 配置立即执行后面的函数
            }
        );

        return {
            count,
        };
    },
});
</script>