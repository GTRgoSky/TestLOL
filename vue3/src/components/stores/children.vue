<!-- children.vue -->
<template>
    <div>{{children}}</div>
</template>


<script>
import Store from "../../../stores/index";
import { inject } from "vue";
export default {
    setup() {
        let children = inject(Store.children);
        console.log(children);
        return {
            children,
        };
    },
};
</script>