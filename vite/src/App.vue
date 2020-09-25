<template>
    <h1>666</h1>
    <h1>{{ msg }}</h1>
    <button @click="changeMsg">改变msg</button>
    <!-- <div>
		<HelloWorld msg="Hello Vue 3.0 + Vite" />
    </div>-->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';

export default {
    name: "App",
    data() {
        return {
            msg: 1,
        };
    },
    components: {
        // HelloWorld,
    },
    methods: {
        changeMsg() {
            this.msg++;
        },
    },
};
</script>
