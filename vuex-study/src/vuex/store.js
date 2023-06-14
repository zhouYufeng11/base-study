import {
	createActions,
	createMutations,
	createGetters,
	createDispatchFn,
	createCommitFn
} from './creators.js';

const { reactive, inject } = Vue;

//	将方法放到原型链上面，避免每次产生新的对象，都要重新 声明定义这些方法	
//	这样写的好处 -> 不需要 手动的将 方法绑定到 构造函数的 原型上面了
//	所有原型上的方法 都是 静态方法
class Store {
	constructor(options) {
		const {
			state,
			actions,
			mutations,
			getters
		} = options;

		const store = this;	//	保存 this指向  store实例
		const { dispatch, commit } = store;	//	解构出来 实例要用

		//	将用户传递过来的数据全部保留到 store 里面 -> 避免干扰内部
		store._state = reactive({data: state});	//	对数据进行代理 -> 每次执行的时候 把 data 变成新的 new _state

		//	create(null) -> 避免使用 Object 上面的方法
		store._mutations = Object.create(null);
		store._actions = Object.create(null);

		//	解决 dispatch，store 方法 内部 this 指向的问题
		createActions(store, actions);
		createMutations(store, mutations);
		createGetters(store, getters);
		createDispatchFn(store, dispatch);
		createCommitFn(store, commit);
	}

	// 用户使用  store.state.xxx 访问数据	
	get state() {
		return this._state.data;
	}

	//	dispatcy -> 访问 actions
	//	解构 this 指向 -> 不使用箭头函数 -> 太过于高级，逻辑不清
	dispatch(type, payload) {	//	type -> actions 里面提供的方法的方法名
		console.log(type);
		this._actions[type](payload);
	}

	//	commit -> 访问 mutations
	commit(type, payload) {
		this._mutations[type](payload);
	}

	install(app) {	//	use 在注册插件的时候要对其进行调用 -> 不经过实例化
		app.provide('store', this);
		//	可以再所有的组件的模板中使用 $store
		app.config.globalProperties.$store = this;
	}
}




//	创建 store -> 生成一个插件
//	每一次执行 都要返回一个新的 store
//	利用工厂 每一次生产出来一个 -> 工厂函数
export function createStore(options) {
	return new Store(options);
}

//	使用 store
export function useStore(options) {
	return inject('store');
}