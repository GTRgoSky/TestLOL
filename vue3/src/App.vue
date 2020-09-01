<template>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <composition></composition> -->
    <!-- <globalProperties></globalProperties> -->
    <div id="router">
        <router-link to="/">Home</router-link>
        <router-link to="/composition">Contact</router-link>
        <router-link to="/provideAndInject">provideAndInject</router-link>
    </div>
    <router-view />
</template>

<script>
// import globalProperties from "./components/globalProperties.vue";
// import composition from "./components/composition.vue";
// 组合Api
// import { defineComponent } from "vue";

export default {
    name: "App",
    components: {
        // HelloWorld,
        // composition,
        // globalProperties,
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
#router {
    margin: 0 0 20px;
    a {
        margin: 10px;
    }
}
</style>
