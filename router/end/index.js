const express = require('express'),
			app = express();

//	设置跨域请求
app.all('*', (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST');

	next();
})

//	处理 post 请求 的 url
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

console.log(`${ [1, 2, 3].map(item => item) }`)

//	路由
app.post('/post', (req, res) => {
	console.log(req.body);

	res.send('ok');
})

app.listen(3001, _ => console.log('server is open'))