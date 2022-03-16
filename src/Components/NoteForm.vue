<template>
  <div class="NoteForm" v-if="flagNoteFormOpen">
    <div class="NoteForm-Content">
      <yuv-input
        id="nameNote"
        label="Заголовок"
        v-model="dataInForm.name"
      />
      <yuv-input
        id="bodyNote"
        label="Заметка"
        v-model="dataInForm.body"
      />
      <yuv-button
        name="Сохранить"
        :fun="save"
      />
      <yuv-button
        name="Отмена"
        :fun="cancel"
      />
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'note-form',
  props: ['data'],
  setup (props, { emit }) {
    const flagNoteFormOpen = ref(false)
    const onOpen = () => {
      flagNoteFormOpen.value = true
    }
    const onClose = () => {
      flagNoteFormOpen.value = false
    }

    const dataInForm = ref('')
    const save = () => {
      emit('SaveData', dataInForm)
      onClose()
    }
    const cancel = () => {
      dataInForm.value = ''
      onClose()
    }
    watch(() => props.data, newValue => {
      console.log(newValue)
      dataInForm.value = newValue
    })

    return {
      flagNoteFormOpen,
      onOpen,
      onClose,
      dataInForm,
      save,
      cancel
    }
  }
}
</script>

<style lang="stylus">
.NoteForm
  position fixed
  z-index 9000
  top 0
  bottom 0
  left 0
  right 0
  background-color var(--blak-transparent)
  display flex
  justify-content center
  align-items center
  &-Content
    padding 10px
    border-radius 5px
    background-color var(--white-default)
    box-shadow 0 0 4px var(--blak-transparent)
</style>
