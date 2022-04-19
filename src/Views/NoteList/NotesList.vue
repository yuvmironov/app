<template>
  <div class="NotesList">
    <h1>Заметки</h1>
    <div class="NotesList-Buttons">
      <yuv-button
        label="Создать заметку"
        left-icon="plus"
        type="text"
        :fun="CreateNote"
      />
    </div>
    <div class="NotesList-Notes" v-if="notes.length">
      <one-note
        v-for="note in notes" :key="note._id"
        :note="note"
        @EditNote = "EditNote"
        @DelNote = "DelNote"
      />
    </div>
    <div class="NotesList-Notes" v-else>
      У вас нет заметок. Нажмите "Создать заметку" что бы добавить новую заметку
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
import { getNotes } from './getNotes'
import { CreateAndEdit } from './CreateAndEdit'
import { DeleteNote } from './DeleteNote'

export default {
  name: 'notes-list',
  components: {
    OneNote,
    NoteForm
  },
  setup () {
    const NoteForm = ref(null)

    const { notes } = getNotes()
    const { SaveNote, EditNote, dataForForm, CreateNote } = CreateAndEdit(notes, NoteForm)
    const { DelNote } = DeleteNote(notes)

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
  height 100%
  padding 20px
  &-Notes
    display flex
    flex-wrap wrap
  &-Buttons
    margin-bottom 10px
</style>
