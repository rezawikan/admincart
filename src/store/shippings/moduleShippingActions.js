import queryString from 'query-string'
import axios from 'axios'

export default {
    getShippingMethodsForAddress({ commit },addressId) {
      return axios.get(`${process.env.API_URL}addresses/${addressId}/shipping`)
      .then((response) => {
        commit('SET_SHIPPING_METHODS', response.data.data)
        return response
      }, (error) => {
          return error.response
      })
    },
    getShippingCourier({ commit },payload) {
      return axios.get(`${process.env.API_URL}shipping-courier?${queryString.stringify(payload)}`)
      .then((response) => {
        commit('SET_SHIPPINGS', response.data.data)
        commit('SET_META', response.data.meta)
        return response
      }, (error) => {
          return error.response
      })
    },
    createShippingCourier({ dispatch }, payload) {
      return axios.post(`${process.env.API_URL}shipping-courier`, payload)
      .then(() => {
        dispatch('getShippingCourier')
      }, (error) => {
          return error.response
      })
    },
}
