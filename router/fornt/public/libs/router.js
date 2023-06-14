export default function Router(routers) {

	return function( el ) {
		//	对路由表进行映射
		

		//	toggle
		function toggleRouter() {
			//	获取 hash 值, 处理之后的
			const pathArr = formatData(location.hash);

			//	进行比对判断需要显示的内容
			routers.forEach( router => {
				const routeArr = formatData(router.path);

				if(pathArr[0] == routeArr[0]) {	//	是需要访问的页面
					this.innerHTML = router.view();	//	切换整个页面
				}
			});
		}

		//	处理 hash 
		function formatData(hash) {
			const hashArr = hash.slice(1).split('/').filter(item => item !== '');
			return hashArr;
		}

		//	事件监听
		window.addEventListener('load', toggleRouter.bind(el), false);
		window.addEventListener('hashchange', toggleRouter.bind(el), false); 
	}
}
