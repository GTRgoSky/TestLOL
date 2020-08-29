<template>
    <div>
        <h3 class="lifecycle">lifecycle</h3>
        <div @click="watchAndUpdate">{{getData}} + {{getDataCom}}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            getData: "测试"
        };
    },
    beforeCreate() {
        // console.log(this.getData); // -> undefined 无法访问到data
        // this.getData = '修改看是否有效' // 无效
        // console.log(Object.assign({}, this));
    },
    created() {
        // console.log(this.getData); // -> 测试
    },
    watch: {
        getData(n, o) {
            // console.log(n, o, 1);
        }
    },
    computed: {
        getDataCom() {
            // console.log(this.getData, 2);
            return this.getData;
        }
    },
    updated() {
        // console.log(this.getData, 3);
    },
    methods: {
        watchAndUpdate() {
            // 修改后 执行顺序是 1 -> 2 -> 3
            this.getData = "修改测试执行顺序";
        }
    }
};
</script>

<style>
</style>