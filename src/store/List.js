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
  }
}

export default {
  actions
}
