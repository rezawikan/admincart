import { isEmpty } from 'lodash'
import axios from 'axios'

export const setHttpToken = (token) => {

    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    if (isEmpty) {
        axios.defaults.headers.common['Authorization'] = null
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}
