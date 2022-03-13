import axios from 'axios'

const actions = {
  apiGetList: (context, data) => {
    return axios({
      method: 'GET',
      url: '/api/getTodoList',
      params: data
    })
      .then(response => {
        return response.data
      })
  },
  apiGetArchiveList: (context, data) => {
    return axios({
      method: 'GET',
      url: '/api/getArchiveTodoList',
      params: data
    })
      .then(response => {
        return response.data
      })
  },
  apiAddTask: (context, data) => {
    return axios({
      method: 'POST',
      url: '/api/createTask',
      data: data
    })
      .then(response => {
        return response.data.payload[0]
      })
  },
  apiEditTask: (context, data) => {
    console.log(data)
    return axios({
      method: 'POST',
      url: '/api/editTask',
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
