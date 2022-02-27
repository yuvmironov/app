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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
