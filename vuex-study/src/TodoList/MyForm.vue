<template>
	<div class="input-wrap">
		<input 
			type="search"
			v-model="text"
		/>
		<button
			@click="addTodo"
		>添加</button>
	</div>
</template>

<script>
	const { ref } = Vue;
 	import { useStore } from '../vuex/index.js';
	export default {
		name: 'MyFrom',
		setup() {
			const text = ref('');
			const store = useStore();

			const addTodo = function() {
				console.log(store);
				store.dispatch('addTodo', text.value);
			}

			return {
				text,
				addTodo
			}
		}
	}
</script>

<style></style>