/*=========================================================================================
  File Name: moduleAuth.js
  Description: Auth Module
  ----------------------------------------------------------------------------------------
  Author: Mochammad Rezza Wikandito
  Author URL: https:rezawikan.com
==========================================================================================*/


import state from './moduleOrderState.js'
import mutations from './moduleOrderMutations.js'
import actions from './moduleOrderActions.js'
import getters from './moduleOrderGetters.js'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
