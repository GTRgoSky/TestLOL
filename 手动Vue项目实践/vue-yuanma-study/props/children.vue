<template>
    <div @click="t">
        {{ fxnum }}
    </div>
</template>

<script>
export default {
    name: "children",
    props: {
        fxnum: {
            type: Number,
            default: 0,
        },
        test: {
            type: Function,
        },
    },
    methods: {
        t() {
            this.test();
            this.$emit("em");
        },
    },
};
</script>

<style>
</style>