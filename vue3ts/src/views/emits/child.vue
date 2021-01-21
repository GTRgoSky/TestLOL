<!-- provideStore.vue -->
<template>
    <div @click="updateP">惦记我</div>
</template>


<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";

export default defineComponent({
    components: {},
    emits: {
        "my-close": null,
        test: (v: any) => {
            console.log(v);
            if (v < 3) return true;
            return false;
        },
    },
    props: {
        msg: Number,
    },
    setup(props, context) {
        function updateP() {
            context.emit("test", props.msg);
        }
        return {
            updateP,
        };
    },
});
</script>