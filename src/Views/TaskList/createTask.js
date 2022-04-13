import { ref } from 'vue'
import { useStore } from 'vuex'

export function createTask (taskLists) {
  const store = useStore()
  const createTaskForm = ref(null)

  const newTask = () => {
    createTaskForm.value.onOpen()
  }

  const newTaskSave = (data) => {
    const task = {
      nameTask: {
        type: 'text',
        val: data.name
      },
      dateCreate: {
        type: 'date',
        val: new Date(data.dateCreate)
      },
      dateFinish: {
        type: 'date',
        val: new Date(data.dateFinish)
      },
      finish: {
        type: 'checkbox',
        val: false
      },
      archive: {
        type: 'checkbox',
        val: false
      },
      description: {
        type: 'textarea',
        val: data.description
      },
      status: {
        type: 'select',
        val: 'appointed'
      }
    }
    const sendingData = {
      listName: store.getters.GetUserName,
      task: task
    }
    store.commit('SetGloaderFlag', true)
    store.dispatch('apiAddTask', sendingData)
      .then(response => {
        taskLists.value.push(response)
      })
      .finally(() => {
        store.commit('SetGloaderFlag', false)
      })
  }

  return {
    createTaskForm,
    newTask,
    newTaskSave
  }
}
