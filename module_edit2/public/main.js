import Vue from './vue/index.js';

const vm = new Vue({
	el: '#app',
	template: `
		<div class="wrap active" style="color: yellowgreen; font-size: 20px">
			我叫 {{ name }}, 我是大傻逼。
			<div class="title">
				<p>{{ title }}</p>
			</div>
		</div>
	`
})
