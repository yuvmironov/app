import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'

export function taskTehnical () {
  const store = useStore()
  const taskPriority = ref([])

  const getTaskPriority = () => {
    store.dispatch('apiGetTaskPriority')
      .then(res => {
        taskPriority.value = res
      })
  }

  onMounted(() => {
    getTaskPriority()
  })

  return {
    taskPriority,
    getTaskPriority
  }
}
