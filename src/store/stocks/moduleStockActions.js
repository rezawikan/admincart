import queryString from 'query-string'
import axios from 'axios'

export default {
    getLiveStock({ commit },payload) {
      return axios.get(`${process.env.API_URL}livestock?${queryString.stringify(payload)}`)
      .then((response) => {
        commit('SET_DATA_STOCK', response.data.data)
        commit('SET_META', response.data.meta)
      }, (error) => {
          return error.response
      })
    },
}
