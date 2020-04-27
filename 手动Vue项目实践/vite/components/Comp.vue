<template>
    <div>
        <button @click="count++">{{ count }}</button>
        <div @click="tcf">hahah</div>
        <div>{{ta}} + {{tc}}</div>
        <test
            v-for="item in 4"
            :key="item"
            :num="item"
            v-bind="obj"
            :attrobj="obj"
            attrstr="123"
            staticFont="static"
            @cliTs="cliTs"
        ></test>
        <!-- <test2 v-model="test2s"></test2> -->
        <test3 v-on:focus.native="onFocus"></test3>
    </div>
</template>

<script>
import test from "./test.vue";
// import test2 from "./test2.vue";
import test3 from "./test3.vue";
export default {
    data: () => ({
        count: 0,
        tc: 0,
        obj: {
            a: 1,
            b: 2
        },
        test2s: true
    }),
    components: {
        test,
        // test2,
        test3
    },
    computed: {
        ta() {
            this.tr();
            return this.count;
        }
    },
    watch: {
        tc(n, o) {
            this.tcc();
        }
    },
    methods: {
        tcf() {
            this.tc = this.tc + 1;
        },
        tcc() {
            console.log(888);
        },
        tr() {
            console.log(999);
        },
        cliTs() {
            alert(123);
        }
    }
};
</script>

<style scoped>
button {
    color: red;
}
</style>
