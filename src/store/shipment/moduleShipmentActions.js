import queryString from 'query-string'
import axios from 'axios'

export default {
    getProvinces({ commit }, payload) {
      return axios.get(`${process.env.API_URL}provinces?${queryString.stringfy(payload)}`)
      .then((response) => {
        commit('SET_PROVINCES', response.data.data)
        commit('SET_META_PROVINCES', response.data.meta)
        return response
      }, (error) => {
          return error.response
      })
    },
    saveProvinces({ dispatch }, payload) {
      return axios.post(`${process.env.API_URL}provinces`, payload)
      .then((response) => {
        dispatch('getProvinces')
        return response
      }, (error) => {
          return error.response
      })
    },
    updateProvinces({ dispatch }, payload) {
      return axios.put(`${process.env.API_URL}provinces`, payload)
      .then((response) => {
        dispatch('getProvinces')
        return response
      }, (error) => {
          return error.response
      })
    }.
    deleteProvinces({ dispatch }, provinceID) {
      return axios.delete(`${process.env.API_URL}provinces/${provinceID}`,)
      .then((response) => {
        dispatch('getProvinces')
        return response
      }, (error) => {
          return error.response
      })
    }
}
