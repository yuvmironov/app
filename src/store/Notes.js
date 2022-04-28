import axios from 'axios'
const state = {
  noteList: {},
  noteColors: {}
}

const getters = {
  getNoteList: state => state.noteList,
  getNoteColors: state => state.noteColors
}

const mutations = {
  setNoteList: (state, data) => {
    state.noteList = data
  },
  setNoteColors: (state, data) => {
    state.noteColors = data
  }
}

const actions = {
  apiGetNotes: (context, data) => {
    return axios({
      method: 'GET',
      url: '/api/getNotesList',
      params: data
    })
      .then(response => {
        context.commit('setNoteList', response.data.payload)
        return true
      })
  },
  apiGetNoteColors: context => {
    return axios({
      method: 'GET',
      url: '/api/getNoteColors'
    })
      .then(response => {
        context.commit('setNoteColors', response.data.payload)
        return true
      })
  },
  apiEditNote: (context, data) => {
    console.log(data)
    return axios({
      method: 'POST',
      url: '/api/editNote',
      data: data
    })
      .then(response => {
        return response.data
      })
  },
  apiNewNote: (context, data) => {
    console.log('Создание')
    return axios({
      method: 'POST',
      url: '/api/createNote',
      data: data
    })
      .then(response => {
        return response.data
      })
  },
  apiDeleteNote: (context, data) => {
    console.log('Удаление заметки')
    return axios({
      method: 'DELETE',
      url: '/api/deleteNote',
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
