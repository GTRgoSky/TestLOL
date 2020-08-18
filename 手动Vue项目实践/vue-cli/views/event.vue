<template>
    <div>
        <div @click="test" v-on:click="test2">watchData:{{watchData}}*|*|*watchData2:{{watchData2}}</div>
        <p>watchData3:{{watchData3}}</p>
        <p>watchData4: {{watchData4.watchData4Child}}</p>
        <p>watchData5: {{watchData5}}</p>
    </div>
</template>

<script>
/**
 * 1、绑定了2个会遍历执行 - test1，test2
 */
export default {
    name: "event",
    data() {
        return {
            watchData: 1,
            watchData2: 2,
            watchData3: 3,
            watchData4: {
                watchData4Child: 4
            },
            watchData5: 5
        };
    },
    computed: {},
    watch: {},

    methods: {
        test() {
            console.log("test");
            this.watchData++;
            this.watchData2--;
            this.watchData3++;
            this.watchData4.watchData4Child++;
            this.watchData5++;
        },
        test2() {
            console.log("test2");
        }
    },
    created() {},
    mounted() {}
};
</script>

