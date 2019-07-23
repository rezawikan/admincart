import queryString from 'query-string'
import axios from 'axios'

export default {
    getProvinces({ commit }, payload) {
      return axios.get(`${process.env.API_URL}shipment/provinces?${queryString.stringify(payload)}`).then((response) => {
        commit('SET_PROVINCES', response.data.data.rajaongkir.results)
        return response
      }, (error) => {
          return error.response
      })
    },
    getCities({ commit }, payload) {
      return axios.get(`${process.env.API_URL}shipment/cities?${queryString.stringify(payload)}`).then((response) => {
        commit('SET_CITIES', response.data.data.rajaongkir.results)
        return response
      }, (error) => {
          return error.response
      })
    },
    getSubdistricts({ commit }, payload) {
      return axios.get(`${process.env.API_URL}shipment/subdistricts?${queryString.stringify(payload)}`).then((response) => {
        commit('SET_SUBDISTRICTS', response.data.data.rajaongkir.results)
        return response
      }, (error) => {
          return error.response
      })
    },
    getCost({ commit }, payload) {
      return axios.get(`${process.env.API_URL}shipment/cost?${queryString.stringify(payload)}`).then((response) => {
        commit('SET_COST', response.data.data.rajaongkir.results)
        return response
      }, (error) => {
          return error.response
      })
    },
    saveCost({ commit }, {payload, id}) {
      return axios.put(`${process.env.API_URL}shipping-auto/${id}`, payload).then((response) => {
        return response
      }, (error) => {
          return error.response
      })
    },
}
