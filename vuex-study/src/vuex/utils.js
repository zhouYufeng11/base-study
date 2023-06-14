export function forEachValueKey(obj, callback) {
	Object.keys(obj).forEach(key => callback(key, obj[key])); // 获取方法 及 方法名 -> 目的是利用派发器思想
}
