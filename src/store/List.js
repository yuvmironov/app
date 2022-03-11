import axios from 'axios'

const actions = {
  apiGetList: (context, data) => {
    console.log(data)
    return axios({
      method: 'GET',
      url: '/api/getTodoList',
      params: data
    })
      .then(response => {
        return response.data
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
