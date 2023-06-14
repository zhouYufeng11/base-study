export default function Index(todo) {
	return `
		<div class="index">
			<div class="btn-wrap">
				<input type="text" />
				<button>添加用户</button>
			</div>
			<div class="list-wrap">
				${
					(function() {
						let html = '';
						todo.forEach( item => {
							html += `<div>${ item }</div>`	
						});

						return html;
					})()
				}
			</div>
		</div>
	`;
}