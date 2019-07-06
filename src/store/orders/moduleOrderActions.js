import queryString from 'query-string'
import axios from 'axios'

export default {
    getLiveOrder({ commit },payload) {
      return axios.get(`${process.env.API_URL}public-orders?${queryString.stringify(payload)}`)
      .then((response) => {
        commit('SET_DATA_ORDER', response.data.data)
        commit('SET_META', response.data.meta)
      }, (error) => {
          return error.response
      })
    },
}
