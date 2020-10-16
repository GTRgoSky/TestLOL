<!-- MyBook.vue -->
<template>
	<div @click="add">setUpMethods:{{ globalTest }}</div>
	<div @click="add2">methods</div>
</template>

<script>
import { getCurrentInstance } from 'vue';
export default {
	mounted() {
		console.log(this.globalTest);
	},
	methods: {
		add2() {
			console.log(this);
			console.log(this.globalTest, 2);
		},
	},
	setup() {
		const { ctx } = getCurrentInstance();
		// expose to template
		function add() {
			console.log(ctx, ctx.globalTest);
		}
		return {
			add,
		};
	},
};
</script>
