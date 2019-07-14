import queryString from 'query-string'
import axios from 'axios'

export default {
    getOrder({ commit },payload) {
      return axios.get(`${process.env.API_URL}public-orders?${queryString.stringify(payload)}`)
      .then((response) => {
        commit('SET_DATA_ORDER', response.data.data)
        commit('SET_META', response.data.meta)
      }, (error) => {
          return error.response
      })
    },
    showOrder({ commit },payload) {
      return axios.get(`${process.env.API_URL}public-orders/${payload}`)
      .then((response) => {
        commit('SET_DETAIL', response.data.data)
      }, (error) => {
          return error.response
      })
    },
}
