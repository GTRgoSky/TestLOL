<template>
    <div>
        <div @click="test">{{watcheData}}{{watcheComputed}}</div>
    </div>
</template>

<script>
export default {
    name: "home",
    data() {
        return {
            watcheData: 1
        };
    },
    computed: {
        watcheComputed() {
            console.log(123);
            return this.watcheData;
        }
    },
    watch: {
        watcheData(n, o) {
            console.log(777, n);
        }
    },

    methods: {
        test() {
            this.watcheData = 66;
            console.log(886);
        }
    },
    created() {},
    mounted() {}
};
</script>

