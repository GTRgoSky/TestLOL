<template>
    <div>
        <!-- <h1 class="a">物理返回监听测试</h1> -->
        <ul v-if="showMenu">
            <li>
                <router-link :to="{ name: 'home'}">/</router-link>
            </li>
            <li>
                <router-link :to="{ path: '/foo', query: { userId: '456' }}">/foo(根据path,slot分发)</router-link>
            </li>
            <li>
                <router-link to="/bar?userId=789">/bar(嵌套子路由)</router-link>
            </li>
            <li>
                <router-link
                    :to="{ name: 'ket', params: { userId: 'test' }, query: { userId: '123' }}"
                >/ket(根据name找)</router-link>
            </li>
            <li>
                <router-link :to="{ name: 'form'}">/form(根据name找)</router-link>
            </li>
            <li>
                <router-link :to="{ name: 'slotsdemo'}">/slotsdemo(根据name找)</router-link>
            </li>
            <li>
                <router-link :to="{ name: 'vuenew'}">/vuenew(新尝试)</router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
//https://juejin.im/entry/5a54b747518825734216c3df
export default {
    data() {
        return {
            showMenu: false
        };
    }
};
</script>
<style lang="less">
.section-bg {
    background-color: antiquewhite;
}
</style>

<style lang="less" scoped>
</style>
