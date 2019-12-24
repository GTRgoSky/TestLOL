<template>
    <div>
        foo
        <slot></slot>
        {{count}}
        <div @click="add">{{userID}}</div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            testData: 1
        };
    },
    beforeCreate() {},
    created() {},
    mounted() {
        console.log("foo");
        console.log(this.$router.currentRoute);
        // setTimeout(() => {
        //     console.log('time')
        // }, 1000);
        //console.log(this.userID) this.$store.state.person.userID;
    },
    name: "foo",
    activated() {
        //激活
        this.testData++;
        console.log("ac", this.testData);
    },
    deactivated() {
        //失去激活
        // console.log('de');
    },
    components: {},
    computed: {
        ...mapState(["count"]),
        ...mapState("user", ["userID"])
        // count () {
        //     return this.$store.state.count
        // }
    },
    methods: {
        ...mapMutations("user", ["changeuserID"]),
        add() {
            this.changeuserID("change");
        }
    }
};
</script>

<style lang="less" scoped>
</style>
