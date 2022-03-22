import axios from 'axios'

const actions = {
  apiGetNotes: (context, data) => {
    return axios({
      method: 'GET',
      url: '/api/getNotesList',
      params: data
    })
      .then(response => {
        return response.data
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
  }
}

export default {
  actions
}
