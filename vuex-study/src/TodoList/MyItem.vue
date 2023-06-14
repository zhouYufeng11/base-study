<template>
	<div class="item">
		<input type="checkbox" 
			@click="toggleTodo(todo.id)"
			:checked="todo.isFinish"
		/>
		<span>{{todo.id}}</span>
		<span>{{ todo.text }}</span>
		<button
			@click="deleteTodo(todo.id)"
		>删除</button>
	</div>
</template>

<script>
	import { useStore } from '../vuex/index.js';

	export default {
		name: 'MyItem',
		props: {
			todo: Object
		},
		setup() {
			const store = useStore();

			const deleteTodo = (id) => {
				store.dispatch('deleteTodo', id);
			};
			const toggleTodo = (id) => {
				store.dispatch('toggleTodo', id);
			}

			return {
				deleteTodo,
				toggleTodo
			};
		}
	}
</script>

<style></style>