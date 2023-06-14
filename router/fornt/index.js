const express = require('express'),
			app = express();

app.use(express.static('./public'));

app.listen(3000, _ => console.log('http://127.0.0.1:3000/#/index')); // 初始页