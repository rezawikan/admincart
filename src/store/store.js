/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)


import moduleNotifications from './notifications/moduleNotifications.js'
import moduleAnalytics from './analytics/moduleAnalytics.js'
import moduleShipping from './shippings/moduleShipping.js'
import moduleCashflow from './cashflow/moduleCashflow.js'
import moduleShipment from './shipment/moduleShipment.js'
import moduleAddress from './addresses/moduleAddress.js'
import modulePayment from './payments/modulePayment.js'
import moduleProduct from './products/moduleProduct.js'
import moduleReturn from './returns/moduleReturn.js'
import moduleOngkir from './ongkir/moduleOngkir.js'
import moduleStock from './stocks/moduleStock.js'
import moduleOrder from './orders/moduleOrder.js'
import moduleUser from './users/moduleUser.js'
import moduleCart from './cart/moduleCart.js'
import moduleAuth from './auth/moduleAuth.js'

export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules: {
        notifications: moduleNotifications,
        analytics: moduleAnalytics,
        shipment: moduleShipment,
        shippings: moduleShipping,
        cashflow: moduleCashflow,
        addresses: moduleAddress,
        payments: modulePayment,
        products:moduleProduct,
        returns: moduleReturn,
        ongkir: moduleOngkir,
        orders: moduleOrder,
        stocks: moduleStock,
        users: moduleUser,
        cart: moduleCart,
        auth: moduleAuth
    },
    strict: process.env.NODE_ENV !== 'production'
})
