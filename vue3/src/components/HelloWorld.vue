<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>{{ms}}</h2>
    </div>
</template>

<script>
export default {
    name: "HelloWorld",
    props: {
        msg: String,
    },
    data() {
        return {
            ms: 666,
        };
    },
};
</script>

<style lang="scss" scoped>
.hello {
    background-image: resolve("miao.jpg"); // postcssrc
    // background-image: url("../assets/miao.jpg");
}
</style>