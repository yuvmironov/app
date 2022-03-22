<template>
  <div class="NotesList">
    <h1>Заметки</h1>
    <div class="NotesList-Buttons">
      <yuv-button
        name="Создать заметку"
        left-icon="plus"
        :fun="CreateNote"
      />
    </div>
    <div class="NotesList-Notes">
      <one-note
        v-for="note in notes" :key="note._id"
        :note="note"
        @EditNote = "EditNote"
        @DelNote = "DelNote"
      />
    </div>
  </div>
  <note-form
    ref="NoteForm"
    :data="dataForForm"
    @SaveData = "SaveNote"
  />
</template>

<script>
import OneNote from '@/Components/OneNote'
import NoteForm from '@/Components/NoteForm'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'notes-list',
  components: {
    OneNote,
    NoteForm
  },
  setup () {
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

    const NoteForm = ref(null)
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

    const DelNote = (id) => {
      console.log('Удаление', id)
    }

    return {
      CreateNote,
      notes,
      NoteForm,
      dataForForm,
      SaveNote,
      EditNote,
      DelNote
    }
  }
}
</script>

<style lang="stylus">
.NotesList
  height 100vh
  padding 20px
  &-Notes
    display flex
  &-Buttons
    margin-bottom 10px
</style>
