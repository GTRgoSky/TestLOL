<!-- MyBook.vue -->
<template>
    <div @click="add">globalTest:{{globalTest}}</div>
</template>

<script>
// import { reactive } from "vue";
export default {
    mounted() {
        console.log(this.globalTest);
    },
    setup() {
        // expose to template
        function add() {
            console.log(this.globalTest);
        }
        return {
            add,
        };
    },
};
</script>