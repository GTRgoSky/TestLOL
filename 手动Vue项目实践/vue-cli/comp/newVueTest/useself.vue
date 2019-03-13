<template>
    <section class="section-bg">
        test
        <useself v-if="test < 2" :test="test + 1"></useself>
    </section>
</template>
<script>
// 自己调用要有界限否则会内存溢出
export default {
    name: "useself",
    props:['test']
}
</script>

