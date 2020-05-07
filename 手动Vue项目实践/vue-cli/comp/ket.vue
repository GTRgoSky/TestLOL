<template>
    <div id="classT">
        ket
        <p v-pre>666{{aa}}</p>
        <p v-once class="class1">This will never change: {{msg}}</p>
        <p class="class2">This will change: {{msg}}</p>
        <input type="text" @keyup.enter="enter" name id />
        <button @click="testBus">testBus</button>
        <button @click="replaceRoute">replaceRoute</button>
        <button @click="giveStr(testStr)">{{testStr}}</button>
        <!-- <button @click="giveObj(testObj)">{{testObj.name}}</button> 与str效果一样-->
        <div v-for="item in testArry" :key="item.name" @click="giveArr(item)">{{item.name}}</div>
        <!-- 下面这个 与str效果一样 -->
        <div v-for="(item,key) in testObj" :key="key" @click="giveObj(item,key)">{{item}}+{{key}}</div>
        <test-com></test-com>
        <div @click="testObjWatch">testclick</div>
    </div>
</template>

<script>
import { bus } from "../common/bus";
export default {
    extends: {
        methods: {
            testObjWatch() {
                alert(456);
            }
        }
    },
    data() {
        return {
            msg: "helo",
            testStr: "123你好", //测试字符串是否会被形参影响
            testObj: {
                name: "789你好", //测试obj是否会被形参影响
                test: "123"
            },
            testArry: [
                //测试arr是否会被形参影响
                {
                    name: "111你好",
                    obj: { key: 666 }
                },
                {
                    name: "222你好",
                    obj: { key: 666 }
                },
                {
                    name: "333你好",
                    obj: { key: 666 }
                }
            ]
        };
    },
    mounted() {
        console.log(this.$router.currentRoute);
    },
    methods: {
        testBus() {
            bus.$emit("isAlsoGetUserTansInfo", "");
            this.msg = "bye";
        },
        enter(e) {
            alert(e.target.value);
        },
        replaceRoute() {
            this.$router.replace({
                path: "/foo?u=123",
                query: { test: 1, tes: 2 }
            });
        },
        giveStr(giveStr) {
            giveStr = "111你好";
        },
        giveObj(giveObj, key) {
            console.log(giveObj);
            giveObj = "changed";
            key = "changedToo";
            console.log(this.testObj);
        },
        giveArr(item) {
            (item.name = "999你好"),
                (item.obj = {
                    key: "changed"
                });
            console.log(item, this.testArry);
        }
    },
    beforeDestroy() {
        bus.$off("isAlsoGetUserTansInfo");
    }
};
</script>

<style lang="less" scoped>
</style>
