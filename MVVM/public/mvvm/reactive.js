

export function reactive (data) {
	return new Proxy(data, {
		get( target, key ) {
			//	这个 target 就是传进来的对象
			return Reflect.get(target, key);
		},
		set( target, key, value ) {
			const res = Reflect.set(target, key, value);	//	设置值
			//	更新视图
			return res;
		}
	})
}

