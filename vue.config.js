/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - Clean Vue.js Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
const Dotenv = require('dotenv-webpack');
const env = process.env.NODE_ENV;

module.exports = {
	// devServer: {
	// 	proxy: {
	// 		'^/v2/': {
	// 			target: 'https://ummuzayn-api.rezawikan.com/api/',
	// 			ws: true,
	// 			changeOrigin: true,
	// 			pathRewrite: {
	// 				'^/v2/': '' // rewrite path
	// 			}
	// 		},
	// 		'^/v1/': {
	// 			target: 'http://cart.test:8080/api/',
	// 			ws: true,
	// 			changeOrigin: true,
	// 			pathRewrite: {
	// 				'^/v1/': '' // rewrite path
	// 			}
	// 		}
	// 	}
	// },
  publicPath: '/',
  configureWebpack: {
   plugins: [
     new Dotenv({
      path: `./.env.${env === "production" ? "production" : "dev"}`,
    })
   ]
 }
}
