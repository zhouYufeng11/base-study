

//	id="app"  id='app' id=app
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
//	标签名  <my-header></my-header>
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
//	<my:header></my:header>
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
//	<div
const startTagOpen = new RegExp(`^<${qnameCapture}`);
//	>  />
const startTagClose = /^\s*(\/?)>/;
//	</div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

//	利用上面的正则
export function parseHtmlToAst(html) {
	html = html.trim();

	let text,
			root,
			currentParent,
			stack = [];

	//	循环处理 htmls
	while(html) {
		//	找 标签
		const textEnd = html.indexOf('<');

		if(textEnd == 0) {	//	找到了元素标签
			const startTagMatch = parseStartTag();
			if(startTagMatch) {
				start(startTagMatch.tag, startTagMatch.attrs);
				continue;
			}

			//	判断匹配的的是不是结束标签
			const endTagMatch = html.match(endTag);

			if(endTagMatch) {
				end();
				advance(endTagMatch[0].length);
				continue;
			}
		} 

		//	说明匹配到了文本
		if(textEnd > 0) {	
			text = html.slice(0, textEnd).trim();

			if(text) {
				chars(text);
			}
			advance(textEnd);
		}
	}


	//	生成 ast
	function vnode(tagName, attrs) {
		return {
			type: 1,	// 用来区分是元素节点还是文本节点
			tag: tagName,
			attrs,
			children: []
		}
	}

	function start(tagName, attrs) {
		const element = vnode(tagName, attrs);

		if(!root) {
			root = element;
		}

		currentParent = element;
		//	让元素入栈，便于后期区分元素之间的 父子级 关系
		stack.push(element);
	}

	//	元素出站 判断元素父子级关系
	function end() {
		const element = stack.pop();
		currentParent = stack[stack.length - 1];
		
		if(currentParent) {
			currentParent.children.push(element);
		}
	}

	function chars(text) {
		currentParent.children.push({
			type: 3,
			text
		});
	}


	//	处理开始标签
	function parseStartTag() {
		//	标记
		let end,
				attr;

		// 判断是不是开始标签
		const start = html.match(startTagOpen);

		if(start) {	//	说明是开始标签
			var match = {
				tag: start[1],
				attrs: []
			};

			advance(start[0].length);

			//	判断有没有属性，并将属性 添加进 match.attrs
			while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
				//	说明有属性
				match.attrs.push({
					name: attr[1],
					value: attr[3] || attr[4] || attr[5]
				});
				advance(attr[0].length);
			}

			if(end) {	// 说明开始标签此时已经处理完了
				advance(end[0].length);
				return match;
			}
		}
	}

	function advance(n) {
		html = html.substring(n);
	}


	return root;
}