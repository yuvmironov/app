import axios from 'axios'

const state = {
  userName: window.sessionStorage.getItem('userName') || '',
  userEmail: window.sessionStorage.getItem('email') || ''
}

const getters = {
  GetUserName: state => state.userName,
  GetUserMail: state => state.userEmail
}

const mutations = {
  SetUserName: (state, data) => {
    state.userName = data
  },
  SetUserMail: (state, data) => {
    state.userEmail = data
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
        throw new Error(err.response.data.message)
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
