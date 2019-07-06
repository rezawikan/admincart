// import { setHttpToken } from '../../helpers/index'
import { isEmpty } from 'lodash'
import localforage from 'localforage'
import axios from 'axios'

export default {
    async getNotifications({ commit }) {
      let response = await axios.get(`${process.env.API_URL}notifications`)
      commit('SET_NOTIF_DATA', response.data.data)
    },

    // setToken({ commit, dispatch }, token) {
    //   if (isEmpty(token)) {
    //       return dispatch('checkTokenExists').then((token) => {
    //         setHttpToken(token)
    //       })
    //   }
    //   commit('SET_TOKEN', token)
    //   setHttpToken(token)
    // },
    //
    // checkTokenExists({ commit, dispatch }, token) {
    //   return localforage.getItem('authtoken').then((token) => {
    //       if (isEmpty(token)) {
    //           return Promise.reject('NO_STORAGE_TOKEN')
    //       }
    //       return Promise.resolve(token)
    //   })
    // }
}
