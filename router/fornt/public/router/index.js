import Router from '../libs/router.js';

import {
	IndexView,
	DetailView
} from '../control/index.js';

const routers = [
	{
		path: '/index',
		view: IndexView,
		script: ''
	},
	{
		path: '/detail',
		view: DetailView,
		script: ''
	}
];

export default Router(routers);