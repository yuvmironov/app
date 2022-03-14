import axios from 'axios'

const state = {
  userName: window.sessionStorage.getItem('userName') || ''
}

const getters = {
  GetUserName: state => state.userName
}

const mutations = {
  SetUserName: (state, data) => {
    state.userName = data
  }
}

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
      .then(response => {
        console.log(response)
        window.sessionStorage.setItem('userName', response.data.user)
        window.sessionStorage.setItem('email', response.data.email)
        return response
      })
  },
  apiLogOutUser: (context, data) => {
    return axios({
      method: 'POST',
      url: '/api/logOut',
      data: data
    })
      .then(response => {
        return response.data
      })
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
