<template>
    <div>
        <label>
            {{ label }}
            <input v-bind="$attrs" v-bind:value="value" v-on="inputListeners" />
        </label>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: ["label", "value"],
    mounted() {
        console.log(this.$attrs, this.$listeners);
    }
};
</script>

<style>
</style>