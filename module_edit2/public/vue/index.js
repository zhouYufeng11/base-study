import { initMixin } from './module/initMixin.js';
import { lifeCycleMixin } from './module/lifecycle.js';
import { renderMixin } from './module/renderMixin.js';


export default function Vue(options) {
	const vm = this;

	//	初始化
	initMixin(Vue);
	renderMixin(Vue);
	lifeCycleMixin(Vue);	//	处理声明周期函数

	this._init(options);
}