const path = require('path');

module.exports = {
	mode: 'production',
	entry: './index.js', // Entry point of your application
	target: 'node', // Indicate that the target environment is Node.js
	output: {
		path: path.resolve(__dirname, 'dist'), // Output folder for generated files
		filename: 'bundle.js', // Output file name
	},  
	module: {
		rules: [
			{
				test: /\.js$/, // Apply the transformation to JavaScript files
				exclude: /node_modules/,
				loader: 'babel-loader', // Use Babel to transpile the code
				options: {
					presets: ['@babel/preset-env'] // Babel Configuration
				}       
			}
		]
	}
};