<!-- grandson.vue -->
<template>
    <div>{{grandson}}</div>
</template>


<script>
import Store from "../../../stores/index";
import { inject } from "vue";
export default {
    setup() {
        let grandson = inject(Store.grandson);
        console.log(grandson);
        return {
            grandson,
        };
    },
};
</script>