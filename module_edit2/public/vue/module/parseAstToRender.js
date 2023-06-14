
//	匹配模板字符串
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

//	拼接 render 函数
export function parseAstToRender(el) {
	const node = `_c(
		'${ el.tag }',
		${ el.attrs.length > 0 ? `${ formatProps(el.attrs) }` : 'undefined' },
		${ parseChildren(el) }
	)`;

	return node;
}


//	处理 attrs
function formatProps(attrs) {
	let html = '';
	//	对 attrs 进行遍历
	attrs.forEach(attr => {
		const { name, value } = attr;
		//	style 需要进行特殊的处理
		if( name == 'style' ) {	
			html += `style: ${
				JSON.stringify(
					value.split(';').reduce((result, item) => {
						const [ key, value ] = item.split(':');

						result[key.trim()] = value;

						return result;
					}, {})
				)
			},`
		} else {
			html += `${ name }: ${ JSON.stringify(value) },`;
		}
	});
	//	将拼接好的字符串返回出去
	return `{ ${html.slice(0, -1)} }`;	
}

function parseChildren(el) {
	const children = el.children;

	//	判断 el 是否存在
	if(children.length > 0) {
		return generateChild(children).join(', ');	//	字符串拼接
	} else {
		return '';
	}
}

function generateChild(children) {
	//	在判断是文本节点还是元素节点
	return children.map(child => {
			if( child.type == 1 ) {	//	元素节点
				return parseAstToRender(child);
			} else if( child.type == 3 ) {	//	文本节点
				const { text } = child;

				if(!defaultTagRE.test(text)) {	//	判断字符串中有没有模板字符串
					return `_v(${ text })`;
				} else {	//	说明有需要进行处理的模板字符串
					const textArr = [];	//	用来收集, 后期拼接
					let lastIndex = defaultTagRE.lastIndex = 0,
							index,
							match;

					while(match = defaultTagRE.exec(text)) {
						index = match.index;

						if(index > lastIndex) {	// 说明模板字符串的前面有文本
							textArr.push(JSON.stringify(text.slice(lastIndex, index)));
						}

						textArr.push(`_s(${ match[1].trim() })`);
						//	让 lastIndex 向后移动，接着向后匹配
						lastIndex = index + match[0].length;

						//	说明匹配到了结尾部分
						if(index < text.length) {
							textArr.push(JSON.stringify(text.slice(lastIndex, text.length)));
						}
					}

					//	字符串拼接的样子
					return `_v(${textArr.join(' + ')})`;
				}
			}
		});
}