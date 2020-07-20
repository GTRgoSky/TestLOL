<template>
    <div>
        dom
        <div v-for="item in todo">
            <slot v-bind:todo="item"></slot>
        </div>
    </div>
</template>

<script>
export default {
    created() {},
    props: {
        todo: {
            default: [],
            type: Array
        }
    },
    methods: {
        test() {}
    }
};
</script>

<style lang="less" scoped>
</style>
