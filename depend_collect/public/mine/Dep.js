//	用来处理依赖 -> 便于扩展
export default class Dep {
	constructor() {
		this.depWeakMap = new WeakMap();	//	创建一个 WeakMap 用来存放依赖 -> 弱引用 -> 便于垃圾回收
	}

	//	静态属性 -> 用来获取 callback
	static callback = null;

	//	收集，在callback执行的时候收集回调函数的依赖，并在下次依赖更新的时候能够找到相对应的回调函数并执行
	collect(target, key) {
		const { callback } = Dep;
		//	能够访问的到，就说明之前存过了 -> 避免重复
		let depMap = this.depWeakMap.get(target);
		//	不存在 -> 向depWeapMap 里面追加
		if(!depMap) {
			depMap = new Map();
			this.depWeakMap.set(target, depMap);	//	向 WeakMap 里面添加数据
		}

		//	判断 里面有没有Set， 没有将Set 添加进去
		let depSet = depMap.get(key);
		//	Map 中没有保存 -> 将其添加进去
		if(!depSet) {
			depSet = new Set();
			depMap.set(key, depSet);	//	向 Map 里面添加数据
		}
		//	给 depSet添加callback
		depSet.add(callback); //	只要有callback 执行，就会将callback收集 -> 向 Set 里面添加数据
	}

	//	通知 -> 用来监听响应式数据是否走了set
	//	target -> Map
	//	key -> Set -> 依赖该key的回调函数
	nodify(target, key, value, oldValue) {
		const callbackPool = this.depWeakMap.get(target).get(key);
		callbackPool.forEach(cb => {
			//	将 computed 这个对象 挂在这个回调函数上面，在执行callback的时候便于重新给computed 赋值
			const newValue = cb(value, oldValue);
			if(cb.computedRef) {	//	也就是有没有computed
				cb.computedRef.value = newValue;
			}
		})
	}
};