<template>
    <div @click="go">Login</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    methods: {
        go() {
            this.$router.replace("/about");
        },
    },
});
</script>

<style>
</style>