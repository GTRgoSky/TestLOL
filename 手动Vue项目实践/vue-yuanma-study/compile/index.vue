<template>
    <div>
        <h1 id="lal">测试compile</h1>
        <p>{{ msg }}</p>
    </div>
</template>

<script>
const vm = {
    test: 999,
    data() {
        return {
            msg: "999",
        };
    },
    created() {},
};
export default vm;
</script>

<style>
</style>