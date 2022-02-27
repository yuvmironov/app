const state = {
  NotificationHeader: '',
  NotificationBody: '',
  NotificationFlag: false,
  NotificationStatus: '',
  NotificationDuration: 0
}

const getters = {
  GetNotificationHeader (state) {
    return state.NotificationHeader
  },
  GetNotificationBody (state) {
    return state.NotificationBody
  },
  GetNotificationFlag (state) {
    return state.NotificationFlag
  },
  GetNotificationStatus (state) {
    return state.NotificationStatus
  },
  GetNotificationDuration (state) {
    return state.NotificationDuration
  }
}

const mutations = {
  SetNotification (state, data) {
    state.NotificationHeader = data.header
    state.NotificationBody = data.body
    state.NotificationFlag = data.flag
    state.NotificationStatus = data.status
    state.NotificationDuration = data.duration
  }
}

export default {
  state,
  mutations,
  getters
}
