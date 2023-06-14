import { reactive } from './reactive.js';
import { compiler } from './compiler.js';

export class Vue {
	constructor( { el, data, template } ) {
		this.$el = document.querySelector( el );
		this.$data = reactive( data() );	//	数据代理
		this.$template = template;

		this.init();
	}	

	init () {

	}

	//	将将template 添加到 app 里面
	mount() {
		this.$el.innerHTML = this.$template;
		setTimeout(() => {
			compiler( this );
		})
	}
}