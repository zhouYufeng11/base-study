export default {
	//	commit 派送，委任 -> dispatch
	//	将 函数名 作为 type
	//	payload -> mutation 所需要的参数
	addTodo({commit}, text) {
		commit('addTodo', text);
	},
	toggleTodo({commit}, id) {	
		commit('toggleTodo', id);
	},
	removeTodo({commit}, id) {
		commit('removeTodo', id);
	}
};