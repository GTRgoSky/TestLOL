<template>
    <div>
        <div @click="add">{{ count }}</div>
        <div @click="changeName(count)">{{ name }}</div>
    </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import { useName } from "./vue3.js";
export default defineComponent({
    name: "vue2in3",
    setup() {
        const count = ref(0); // ref 和 reactive 的区别在此
        function add() {
            count.value++;
        }
        let [name, changeName] = useName();
        return {
            count,
            add,
            name,
            changeName,
        };
    },
});
</script>

<style>
</style>