/*=========================================================================================
  File Name: moduleAuth.js
  Description: Auth Module
  ----------------------------------------------------------------------------------------
  Author: Mochammad Rezza Wikandito
  Author URL: https:rezawikan.com
==========================================================================================*/


import state from './moduleAnalyticsState.js'
import mutations from './moduleAnalyticsMutations.js'
import actions from './moduleAnalyticsActions.js'
import getters from './moduleAnalyticsGetters.js'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
