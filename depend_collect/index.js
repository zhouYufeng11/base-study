const express = require('express'),
			app = express(),
			{ static } = express;

app.use(static('./public'));

app.listen(3000, _ => console.log('http://127.0.0.1:3000/index.html'));