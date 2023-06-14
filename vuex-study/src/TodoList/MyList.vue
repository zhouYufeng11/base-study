<template>
	<div class="list">
		<template v-if="store.getters.toggleTodos.length">
			<my-item
				v-for="todo of store.getters.toggleTodos"
				:todo="todo"
				:key="todo.id"
			></my-item>
		</template>
	</div>
</template>

<script>
	import MyItem from './MyItem.vue'

	import { useStore } from '../vuex/index.js';

	export default {
		name: 'MyList',
		components: {
			MyItem
		},
		setup(props, context) {
			console.log(context);
			const store = useStore();

			return {
				store
			}
		}
	}
</script>

<style></style>