import axios from 'axios'

const actions = {
  apiSendOneMail: (context, data) => {
    return axios({
      method: 'POST',
      url: '/api/sendMessage',
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
