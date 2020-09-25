<template>
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import Home from "./views/Home.vue";

export default defineComponent({
    components: {
        // Home,
    },
});
</script>

<style>
html,
body {
    margin: 0;
    height: 100%;
    width: 100%;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
}
</style>
