<!-- provideStore.vue -->
<template>
    <h1>Home</h1>
</template>


<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
    setup() {
        const state = ref("parent");
        return {
            state,
        };
    },
});
</script>