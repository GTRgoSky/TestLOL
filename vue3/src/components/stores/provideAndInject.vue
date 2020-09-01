<!-- provideStore.vue -->
<template>
    <div>provideStore</div>
    <child></child>
    <grandson></grandson>
</template>


<script>
import Store from "../../../stores/index";
import { ref, provide } from "vue";
import child from "./children";
import grandson from "./grandson";
export default {
    components: {
        child,
        grandson,
    },
    setup() {
        let state = ref(false);
        provide(Store.children, ref("children-provide"));
        provide(Store.grandson, ref("grandson-provide"));
        return {
            state,
        };
    },
};
</script>