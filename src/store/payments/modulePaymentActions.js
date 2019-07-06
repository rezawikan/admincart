import axios from 'axios'

export default {
    getPaymentMethods({ commit }) {
      return axios.get(`${process.env.API_URL}payment-methods`)
      .then((response) => {
        commit('SET_PAYMENT_METHODS', response.data.data)
        return response
      }, (error) => {
          return error.response
      })
    },
}
