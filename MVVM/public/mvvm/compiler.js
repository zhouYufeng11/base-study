
//	对html 进行解析
export function compiler( vm ) {
	const oElements = Object.values(document.querySelectorAll('*'));

	oElements.forEach(elem => {
		console.log( elem );
	})
}