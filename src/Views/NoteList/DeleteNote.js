import { useStore } from 'vuex'

export function DeleteNote (notes) {
  const store = useStore()

  const DelNote = (id) => {
    store.commit('SetGloaderFlag', true)
    store.dispatch('apiDeleteNote',
      {
        listName: store.getters.GetUserName,
        noteId: id
      })
      .then(response => {
        console.log(response)
        store.commit('SetNotification', {
          header: 'Успех',
          body: response.payload,
          flag: true,
          status: 'success',
          duration: 5000
        })
        for (let i = 0; i < notes.value.length; i++) {
          if (notes.value[i]._id === id) {
            notes.value.splice(i, 1)
            break
          }
        }
      })
      .finally(() => {
        store.commit('SetGloaderFlag', false)
      })
  }

  return {
    DelNote
  }
}
