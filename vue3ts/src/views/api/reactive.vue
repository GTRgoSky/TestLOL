<template>
    <div @click="test">Reactive</div>
</template>

<script lang="ts">
import { reactive } from "vue";

export default {
    setup() {
        const rfReact = reactive([1, 2, 3]);
        // const rfReact2 = reactive([5, 6, 7]);

        function test() {
            rfReact[0] = 22;
            console.log((rfReact as any)["__v_raw"]);
        }
        return {
            test,
            rfReact,
            // rfReact2,
        };
    },
};
</script>
