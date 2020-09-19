<template>
	<h1>666</h1>
	<h1>{{ msg }}</h1>
	<div>
		<HelloWorld msg="Hello Vue 3.0 + Vite" />
	</div>
	<h1>777</h1>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
	name: 'App',
	data() {
		return {
			msg: 'Hello World',
		};
	},
	components: {
		HelloWorld,
	},
};
</script>
