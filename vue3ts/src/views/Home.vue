<!-- provideStore.vue -->
<template>
    <!-- <h1>Home</h1> -->
    <div class="home">
        <div class="menu">
            <router-link to="/communication">父子三代传值</router-link>
            <router-link to="/api/watch">watch</router-link>
            <router-link to="/api/computed">computed</router-link>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
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

<style >
.home {
    display: flex;
    width: 100%;
    height: 100%;
}
.menu {
    width: 150px;
    overflow-y: auto;
}
.menu::-webkit-scrollbar {
    width: 5px;
    border-radius: inherit;
    background-color: hsla(220, 4%, 58%, 0.3);
}
.menu a {
    display: block;
    margin-top: 10px;
    text-decoration: none;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    border-radius: 4px;
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
}
.menu .router-link-active {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
}
.content {
    flex: 1;
}
</style>