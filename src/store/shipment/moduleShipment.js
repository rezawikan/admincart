/*=========================================================================================
  File Name: moduleAuth.js
  Description: Auth Module
  ----------------------------------------------------------------------------------------
  Author: Mochammad Rezza Wikandito
  Author URL: https:rezawikan.com
==========================================================================================*/


import state from './moduleShipmentState.js'
import mutations from './moduleShipmentMutations.js'
import actions from './moduleShipmentActions.js'
import getters from './moduleShipmentGetters.js'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
