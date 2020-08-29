<template>
    <div>
        <div @click="test" v-on:click="test2">watchData:{{watchData}}*|*|*watchData2:{{watchData2}}</div>
        <p>watcheComputed: {{watcheComputed}}</p>
        <p>watcheComputed2：{{watcheComputed2}}</p>
        <p>watchData3:{{watchData3}}</p>
        <p>watchData4: {{watchData4.watchData4Child}}</p>
        <p>watchData5: {{watchData5}}</p>
    </div>
</template>

<script>
/**
 * 1、检测执行顺序
 * ans: watch -> computed -> updated
 * 2、只要 watchData || watchData2 改变则 watcheComputed 就会触发
 * 3、immediate: true 立即执行
 * 4、watchData3 数组监听都会执行
 * 5、字符串深度遍历后监听
 * 6、sync 立即触发，不再是推到回调栈里，等nextTick的时候触发了
 * 7、绑定了2个会遍历执行 - test1，test2
 * 8、每次触发更新后都会把模板上的计算属性从新求值
 * 9、watch是异步待模板更新后执行的
 */
export default {
    name: "watchAndcomputed",
    data() {
        return {
            watchData: 1,
            watchData2: 2,
            watchData3: 3,
            watchData4: {
                watchData4Child: 4
            },
            watchData5: 5,
            watchData6: 6
        };
    },
    computed: {
        watcheComputed() {
            console.log("watcheComputed");
            return this.watchData + this.watchData2;
        },
        watcheComputed2() {
            console.log("watcheComputed2");
            return this.watchData6;
        }
    },
    watch: {
        watchData(n, o) {
            console.log("watchData", n);
        },
        watchData2: {
            immediate: true,
            handler: function(n, o) {
                console.log("watchData2", n, o);
            }
        },
        watchData3: ["one", "two"],
        "watchData4.watchData4Child": {
            handler: function(n, o) {
                console.log("watchData4", n, o);
            }
        },
        watchData5: {
            sync: true,
            handler: function(n, o) {
                // 立即触发，不再是推到回调栈里，等nextTick的时候触发了
                this.watchData3++; // 此时watchData3直接变为5（+2）而不是4（+1）了
                console.log("watchData5", n, o);
            }
        }
    },

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
        },
        one(n, o) {
            console.log("watchData3：one", n, o);
        },
        two(n, o) {
            console.log("watchData3：two", n, o);
        }
    },
    created() {},
    mounted() {}
};
</script>

