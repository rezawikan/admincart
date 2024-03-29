import { setHttpToken } from '../../service/token.services'
import { isEmpty } from 'lodash'
import localforage from 'localforage'
import axios from 'axios'

export default {
    register({ dispatch }, { payload, context }) {
      return axios.get(`${process.env.API_URL}auth/register`, payload)
      .then((response) => {
          context.errors = []
          context.notify = response.data.notify
      }, (error) => {
          context.errors = error.response.data.errors
      })
    },

    login({ dispatch }, payload) {
        return axios.post(`${process.env.API_URL}auth/login`, payload)
        .then((response) => {
            dispatch('setToken', response.data.meta.token).then(() => {
                dispatch('fetchUser')
            })
        }, (error) => {
            console.log(navigator.connection);
            return error.response.data
        })
    },

    fetchUser({ commit, dispatch }){
      return axios.get(`${process.env.API_URL}auth/me`).then((response) => {
        commit('SET_AUTHENTICATED', true)
        commit('SET_USER_DATA', response.data)
        commit('UPDATE_USER_ROLE', response.data.data.scope, { root: true })
      })
    },

    setToken({ commit, dispatch }, token) {
      if (isEmpty(token)) {
          return dispatch('checkTokenExists').then((token) => {
            setHttpToken(token)
          })
      }
      commit('SET_TOKEN', token)
      setHttpToken(token)
    },

    checkTokenExists() {
      return localforage.getItem('authtoken').then((token) => {
          if (isEmpty(token)) {
              return Promise.reject('NO_STORAGE_TOKEN')
          }
          return Promise.resolve(token)
      })
    },

    logout({ dispatch }) {
        return axios.post(`${process.env.API_URL}api/logout`).then(() => {
            dispatch('clearAuth')
        })
    },

    clearAuth({ commit }) {
        commit('SET_AUTHENTICATED', false)
        commit('SET_USER_DATA', null)
        commit('SET_TOKEN', null)
    }
}
