<template>
	<div class="todolist">
		<my-form></my-form>
		<my-tab></my-tab>
		<my-list></my-list>
	</div>

</template>

<script>
	import MyForm from './MyForm.vue';
	import MyTab from './MyTab.vue';
	import MyList from './MyList.vue';

	export default {
		name: 'TodoList',
		components: {
			MyForm,
			MyTab,
			MyList
		},
		mounted() {
			// console.log(store);
		}
	}
</script>

<style></style>