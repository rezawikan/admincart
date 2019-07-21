import queryString from 'query-string'
import axios from 'axios'

export default {
    getProvinces({ commit }, payload) {
      const data = Object.assign({}, payload, { key: `${process.env.API_SHIPMENT_KEY}`})
      return axios.get(`${process.env.API_SHIPMENT_URL}province?${queryString.stringify(data)}`).then((response) => {
        console.log(response.data.rajaongkir.results)
        commit('SET_PROVINCES', response.data.rajaongkir.results)
        return response
      }, (error) => {
          return error.response
      })
    },
    getCities({ commit }, payload) {
      const data = Object.assign({}, payload, { key: `${process.env.API_SHIPMENT_KEY}`})
      return axios.get(`${process.env.API_SHIPMENT_URL}city?${queryString.stringify(data)}`).then((response) => {
        console.log(response.data.rajaongkir.results)
        commit('SET_CITIES', response.data.rajaongkir.results)
        return response
      }, (error) => {
          return error.response
      })
    },
    getSubdistricts({ commit }, payload) {
      const data = Object.assign({}, payload, { key: `${process.env.API_SHIPMENT_KEY}`})
      return axios.get(`${process.env.API_SHIPMENT_URL}subdistrict?${queryString.stringify(data)}`).then((response) => {
        console.log(response.data.rajaongkir.results)
        commit('SET_SUBDISTRICTS', response.data.rajaongkir.results)
        return response
      }, (error) => {
          return error.response
      })
    },
    getCost({ commit }, payload) {
      const data = Object.assign({}, payload, { key: `${process.env.API_SHIPMENT_KEY}`})
      return axios.post(`${process.env.API_SHIPMENT_URL}cost`, data).then((response) => {
        commit('SET_COST', response.data.rajaongkir.results)
        return response
      }, (error) => {
          return error.response
      })
    },
    saveCost({ commit }, {payload, id}) {
      return axios.put(`${process.env.API_URL}shipping-auto/${id}`, payload).then((response) => {
        console.log(response);
        // commit('SET_COST', response.data.rajaongkir.results)
        return response
      }, (error) => {
          return error.response
      })
    },
}
