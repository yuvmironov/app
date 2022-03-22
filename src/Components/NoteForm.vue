<template>
  <div class="NoteForm" v-if="flagNoteFormOpen">
    <div class="NoteForm-Content">
      <div class="NoteForm-ColorNote" :style="`background-color: ${dataInForm.color.val}`">
        Цвет заметки
      </div>
      <div class="NoteForm-Inputs">
        <h2 class="NoteForm-Header">Работа с заметкой</h2>
        <yuv-select
          class="NoteForm-Input"
          label="Выберите цвет"
          id="color"
          :options="colors"
          v-model="dataInForm.color.val"
        />
        <yuv-input
          class="NoteForm-Input"
          id="nameNote"
          label="Заголовок"
          v-model="dataInForm.name.val"
        />
        <yuv-input
          class="NoteForm-Input"
          id="bodyNote"
          label="Заметка"
          v-model="dataInForm.body.val"
        />
        <div class="NoteForm-Buttons">
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
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'

let flagAction = ''
export default {
  name: 'note-form',
  props: ['data'],
  setup (props, { emit }) {
    const store = useStore()
    const colors = [
      {
        id: '#ff8080',
        name: 'Красный'
      },
      {
        id: '#f2c94c',
        name: 'Оранжевый'
      },
      {
        id: '#27ae60',
        name: 'Зеленый'
      }
    ]
    const flagNoteFormOpen = ref(false)
    const onOpen = (data) => {
      flagAction = data
      flagNoteFormOpen.value = true
    }
    const onClose = () => {
      flagNoteFormOpen.value = false
      flagAction = ''
    }
    const dataInForm = ref('')
    const save = () => {
      if (dataInForm.value.body.val || dataInForm.value.name.val) {
        emit('SaveData', { data: dataInForm, flagActions: flagAction })
        onClose()
      } else {
        store.commit('SetNotification', {
          header: 'Ошибка',
          body: 'Заполнены не все поля',
          flag: true,
          status: 'error',
          duration: 5000
        })
      }
    }
    const cancel = () => {
      dataInForm.value = ''
      onClose()
    }
    watch(() => props.data, newValue => {
      dataInForm.value = newValue
    })

    return {
      colors,
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
    display flex
    padding 10px
    border-radius 5px
    background-color var(--white-default)
    box-shadow 0 0 4px var(--blak-transparent)
  &-Inputs
    width 400px
  &-ColorNote
    text-align center
    width 40px
    height 220px
    margin-right 10px
    writing-mode vertical-lr
    text-orientation upright
    border 1px solid var(--blak-transparent)
  &-Header
    margin-bottom 10px
  &-Input
    background-color transparent !important
    &:not(:last-child)
      margin-bottom 10px
  &-Buttons
    display flex
    justify-content space-around
</style>
