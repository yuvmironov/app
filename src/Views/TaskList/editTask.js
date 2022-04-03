import { ref } from 'vue'
import { useStore } from 'vuex'

export function editTask (taskLists) {
  const store = useStore()

  const editTaskForm = ref(null)
  const editData = ref('')

  const editOneTask = (id) => {
    console.log('edit', id)
    for (let i = 0; i < taskLists.value.length; i++) {
      if (taskLists.value[i]._id === id) {
        editData.value = JSON.parse(JSON.stringify(taskLists.value[i]))
        break
      }
    }
    editTaskForm.value.onOpen()
  }

  const saveAfterEdit = data => {
    data.dateCreate.val = new Date(data.dateCreate.val)
    data.dateFinish.val = new Date(data.dateFinish.val)
    store.commit('SetGloaderFlag', true)
    store.dispatch('apiEditTask', {
      listName: store.getters.GetUserName,
      task: data
    })
      .then(response => {
        store.commit('SetNotification', {
          header: 'Успех',
          body: response.payload,
          flag: true,
          status: 'success',
          duration: 5000
        })
        for (let i = 0; i < taskLists.value.length; i++) {
          if (taskLists.value[i]._id === data._id) {
            taskLists.value[i] = data
          }
        }
        editTaskForm.value.onClose()
      })
      .catch(() => {
        store.commit('SetNotification', {
          header: 'Ошибка',
          body: 'Не удалось обновить задачу. Попробуйте позже',
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
    editTaskForm,
    editData,
    editOneTask,
    saveAfterEdit
  }
}
