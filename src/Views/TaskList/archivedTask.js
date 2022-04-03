import { useStore } from 'vuex'

export function archivedTask (taskLists) {
  const store = useStore()

  const archivedOneTask = id => {
    console.log('archived', id)
    let temp = ''
    for (let i = 0; i < taskLists.value.length; i++) {
      if (taskLists.value[i]._id === id) {
        temp = JSON.parse(JSON.stringify(taskLists.value[i]))
        break
      }
    }
    temp.archive.val = true
    store.commit('SetGloaderFlag', true)
    store.dispatch('apiEditTask', {
      listName: store.getters.GetUserName,
      task: temp
    })
      .then(() => {
        store.commit('SetNotification', {
          header: 'Успех',
          body: 'Задача успешно отправлена в архив',
          flag: true,
          status: 'success',
          duration: 5000
        })
        for (let i = 0; i < taskLists.value.length; i++) {
          if (taskLists.value[i]._id === id) {
            taskLists.value[i].archive.val = true
            taskLists.value.splice(i, 1)
            break
          }
        }
      })
      .catch(() => {
        store.commit('SetNotification', {
          header: 'Ошибка',
          body: 'Не удалось отправить задачу в архив. Попробуйте позже',
          flag: true,
          status: 'error',
          duration: 5000
        })
      })
      .finally(() => {
        store.commit('SetGloaderFlag', false)
      })
  }

  const clearArchive = () => {
    store.commit('SetGloaderFlag', true)
    store.dispatch('apiClearArchive', { listName: store.getters.GetUserName })
      .then(response => {
        store.commit('SetNotification', {
          header: 'Успех',
          body: response.message,
          flag: true,
          status: 'success',
          duration: 5000
        })
        taskLists.value = []
      })
      .catch(() => {
        store.commit('SetNotification', {
          header: 'Ошибка',
          body: 'Не удалось очистить архивные задачи. Попробуйте позже',
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
    archivedOneTask,
    clearArchive
  }
}
