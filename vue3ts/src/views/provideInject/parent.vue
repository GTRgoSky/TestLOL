<!-- provideStore.vue -->
<template>
    <div>
        <h1>provideInject</h1>
        <child></child>
        {{ msg }}
    </div>
</template>


<script lang="ts">
/* eslint-disable */
import { ref, defineComponent, provide } from "vue";
import child from "./child.vue";

export default defineComponent({
    components: {
        child,
    },
    provide() {
        return {
            msg: this.msg,
        };
    },
    setup() {
        let msg = ref(0);
        function testClick() {
            msg.value++;
        }

        return {
            msg,
            testClick,
        };
    },
});
</script>