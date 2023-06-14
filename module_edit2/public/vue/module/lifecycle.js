import { patch } from './patch.js';


export function mountComponent(vm) {
	vm._update(vm._render());
}

export function lifeCycleMixin(Vue) {
	Vue.prototype._update = function(vnode) {
		const vm = this;
		patch(vm.$el, vnode);	//	将 vnode 转换成 真实dom -> 添加到 
	}
}