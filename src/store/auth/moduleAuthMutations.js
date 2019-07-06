import localforage from 'localforage'
import { isEmpty } from 'lodash'

export default {
  SET_TOKEN(state, token) {
    if (isEmpty(token)) {
        localforage.removeItem('authtoken', token)
        return
    }
    localforage.setItem('authtoken', token)
  },

  SET_AUTHENTICATED(state, trueOrFalse) {
    state.user.authenticated = trueOrFalse
  },

  SET_USER_DATA(state, data) {
    state.user.data = data
  }
}
