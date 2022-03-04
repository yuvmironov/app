import axios from 'axios'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  registrationUser: (context, data) => {
    return axios({
      method: 'POST',
      url: '/api/registration',
      data: data
    })
      .then(response => {
        return response.data
      })
      .catch((err) => {
        console.log(err.response)
      })
  },
  apiLoginUser: (context, data) => {
    return axios({
      method: 'POST',
      url: '/api/login',
      data: data
    })
      .then(() => {
        return true
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
