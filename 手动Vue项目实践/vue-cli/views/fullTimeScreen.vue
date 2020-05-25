<template>
    <div class="time-style">{{now}}</div>
</template>

<script>
import { timeFormat } from "wing-time";
export default {
    data() {
        return {
            timer: null,
            now: ""
        };
    },
    mounted() {
        this.timer = setInterval(() => {
            try {
                this.now = timeFormat("hh:mm:ss");
            } catch (e) {
                clearInterval(this.timer);
            }
        }, 1000);
    },
    beforeDestory() {
        clearInterval(this.timer);
    }
};
</script>

<style lang="less">
.time-style {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: black;
    color: #fff;
    font-size: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>