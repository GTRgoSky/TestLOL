<template>
    <div>
        <child :fxnum="fxnum" :test="test" @em="emtest" />
    </div>
</template>

<script>
import child from "./children.vue";
export default {
    name: "parent",
    data() {
        return {
            fxnum: 1,
        };
    },
    components: {
        child,
    },
    methods: {
        test() {
            console.log("test");
            console.log(this);
        },
        emtest() {
            console.log("emtest");
            console.log(this);
        },
    },
};
</script>

<style>
</style>