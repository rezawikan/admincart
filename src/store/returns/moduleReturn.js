/*=========================================================================================
  File Name: moduleAuth.js
  Description: Auth Module
  ----------------------------------------------------------------------------------------
  Author: Mochammad Rezza Wikandito
  Author URL: https:rezawikan.com
==========================================================================================*/


import state from './moduleReturnState.js'
import mutations from './moduleReturnMutations.js'
import actions from './moduleReturnActions.js'
import getters from './moduleReturnGetters.js'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
