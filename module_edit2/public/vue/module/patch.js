
//	新老节点替换
export function patch(oldNode, vnode) {
	let el = createElement(vnode),	//	虚拟dom
			parentElement = oldNode.parentNode;

	//	将原来的dom 替换掉
	parentElement.insertBefore(el, oldNode.nextSibling);
	parentElement.removeChild(oldNode);
}

//	虚拟节点 -> 真实dom
function createElement(vnode) {
	const { tag, attrs, children, text } = vnode;

	if(typeof tag == 'string') {
		vnode.el = document.createElement(tag);	//	说明是元素节点

		parseProps(vnode);	//	将vnode 传进去

		//	遍历节点的子元素
		children.forEach(child => {
			vnode.el.appendChild(createElement(child));	//	递归
		});
	} else {
		vnode.el = document.createTextNode(text);
	}
	
	return vnode.el;
}


function parseProps(vnode) {
	const el = vnode.el,
				newAttrs = vnode.attrs || {};

	//	对 style 进行循环
	for(var key in newAttrs) {
		if(key == 'style') {	
			for(var skey in newAttrs.style) {
				el.style[skey] = newAttrs.style[skey];
			}
		} else if(key == 'class'){
			el.className = newAttrs[key];
		}
	}
}	