<template>
	<div class="tabs">
		<button
			@click="setFilter('all')"
			:class="{ active: store.state.filter == 'all' }"
		> tab-all </button>
		<button
			@click="setFilter('finished')"
			:class="{ active: store.state.filter == 'finished' }"
		> tab-finished </button>
		<button
			@click="setFilter('unfinished')"
			:class="{ active: store.state.filter == 'unfinished' }"
		> tab-unfinished </button>
	</div>
</template>

<script>
	import { useStore } from '../vuex/index.js';

	export default {
		setup() {
			const store = useStore();	//	获取store -> 推荐
			
			const setFilter = (filter) => {
				store.commit('setFilter', filter);
			} 

			return {
				store,
				setFilter
			}
		}
	}
</script>

<style lang="scss">
	.active {
		background-color: red;
		color: white;
	}
</style>