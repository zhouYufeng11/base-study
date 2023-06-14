import Dep from './Dep.js';

const dep = new Dep();

//	对数据进行代理，拦截
export function reactive(data) {
	if(!isObject(data)) return data;	//	不需要进行代理
	return new Proxy(data, handelFunc());
}


function handelFunc() {
	return {
		get(target, key) {
			const value = Reflect.get(target, key);
			dep.collect(target, key);	//	因为深度代理 b 的时候，b -> target
			return isObject(value) ? reactive(value) : value;	//	如果是对象 -> 深度代理
		},
		set(target, key, value) {
			const oldValue = target[key];
			const res = Reflect.set(target, key, value);
			dep.nodify(target, key, value, oldValue);	// 用于更新数据	
			return res;
		}
	}
}

//	判断是不是对象
function isObject(obj) {
	if(typeof obj == 'object' && obj != null) {
		return true;
	}
}