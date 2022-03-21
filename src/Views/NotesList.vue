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
import { ref } from 'vue'

export default {
  name: 'notes-list',
  components: {
    OneNote,
    NoteForm
  },
  setup () {
    // WARN: Удалить ниже
    const notes = ref([
      {
        _id: 'asdasdasd',
        color: 'green',
        name: 'name 1',
        body: 'body 1'
      },
      {
        _id: 'asdasdasd1',
        color: 'blue',
        name: 'name 2',
        body: 'body 2'
      },
      {
        _id: 'asdasdasd2',
        color: 'red',
        name: 'name 3',
        body: 'body 3'
      }
    ])

    const NoteForm = ref(null)
    const dataForForm = ref('')
    const CreateNote = () => {
      console.log('Создать заметку')
      dataForForm.value = {
        color: '',
        name: '',
        body: ''
      }
      NoteForm.value.onOpen()
    }
    const SaveNote = (data) => {
      console.log(data)
    }
    const EditNote = (id) => {
      for (let i = 0; i < notes.value.length; i++) {
        if (notes.value[i]._id === id) {
          dataForForm.value = JSON.parse(JSON.stringify(notes.value[i]))
          break
        }
      }
      NoteForm.value.onOpen()
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
