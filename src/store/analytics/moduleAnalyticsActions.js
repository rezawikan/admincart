import queryString from 'query-string'
import axios from 'axios'

export default {
    analyticsGraphicCount({ commit }, { payload, timeable }) {
      return axios.get(`${process.env.API_URL}analytics/${timeable}?${queryString.stringify(payload)}`)
      .then((response) => {
        return response.data.data
      }, (error) => {
          return error.response
      })
    },
    analyticsGraphicRevenue({ commit }, { payload, timeable }) {
      return axios.get(`${process.env.API_URL}revenue/${timeable}?${queryString.stringify(payload)}`)
      .then((response) => {
        return response.data.data
      }, (error) => {
          return error.response
      })
    },
    analyticsPoductAssets({ commit }) {
      return axios.get(`${process.env.API_URL}assets`)
      .then((response) => {
        console.log(response);
        return response.data
      }, (error) => {
          return error.response
      })
    },
}
