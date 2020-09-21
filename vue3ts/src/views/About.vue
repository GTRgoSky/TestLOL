<template>
    <div class="about">
        <div>{{ title }}</div>
        <button @click="setTitle('setTitle')">setTitle</button>
        <button @click="nextTickSetTitle('nextTickSetTitle')">nextTickSetTitle</button>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    onMounted,
    onUpdated,
    onUnmounted,
} from "vue";
import { useStore } from "vuex";

export default defineComponent({
    name: "hello world",
    props: {},
    setup() {
        const store = useStore();
        const title = computed(() => store.state.title);

        const setTitle = (nextTitle: string): void => {
            store.commit("setTitle", nextTitle);
        };
        const nextTickSetTitle = async (nextTitle: string): Promise<void> => {
            await store.dispatch("nextTickSetTitle", nextTitle);
        };

        onMounted(() => {
            console.log("onMounted");
        });
        onUpdated(() => {
            console.log("onUpdated");
        });
        onUnmounted(() => {
            console.log("onUnmounted");
        });

        return {
            setTitle,
            nextTickSetTitle,
            title,
        };
    },
});
</script>
