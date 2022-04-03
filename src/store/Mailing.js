import axios from 'axios'

const store = {
  mailingList: []
}

const getters = {
  getMailingList: store => store.mailingList
}

const mutations = {
  setMailingList: (store, data) => {
    store.mailingList = JSON.parse(JSON.stringify(data))
  }
}

const actions = {
  apiGetMailingList: (context, data) => {
    return axios({
      method: 'GET',
      url: '/api/getMailingList',
      params: data
    })
      .then(response => {
        context.commit('setMailingList', response.data.payload)
        return true
      })
  }
}

export default {
  store,
  getters,
  mutations,
  actions
}
