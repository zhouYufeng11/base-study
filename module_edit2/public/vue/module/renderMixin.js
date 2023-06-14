

//	render 函数的配置项
export function renderMixin(Vue) {
	Vue.prototype._c = function() {
		return createElement(...arguments);
	}

	//	处理模板字符串 参数不能为 null
	Vue.prototype._s = function(value) {

		if(value == null) return;
		//	value -> 传递进来的参数
		return typeof value == 'object' ? JSON.stringify(value) : value;
	}

	Vue.prototype._v = function(text) {
		return createTextNode(text);
	}

	Vue.prototype._render = function() {
		const vm = this,
					render = vm.$options.render,
					vnode = render.call(vm);	//	改变里面 this 的指向

		return vnode;
	}
}

//	... 需要解构
function createElement(tag, attrs = {}, ...children) {
	return vnode(tag, attrs, children);
}

//	创建文本节点
function createTextNode(text) {
	return vnode(undefined, undefined, undefined, text);
}

//	生成节点
function vnode(tag, attrs, children, text) {
	return {
		tag,
		attrs,
		children,
		text
	};
}
