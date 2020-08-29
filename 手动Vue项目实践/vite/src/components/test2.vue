<template>
    <input
        type="checkbox"
        v-bind:checked="checked"
        v-on:change="$emit('change', $event.target.checked)"
    />
</template>

<script>
export default {
    model: {
        prop: "checked",
        event: "change"
    },
    props: {
        checked: Boolean
    },
    created() {
        console.log(this.checked);
    }
};
</script>

<style>
</style>