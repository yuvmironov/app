import { useStore } from 'vuex'
import { ref } from 'vue'

export function CreateAndEdit (notes, NoteForm) {
  const store = useStore()
  const dataForForm = ref('')

  const CreateNote = () => {
    console.log('Создать заметку')
    dataForForm.value = {
      color: {
        type: 'String',
        val: ''
      },
      name: {
        type: 'String',
        val: ''
      },
      body: {
        type: 'String',
        val: ''
      }
    }
    NoteForm.value.onOpen('create')
  }

  const saveAfterEdit = (data) => {
    store.commit('SetGloaderFlag', true)
    store.dispatch('apiEditNote', { listName: store.getters.GetUserName, note: data.value })
      .then(response => {
        store.commit('SetNotification', {
          header: 'Успех',
          body: response.payload,
          flag: true,
          status: 'success',
          duration: 5000
        })
        for (let i = 0; i < notes.value.length; i++) {
          if (notes.value[i]._id === data.value._id) {
            notes.value[i] = data.value
            break
          }
        }
      })
      .finally(() => {
        store.commit('SetGloaderFlag', false)
      })
  }
  const saveAfterCreate = (data) => {
    store.commit('SetGloaderFlag', true)
    store.dispatch('apiNewNote', { listName: store.getters.GetUserName, note: data.value })
      .then(response => {
        notes.value.push(response.payload[0])
      })
      .finally(() => {
        store.commit('SetGloaderFlag', false)
      })
  }

  const SaveNote = (data) => {
    if (data.flagActions === 'edit') {
      saveAfterEdit(data.data)
    } else if (data.flagActions === 'create') {
      saveAfterCreate(data.data)
    }
  }
  const EditNote = (id) => {
    for (let i = 0; i < notes.value.length; i++) {
      if (notes.value[i]._id === id) {
        dataForForm.value = JSON.parse(JSON.stringify(notes.value[i]))
        break
      }
    }
    NoteForm.value.onOpen('edit')
  }

  return {
    dataForForm,
    CreateNote,
    SaveNote,
    EditNote
  }
}
