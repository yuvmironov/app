import { useStore } from 'vuex'

export function finishedTask (taskLists) {
  const store = useStore()

  const finishedOneTask = id => {
    console.log('finished', id)
    let temp = ''
    for (let i = 0; i < taskLists.value.length; i++) {
      if (taskLists.value[i]._id === id) {
        temp = JSON.parse(JSON.stringify(taskLists.value[i]))
        break
      }
    }
    temp.finish.val = true
    store.commit('SetGloaderFlag', true)
    store.dispatch('apiEditTask', {
      listName: store.getters.GetUserName,
      task: temp
    })
      .then(() => {
        store.commit('SetNotification', {
          header: 'Успех',
          body: 'Задача завершена',
          flag: true,
          status: 'success',
          duration: 5000
        })
        for (let i = 0; i < taskLists.value.length; i++) {
          if (taskLists.value[i]._id === id) {
            taskLists.value[i].finish.val = true
            break
          }
        }
      })
      .catch(() => {
        store.commit('SetNotification', {
          header: 'Ошибка',
          body: 'Не удалось завершить задачу. Попробуйте позже',
          flag: true,
          status: 'error',
          duration: 5000
        })
      })
      .finally(() => {
        store.commit('SetGloaderFlag', false)
      })
  }

  return {
    finishedOneTask
  }
}
