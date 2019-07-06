import queryString from 'query-string'
import axios from 'axios'

export default {
    publicAddresses({ commit },payload) {
      return axios.get(`${process.env.API_URL}public-addresses?${queryString.stringify(payload)}`)
      .then((response) => {
        commit('SET_DATA_PUBLIC_ADDRESSES', response.data.data)
      }, (error) => {
          return error.response
      })
    },

    createPublicAddresses({ dispatch },payload) {
      return axios.post(`${process.env.API_URL}public-addresses`,payload)
      .then((response) => {
        dispatch('publicAddresses', payload)
        return response
      }, (error) => {
          return error.response
      })
    },

    getProvinces({ commit }) {
      return axios.get(`${process.env.API_URL}provinces`)
      .then((response) => {
        commit('SET_DATA_PROVINCES', response.data.data)
      }, (error) => {
          return error.response
      })
    },

    getCities({ commit },payload) {
      return axios.get(`${process.env.API_URL}cities?${queryString.stringify(payload)}`)
      .then((response) => {
        commit('SET_DATA_CITIES', response.data.data)
      }, (error) => {
          return error.response
      })
    },

    getSubdistricts({ commit },payload) {
      return axios.get(`${process.env.API_URL}subdistricts?${queryString.stringify(payload)}`)
      .then((response) => {
        commit('SET_DATA_SUBDISTRICT', response.data.data)
      }, (error) => {
          return error.response
      })
    }
}
