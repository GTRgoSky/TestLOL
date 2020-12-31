<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2 id="ttt">{{ r }}</h2>
        <input type="text" v-model="r" />
    </div>
</template>

<script>
import { ref, reactive, watchEffect, toRefs } from "vue";
export default {
    name: "HelloWorld",
    data() {
        return {
            msg: "首页",
            ms: 666,
        };
    },
    setup() {
        const r = ref(1);
        watchEffect(() => {
            console.log(r.value);
            // const token = performAsyncOperation(id.value)
        });
        // console.log(s);
        return {
            r,
        };
    },
};
</script>

<style lang="scss" scoped>
.hello {
    // background-image: resolve("miao.jpg"); // postcssrc
    // background-image: url("../assets/miao.jpg");
}
</style>