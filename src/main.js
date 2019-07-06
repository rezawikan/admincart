/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPlus, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash, faPlus)

Vue.component('font-awesome-icon', FontAwesomeIcon)

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

import VueInstantSearch from 'vue-instantsearch';
Vue.use(VueInstantSearch);

import VueMoment from 'vue-moment';
Vue.use(VueMoment)


import VueMeta from 'vue-meta'
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

// axios
import axios from 'axios'
Vue.prototype.$axios = axios



// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css';


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// Vuesax Admin Filters
import './filters/filters'


// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'


// Feather font icon
require('./assets/css/iconfont.css')


// Vue select css
// Note: In latest version you have to add it separately
import 'vue-select/dist/vue-select.css';


import localforage from 'localforage'

localforage.config({
  driver: localforage.LOCALSTORAGE,
  storeName: 'Vuex'
})

store.dispatch('auth/setToken').then(() => {
  store.dispatch('auth/fetchUser').catch(() => {
    // store.dispatch('notifications/getNotif')
    store.dispatch('auth/clearAuth')
    router.replace({ name: 'login' })
  })
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
