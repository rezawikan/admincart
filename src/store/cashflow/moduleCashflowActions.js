import axios from 'axios'

export default {
    getCashflow({ commit }, payload) {
      return axios.get(`${process.env.API_URL}cashflow`)
      .then((response) => {
        commit('SET_CASHFLOW', response.data.data)
        commit('SET_META_CASHFLOW', response.data.meta)
        return response
      }, (error) => {
          return error.response
      })
    },
    saveCashflow({ dispatch }, payload) {
      return axios.post(`${process.env.API_URL}cashflow`, payload)
      .then((response) => {
        dispatch('getCashflow')
        return response
      }, (error) => {
          return error.response
      })
    },
    // updateProvinces({ dispatch }, payload) {
    //   return axios.put(`${process.env.API_URL}provinces`, payload)
    //   .then((response) => {
    //     dispatch('getProvinces')
    //     return response
    //   }, (error) => {
    //       return error.response
    //   })
    // },
    // deleteProvinces({ dispatch }, provinceID) {
    //   return axios.delete(`${process.env.API_URL}provinces/${provinceID}`,)
    //   .then((response) => {
    //     dispatch('getProvinces')
    //     return response
    //   }, (error) => {
    //       return error.response
    //   })
    // },
    // getCities({ commit }, payload) {
    //   return axios.get(`${process.env.API_URL}cities?${queryString.stringify(payload)}`)
    //   .then((response) => {
    //     commit('SET_CITIES', response.data.data)
    //     commit('SET_META_CITIES', response.data.meta)
    //     return response
    //   }, (error) => {
    //       return error.response
    //   })
    // },
    // saveCity({ dispatch }, payload) {
    //   return axios.post(`${process.env.API_URL}cities`, payload)
    //   .then((response) => {
    //     dispatch('getCities')
    //     return response
    //   }, (error) => {
    //       return error.response
    //   })
    // },
    // getSubdistricts({ commit }, payload) {
    //   return axios.get(`${process.env.API_URL}subdistricts?${queryString.stringify(payload)}`)
    //   .then((response) => {
    //     commit('SET_SUBDISTRICTS', response.data.data)
    //     commit('SET_META_SUBDISTRICTS', response.data.meta)
    //     return response
    //   }, (error) => {
    //       return error.response
    //   })
    // },
    // getSubdistrict({ dispatch }, payload) {
    //   return axios.post(`${process.env.API_URL}subdistricts`, payload)
    //   .then((response) => {
    //     dispatch('getCities')
    //     return response
    //   }, (error) => {
    //       return error.response
    //   })
    // },
}
