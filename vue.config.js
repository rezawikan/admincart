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
  publicPath: '/',
  configureWebpack: {
   plugins: [
     new Dotenv({
      path: `./.env.${env === "production" ? "production" : "dev"}`,
    })
   ]
 }
}
