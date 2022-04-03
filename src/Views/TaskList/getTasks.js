import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'

export function getTasks () {
  const store = useStore()
  const taskFlag = ref('main')
  const taskLists = ref([])

  const getMainTask = () => {
    taskFlag.value = 'main'
    store.commit('SetGloaderFlag', true)
    store.dispatch('apiGetList', { listName: store.getters.GetUserName })
      .then(response => {
        taskLists.value = JSON.parse(JSON.stringify(response.payload))
      })
      .finally(() => {
        store.commit('SetGloaderFlag', false)
      })
  }

  const getArchivedTask = () => {
    taskFlag.value = 'archive'
    store.commit('SetGloaderFlag', true)
    store.dispatch('apiGetArchiveList', { listName: store.getters.GetUserName })
      .then(response => {
        taskLists.value = JSON.parse(JSON.stringify(response.payload))
      })
      .finally(() => {
        store.commit('SetGloaderFlag', false)
      })
  }

  onMounted(() => {
    getMainTask()
  })

  return {
    taskFlag,
    taskLists,
    getMainTask,
    getArchivedTask
  }
}
