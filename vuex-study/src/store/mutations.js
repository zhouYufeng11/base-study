export default {
	//	调用的相应的方法 修改 state 上面的数据
	addTodo(state, text) {
		state.todos.push({
			id: state.id ++,
			text,
			isFinish: false
		});
	},
	toggleTodo(state, id) {	
		state.todos = state.todos.map(todo => {
			if(todo.id == id) {
				todo.isFinish = !todo.isFinish;
			}
			return todo;
		})
	},
	removeTodo(state, id) {
		state.todos = state.todos.filter(todo => todo.id != id);
	},
	setFilter(state, filter) {	//	toggle tab	-> 不需要走 异步
		state.filter = filter;
	}
}