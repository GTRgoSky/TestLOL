<template>
    <div>
        <h1>物理返回监听测试</h1>
        <ul>
          <li><router-link :to="{ name: 'home'}">/</router-link></li>
          <li><router-link :to="{ path: '/foo', query: { userId: '456' }}">/foo(根据path,slot分发)</router-link></li>
          <li><router-link to="/bar?userId=789">/bar(嵌套子路由)</router-link></li>
          <li><router-link :to="{ name: 'ket', params: { userId: 'test' }, query: { userId: '123' }}">/ket(根据name找)</router-link></li>
          <li><router-link :to="{ name: 'form'}">/form(根据name找)</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
//https://juejin.im/entry/5a54b747518825734216c3df
export default {
    
}
</script>

<style lang="less" scoped>

</style>
