<!-- grandson.vue -->
<template>
    <h1>{{grandson}}</h1>
    <p>{{grandsonProp}}</p>
</template>


<script>
import { ref, defineComponent } from "vue";
export default defineComponent({
    props: {
        grandsonProp: [Number, String],
    },
    setup() {
        const grandson = ref("grandson");
        // const grandsonProp = prop.grandsonProp;
        return {
            grandson,
            // grandsonProp,
        };
    },
});
</script>