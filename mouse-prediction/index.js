(function(doc) {
	const wrap = doc.getElementsByClassName('wrap')[0];

	const pageTop = getElementToPageTop(wrap),
				pageLeft = getElementToPageLeft(wrap),
				wrapW = parseFloat(getComputedStyle(wrap, null)['width']),
				wrapH = parseFloat(getComputedStyle(wrap, null)['height']);

	let pointArr = [];	//	注意数组中只保留最新的两个值

	const coordinate = {
		lt: {x: 0, y: 0},
		lb: {x: 0, y: wrapH},
		rt: {x: wrapW, y: 0},
		rb: {x: wrapW, y: wrapH}
	};

	const Test = function() {
		
	};

	Test.prototype._init = function() {
		this._bindEvent();
	};

	Test.prototype._bindEvent = function() {
		wrap.addEventListener('mouseenter', mouseEnter, false);
		wrap.addEventListener('mouseleave', mouseLeave, false);
	};

	function mouseEnter() {
		doc.body.addEventListener('mousemove', mouseMove, false);
	}

	function mouseMove(e) {
		pointArr = formatArray(pointArr, {
			x: getMouseXY(e).x - pageLeft,
			y: getMouseXY(e).y - pageTop
		});

		if(pointArr.length < 2) return;
		//	判断两个值的 x, y 的大小
		if(pointArr[0].x == pointArr[1].x || pointArr[0].y == pointArr[1].y) return;

		console.log(prediction(pointArr, coordinate));
	}	

	function mouseLeave() {
		doc.body.removeEventListener('mousemove', mouseMove, false);
	}

	//	根据坐标位置，进行行为预测
	function prediction(pointArr, coordinate) {

		//	根据 x 的大小来判断区间
		if(pointArr[1].x > pointArr[0].x) {	//	右半区
		 	return choose(coordinate.rt, coordinate.rb, pointArr);
		} else if(pointArr[1].x < pointArr[0].x) {
			return choose(coordinate.lt, coordinate.lb, pointArr);
		}
	}

	function choose(pt, pb, pointArr) {
		const line1 = Math.abs((pt.y - pointArr[0].y) / (pt.x - pointArr[0].x));
				  line2 = Math.abs((pb.y - pointArr[0].y) / (pb.x - pointArr[0].x));	//	求绝对值
				  line3 = Math.abs((pointArr[1].y - pointArr[0].y) / (pointArr[1].x - pointArr[0].x));

		if(line3 < line1 && line3 < line2) {
			return true;
		} else {
			return false;
		}
	}

	new Test()._init();
})(document);

	//	获取鼠标位置 -> 鼠标位置是由鼠标事件触发完成的
	function getMouseXY(e) {
		const sLeft = getPageOffset().left,
					sTop = getPageOffset().top,
					cLeft = document.documentElement.clientLeft,
					cTop = document.documentElement.clientTop;

		return {	//clientX 鼠标在可视化区域的位置
			x: sLeft + e.clientX - cLeft,
			y: sTop + e.clientY - cTop
		}
	}

	//	获取页面偏移量
	function getPageOffset() {
		if(window.pageXOffset) {
			return {
				left: window.pageXOffset,
				top: window.pageYOffset
			}
		} else {
			return {
				left: document.documentElement.scrollLeft + document.body.scrollLeft,
				top: document.documentElement.scrollTop + document.body.scrollTop
			}
		}
	}

	//	获取元素距离 html 文档顶部和左侧的距离 -> 利用递归实现
	function getElementToPageTop(el) {
		if(el.tagName !== 'HTML') {
			const parent = el.parentNode;
			return getElementToPageTop(parent) + el.offsetTop;
		}
		//	为最里层的 html 返回值 -> 关键
		return 0;
	}

	function getElementToPageLeft(el) {
		if(el.tagName !== 'HTML') {
			const parent = el.parentNode;
			//	offsetLeft 距离带定位的父级盒子的距离
			return getElementToPageLeft(parent) + el.offsetLeft;
		}
		//	为最里层的 html 返回值 -> 关键
		return 0;
	}

	//	让数组中只保留最新的两个数, 让数组的长度不超过2，多的就删掉
	function formatArray(arr, data) {
		const len = arr.length;

		if(len >= 2) {
			arr.shift();
			formatArray(arr);
		} 

		//	删除之后添加元素
		if(data !== undefined) arr.push(data);  
		return arr;
	}