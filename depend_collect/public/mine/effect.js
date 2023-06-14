//	保留 callback 
import Dep from './Dep.js'; 
import ComputedRef from './ComputedRef.js';

export function watch(depFunc, callback) {

}

export function watchEffect(callback) {
	Dep.callback = callback;	//  在调用的时候将其传递给Dep
	callback();	//	执行callback -> 触发 getter -> 执行 collect -> 收集
	Dep.callback = null;
}

export function computed(callback) {
	Dep.callback = callback;

	const value = callback();	//	初始化
	const computedRef = new ComputedRef(value);

	callback.computedRef = computedRef;

	return computedRef;
}
