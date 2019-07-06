import queryString from 'query-string'
import axios from 'axios'

export default {
    getAllUsers({ commit }, payload) {
      return axios.get(`${process.env.API_URL}users?${queryString.stringify(payload)}`)
      .then((response) => {
        commit('SET_DATA_USERS', response.data.data)
        commit('SET_DATA_META', response.data.meta)
        return response.data
      }, (error) => {
          return error.response
      })
    },

    setDataCustomer({ commit }, payload) {
      commit('SET_DATA_CUSTOMER', payload)
    },

    createUser({ dispatch }, payload) {
      return axios.post(`${process.env.API_URL}users`,payload)
      .then((response) => {
        dispatch('getAllUsers')
        return response.data
      }, (error) => {
          return error.response
      })
    },
}
