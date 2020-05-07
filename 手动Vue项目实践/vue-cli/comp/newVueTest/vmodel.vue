<!--model属性在组件使用 v-model时，改变效果。 -->
<!-- model.prop指定的key被当作prop传入,值为v-model绑定值。 -->
<!-- model.event被当作事件监听 @change= val => v-model绑定值 = val -->
<template>
    <section>
        <div @click="test">test {{checked}}</div>
    </section>
</template>
<script>
export default {
    model: {
        prop: "checked",
        event: "change"
    },
    props: {
        checked: {
            type: String,
            default: ""
        }
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {
        test() {
            let newTitle = "vmodel change";
            this.$emit("change", newTitle);
        }
    }
};
</script>

