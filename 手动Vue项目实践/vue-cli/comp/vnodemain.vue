<template>
    <div>
        <vnode></vnode>
        <vnode2 testpro="gsgsg" :halo="obj" @tesr="tesr">
            <div>匿名slot</div>
            <template v-slot:hasname="user">
                <h1>slot具名 + {{user.user}}</h1>
            </template>
            <template #hasnamenew="user">
                <h1>slot具名#写法 + {{user.user}}</h1>
            </template>
        </vnode2>
    </div>
</template>
<script>
export default {
    data() {
        return {
            testhhh: 123,
            iv: 555,
            obj: {
                ttt: 111,
                tts: 222
            }
        };
    },
    components: {
        vnode: () => import("./vnode.vue"),
        vnode2: () => import("./vnode2.vue")
    },
    methods: {
        tesr() {
            alert("tesr");
        }
    }
};
</script>

<style>
</style>