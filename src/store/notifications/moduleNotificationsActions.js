import axios from 'axios'

export default {
    async getNotifications({ commit }) {
      let response = await axios.get(`${process.env.API_URL}notifications`)
      commit('SET_NOTIF_DATA', response.data.data)
    }
}
