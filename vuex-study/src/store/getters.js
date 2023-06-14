//	相当于 vue 的 computed
//	注意 计算属性是一个 值， 调用属性会触发相应的函数
export default {
	finishedTodos(state) {
		return state.todos.filter(todo => todo.isFinish);
	},
	unfinishedTodos(state) {	// state 底层传的 
		return state.todos.filter(todo => !todo.isFinish);
	},
	toggleTodos(state, getters) {	//	参数 2 对象本身
		switch(state.filter) {
			case 'all':
				return state.todos;
			case 'finished':
				return getters.finishedTodos;
			case 'unfinished':
				return getters.unfinishedTodos;
			default:
				return state.todos;
		}
	}
}