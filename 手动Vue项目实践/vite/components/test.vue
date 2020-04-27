<template>
    <div>
        <div>gagag + {{num}} + {{staticFont}}</div>
        <div @click="$emit('cliTs')">{{a}} + {{b}}</div>
    </div>
</template>

<script>
export default {
    inheritAttrs: false, // 不希望组件的根元素继承 attribute

    props: ["num", "staticFont", "a", "b"],
    created() {
        // console.log(this.$attrs);
    }
};
</script>

<style>
</style>