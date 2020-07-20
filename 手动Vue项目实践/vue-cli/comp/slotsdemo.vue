<template>
    <section>
        <slot name="test">原来的值</slot>
        <blog-postt></blog-postt>
        <blog-post>
            <h1 slot="header">About Me</h1>

            <p>Here's some page content, which will be included in vm.$slots.default, because it's not inside a named slot.</p>

            <p slot="footer">Copyright 2016 Evan You</p>

            <p>If I have some content down here, it will also be included in vm.$slots.default.</p>.
        </blog-post>
    </section>
</template>

<script>
export default {
    created() {
        //目前理解这种写法是可以不通过子组件slot而直接父级写，子组件通过拿到slot直接进行Dom创建？
        Vue.component("blog-post", {
            render: function(createElement) {
                // console.log(this.$slots);
                var header = this.$slots.header;
                var body = this.$slots.default;
                var footer = this.$slots.footer;
                return createElement("div", [
                    createElement("header", header),
                    createElement("main", body),
                    createElement("footer", footer)
                ]);
            }
        });
        var header = this.$slots.created;
        Vue.component("blog-postt", {
            render: function(createElement) {
                return createElement("section", [
                    createElement("header", header)
                ]);
            }
        });
    },
    mounted() {
        // console.log(this.$slots, "获取了父级slot");
    },
    methods: {
        test() {
            alert(1);
        }
    }
};
</script>
