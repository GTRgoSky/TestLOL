<!-- provideStore.vue -->
<template>
    <div>
        <child @test="testClick" :msg="msg"></child>
        {{ msg }}
    </div>
</template>


<script lang="ts">
/* eslint-disable */
import { ref, defineComponent } from "vue";
import child from "./child.vue";

export default defineComponent({
    components: {
        child,
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