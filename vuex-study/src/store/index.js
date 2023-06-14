import state from './state.js';
import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';

//	从 vuex 中解构出来 createStore
import { createStore } from '../vuex/index.js';

//	创建 store
const store = createStore({
	state,
	actions,
	mutations,	//	变异
	getters
});

export default store;