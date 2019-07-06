import queryString from 'query-string'
import axios from 'axios'
import _ from 'lodash'

export default {
    getCart({ commit }, payload) {
      return axios.get(`${process.env.API_URL}public-cart?${queryString.stringify(payload)}`)
      .then((response) => {
        commit('SET_PRODUCTS', response.data.data.products)
        commit('SET_COUNT', _.size(response.data.data.products))
        commit('SET_EMPTY', response.data.meta.empty)
        commit('SET_SUBTOTAL', response.data.meta.subtotal)
        commit('SET_TOTAL', response.data.meta.total)
        commit('SET_CHANGED', response.data.meta.changed)
        commit('SET_WEIGHT', response.data.meta.weight)
        return response
      }, (error) => {
        return error.response
      })
    },

    destroy({ dispatch }, {productID, user_id}) {
      return axios.delete(`${process.env.API_URL}public-cart/${productID}?${queryString.stringify({ user_id: user_id })}`)
      .then(() => {
        dispatch('getCart',{ user_id: user_id })
      }, (error) => {
        return error.response
      })
    },

    update({ dispatch }, { productID, quantity, user_id }) {
      return axios.put(`${process.env.API_URL}public-cart/${productID}`, {
        quantity,
        user_id
      }).then(() => {
          dispatch('getCart',{user_id: user_id})
          return quantity
      }, (error) => {
        return error.response
      })
    },

    store({ dispatch }, { products, user_id }) {
      return axios.post(`${process.env.API_URL}public-cart`, {
        products,
        user_id
      }).then((response) => {
          dispatch('getCart',{ user_id: user_id })
          return response
      }, (error) => {
        return error.response
      })
    },

    setShipping({ commit }, shipping) {
      commit('SET_SHIPPING',shipping)
    }
}
