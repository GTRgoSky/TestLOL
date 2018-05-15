<template>
    <div>
        <h1>物理返回监听测试</h1>
        <ul>
          <li><router-link :to="{ name: 'home', params: { userId: 123 }, query: { userId: '123' }}">/</router-link></li>
          <li><router-link :to="{ path: 'foo', query: { userId: '456' }}">/foo</router-link></li>
          <li><router-link to="/bar?userId=789">/bar</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>

</style>
