const { resolve } = require('path'),
			{ VueLoaderPlugin } = require('vue-loader'),
			HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	mode: 'development',
	entry: resolve(__dirname, './src/main.js'),
	output: {
		path: resolve(__dirname, './dist'),
		filename: 'main.js'
	},
	devtool: 'source-map',
	externals: {
		'vue': 'Vue',
		'vuex': 'Vuex'
	},
	module: {
		rules: [
			{
				test: /\.vue$/i,
				loader: 'vue-loader'
			},
			{
				test: /\.scss$/i,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: resolve(__dirname, './src/index.html')
		})
	]
};

module.exports = config;