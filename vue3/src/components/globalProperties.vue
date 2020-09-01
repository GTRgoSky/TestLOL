<!-- MyBook.vue -->
<template>
    <div @click="add">1234</div>
</template>

<script>
// import { reactive } from "vue";
export default {
    mounted() {},
    setup() {
        // expose to template
        function add() {
            console.log(this, this.globalTest);
        }
        return {
            add,
        };
    },
};
</script>