<!--Vue 2.6 的一些新特性尝试 .sync -->
<!--针对 emit的语法糖-->
<template>
    <section>
        <div @click="test">test {{datat}}</div>
    </section>
</template>
<script>
export default {
    props: {
        datat: {
            type:String,
            default: ''
        }
    },
    data() {
        return {
            cont:1
        }
    },
    methods: {
        test() {
            let newTitle = 'sync change' + this.cont++;
            this.$emit('update:datat', newTitle)
        }
    }
}
</script>

