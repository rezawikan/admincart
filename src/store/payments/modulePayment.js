/*=========================================================================================
  File Name: moduleAuth.js
  Description: Auth Module
  ----------------------------------------------------------------------------------------
  Author: Mochammad Rezza Wikandito
  Author URL: https:rezawikan.com
==========================================================================================*/


import state from './modulePaymentState.js'
import mutations from './modulePaymentMutations.js'
import actions from './modulePaymentActions.js'
import getters from './modulePaymentGetters.js'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
