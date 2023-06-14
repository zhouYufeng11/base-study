import { forEachValueKey } from './utils.js'

const { computed } = Vue;

//	层级传递
// 创建 createActions	createMutations
export function createActions(store, actions) {
	forEachValueKey(actions, function (actionsKey, actionsFn) {
		store._actions[actionsKey] = function(payload) {	//	给 _mutations 添加一个方法，供内部调用
			actionsFn.apply(store, [store, payload]);	// 执行 mutations 里面提供的方法
		}
	});
}

export function createMutations(store, mutations) {
	forEachValueKey(mutations, function (nutationsKey, mutationsFn) {
		store._mutations[nutationsKey] = function(payload) {	//	给 _mutations 添加一个方法，供内部调用
			mutationsFn.apply(store, [store.state, payload]);	// 执行 mutations 里面提供的方法
		}
	});
}

//	注意处理方式
export function createGetters(store, getters) {
	store.getters = {};

	forEachValueKey(getters, function (gettersKey, gettersFn) {
		//	被代理了 当 里面依赖的数据发生变更
		const computedFn = computed(() => gettersFn(store.state, store.getters));

		//	相当于 computed 需要对其进行代理
		Object.defineProperty(store.getters, gettersKey, {
			get() {
				return computedFn.value; // 访问的是被代理的数据
			}
		})
	});
}


export function createDispatchFn(store, dispatch) {
	//	给实例添加方法
	store.dispatch = function(type, payload) {
		dispatch.apply(store, [type, payload]);
	}
}

export function createCommitFn(store, commit) {
	store.commit = function(type, payload) {
		commit.apply(store, [type, payload]);
	}
}