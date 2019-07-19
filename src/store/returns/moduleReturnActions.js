import queryString from 'query-string'
import axios from 'axios'

export default {
    getReturn({ commit },payload) {
      return axios.get(`${process.env.API_URL}returns?${queryString.stringify(payload)}`)
      .then((response) => {
        commit('SET_DATA_RETURN', response.data.data)
        commit('SET_META', response.data.meta)
      }, (error) => {
          return error.response
      })
    },
    createReturn({ dispatch },payload) {
      return axios.post(`${process.env.API_URL}returns`, payload)
      .then((response) => {
        dispatch('getReturn')
        return response
      }, (error) => {
          return error.response
      })
    },
    showReturn({ commit },payload) {
      return axios.get(`${process.env.API_URL}returns/${payload}`)
      .then((response) => {
        console.log(response.data);
        commit('SET_DATA_CURRENT_RETURN', response.data.data)
      }, (error) => {
          return error.response
      })
    },
    updateReturn({ dispatch }, payload) {
      console.log(payload);
      return axios.put(`${process.env.API_URL}returns/${payload.origin}`, payload)
      .then((response) => {
        dispatch('getReturn')
        return response
      }, (error) => {
          return error.response
      })
    },
}
