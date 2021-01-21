<!-- provideStore.vue -->
<template>
    <div @click="updateP">点击我</div>
</template>


<script lang="ts">
/* eslint-disable */
import { defineComponent, inject } from "vue";

export default defineComponent({
    components: {},

    setup(props, context) {
        let msg = inject("msg");

        function updateP() {
            console.log(111, msg);
        }
        return {
            updateP,
        };
    },
});
</script>