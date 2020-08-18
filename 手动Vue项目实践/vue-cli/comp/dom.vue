<template>
    <div>
        dom
        <div v-for="(item, index, key) in todo">
            <slot v-bind:todo="item"></slot>
            test: {{item}}-{{index}}-{{key}}
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
