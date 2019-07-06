import queryString from 'query-string'
import axios from 'axios'

export default {
    getProductVariations({ commit }, payload) {
      return axios.get(`${process.env.API_URL}variations?${queryString.stringify(payload)}`)
      .then((response) => {
        commit('SET_PRODUCT_VARIATIONS', response.data.data)
        commit('SET_META_PRODUCT_VARIATIONS', response.data.meta)
        return response
      }, (error) => {
          return error.response
      })
    },
    getProducts({ commit },payload) {
      return axios.get(`${process.env.API_URL}products?${queryString.stringify(payload)}`)
      .then((response) => {
        commit('SET_PRODUCTS', response.data.data)
        commit('SET_META', response.data.meta)
        return response
      }, (error) => {
          return error.response
      })
    },

    createProduct({ dispatch }, payload) {
      return axios.post(`${process.env.API_URL}products`, payload)
      .then((response) => {
        dispatch('getProducts')
        return response
      }, (error) => {
          return error.response
      })
    },

    saveProduct({ dispatch }, payload) {
      return axios.put(`${process.env.API_URL}products/${payload.origin}`, payload)
      .then((response) => {
        dispatch('getProducts')
        return response
      }, (error) => {
          return error.response
      })
    },

    getProductTypes({ commit }) {
      return axios.get(`${process.env.API_URL}product-type`)
      .then((response) => {
        commit('SET_PRODUCT_TYPE', response.data.data)
      }, (error) => {
          return error.response
      })
    },

    saveProductType({ dispatch }, payload) {
      return axios.post(`${process.env.API_URL}product-type`,payload)
      .then((response) => {
        dispatch('getProductTypes')
        return response.data
      })
    },

    deleteImage({ dispatch }, payload) {
      return axios.delete(`${process.env.API_URL}images/${payload.file.name}`)
      .then((response) => {
        console.log(response);
      })
    }
}
