<!--Vue 2.6 的一些新特性尝试 .sync -->
<!--针对 emit的语法糖-->
<template>
    <section>
        <div @click="test">test {{datat}}</div>
        <div @click="test2">test2 {{datao.text}}</div>
    </section>
</template>
<script>
export default {
    props: {
        datat: {
            type: String,
            default: ""
        },
        datao: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            cont: 1
        };
    },
    methods: {
        test() {
            let newTitle = "sync change" + this.cont++;
            this.$emit("update:datat", newTitle);
        },
        test2() {
            let newTitle = "sync change" + this.cont++;
            this.$emit("update:datao", {
                text: newTitle
            });
        }
    }
};
</script>

