import { Vue } from './mvvm/index.js';

const vm = new Vue({
	el: '#app',
	data() {
		return {
			title: 'hh'
		}
	},
	template: `
		<div class="wrap">
			<div class="show">{{ message }}</div>
			<div class="input-wrap">
				<input 
					type="text"
					class="input" 
					v-model="message"
				/>
			</div>
		</div>
	`
});

vm.mount();