<template>
	<div class="wrap">
		<todo-list></todo-list>
	</div>
</template>

<script>
	import TodoList from './TodoList/index.vue';

	export default {
		name: 'App',
		components: {
			TodoList
		}
	}
</script>

<style></style>