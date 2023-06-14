//	ajax 请求

class HTTP() {
	static _doAjax(options) {
		//	创建 ajax 对象
		const xhr = window.XMLHttpRequest ? new XMLHttpRequest()
																			: new ActiveXObject('HTTP.Microsoft');

		//	处理参数
		const type = options.type ? options.type.toUpperCase() : 'GET',
					url = options.url,
					async = options.async + '' == 'false' ? false : true,
					data = options.data || {},
					success = options.success || function() {},
					error = options.error || function() {};

		if(!url) throw new Error('url 没有上传');

		xhr.open(type, url, async);	//	建立连接

		//	判断是不是 post 请求
		if(type == 'POST') xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		//	发送数据
		xhr.send(type == 'GET' ? null : formatData(data));

		//	监听状态
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
					try {
						success(JSON.parse(xhr.responseText));
					} catch( ev ) {
						success(xhr.responseText);
					}
				}
			}
		}

	}

	ajax(options) {
		HTTP._doAjax(options);
	}
}

//	处理 post 请求的参数格式
function formatData(data) {
	let str = '';

	for(let key in data) {
		str += `${key}=${data[key]}&`;
	}

	return str.replace(/&$/, '');
}

export default new HTTP();
