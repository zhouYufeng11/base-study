
import { parseHtmlToAst } from './parseHtmlToAst.js';
import { parseAstToRender } from './parseAstToRender.js';

export function compilerRenderFunction(html) {
	const ast = parseHtmlToAst(html),	//	模板 -> ast
				code = parseAstToRender(ast),	//	ast -> code
				render = new Function(`
					with(this) { return ${ code } }
				`);

	// 将 生成的 render 函数返回出去，共外界使用
	return render;
}