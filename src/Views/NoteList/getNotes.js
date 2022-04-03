import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export function getNotes () {
  const store = useStore()

  const notes = ref('')

  onMounted(() => {
    store.commit('SetGloaderFlag', true)
    store.dispatch('apiGetNotes', { listName: store.getters.GetUserName })
      .then(response => {
        notes.value = response.payload
      })
      .finally(() => {
        store.commit('SetGloaderFlag', false)
      })
  })

  return {
    notes
  }
}
