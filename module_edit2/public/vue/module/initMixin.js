import { compilerRenderFunction } from './compiler.js';
import { mountComponent } from './lifecycle.js';

export function initMixin(Vue) {
	//	在 vue 的原型上 添加方法
	Vue.prototype._init = function(options) {
		const vm = this;

		vm.title = "詹志宇";
		vm.name = '詹志宇';

		vm.$options = options;

		//	判断有没有 el
		if(vm.$options.el) {
			console.log(vm.$options.el);
			vm.$el = document.querySelector(vm.$options.el);
			vm.$mount(vm.$el);
		}
	}

	Vue.prototype.$mount = function(el) {
		const vm = this,
					options = vm.$options;

		//	判断 options 里面有没有 render 函数
		if(!options.render) {
			var template = options.template;

			if(!template && el) {
				template = el.outerHTML;
			}
		}

		//	--- template 处理完成 ---
		//	将其交给另一个 专门的处理函数
		const render = compilerRenderFunction(template);
		//	将其放到 options 上面， 不让外界直接访问
		options.render = render;

		mountComponent(vm);	//	在render函数被绑定之后执行
	}
}