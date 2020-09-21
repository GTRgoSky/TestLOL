<template>
    <div id="app">
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
        <div>
            <router-link to="/communication">communication</router-link>
        </div>
        <router-view></router-view>
        <!-- <Home msg="Welcome to Your Vue.js + TypeScript App" /> -->
    </div>
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
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
