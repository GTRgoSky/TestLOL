<script>
// 函数式组件
export default {
    functional: true,
    render(createElement, context) {
        console.log(context, this);
        return createElement("div", {}, [
            createElement("p", {}, "vnode2-start"),
            context.children,
            context.scopedSlots.hasname({ user: 123 }), //作用域插槽
            context.scopedSlots.hasnamenew({ user: 456 }), //作用域插槽
            createElement(
                "p",
                {
                    style: {
                        color: "red"
                    },
                    class: {
                        vnode2cls: true
                    },
                    on: {
                        click: test
                    }
                },
                "props" +
                    context.props.halo.ttt +
                    context.props.testpro +
                    context.props.halo.tts
            ),
            createElement(
                "p",
                {
                    style: {
                        color: "blue"
                    },
                    on: {
                        click: context.listeners.tesr
                    }
                },
                "触发父级emit"
            )
        ]);
        function test() {
            alert(222);
        }
    },
    functiont() {
        alert("functiont");
    }
};
</script>

<style>
</style>