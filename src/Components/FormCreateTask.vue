<template>
  <div class="FormCreate" v-show="showFlag">
    <div class="FormCreate-Content">
      <h2 class="FormCreate-Header">Новая задача</h2>
      <yuv-input
        label="Название задачи"
        type="text"
        id="nameTask"
        v-model="name"
        err-message="Не может быть пустым"
      />
      <yuv-input
        class="FormEdit-Input"
        id="dateTaskFinished"
        label="Дата окончания"
        type="date"
        v-model="dateFinished"
      />
      <yuv-textarea
        class="FormEdit-Input"
        id="description"
        label="Описание задачи"
        type="text"
        v-model="description"
      />
      <div class="FormCreate-Buttons">
        <yuv-button
          label="Сохранить"
          :fun="saveNewTask"
        />
        <yuv-button
          label="Отмена"
          :fun="cancelCreate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { IsoFormattingDate } from '@/Plugins/DateFormater'

export default {
  name: 'form-create-task',
  setup (props, { emit }) {
    const showFlag = ref(false)

    const name = ref('')
    const dateCreate = ref(IsoFormattingDate(new Date()))
    const description = ref('')
    const dateFinished = ref('')
    const onOpen = () => {
      showFlag.value = true
    }
    const onClose = () => {
      showFlag.value = false
    }

    const saveNewTask = () => {
      emit('newTask', {
        name: name.value,
        description: description.value,
        dateCreate: dateCreate.value,
        dateFinish: dateFinished.value
      })
      name.value = ''
      dateFinished.value = ''
      description.value = ''
      onClose()
    }
    const cancelCreate = () => {
      onClose()
    }
    return {
      showFlag,
      name,
      dateCreate,
      dateFinished,
      description,
      onOpen,
      onClose,
      saveNewTask,
      cancelCreate
    }
  }
}
</script>

<style lang="stylus">
.FormCreate
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  display flex
  align-items center
  justify-content center
  background-color var(--blak-transparent)
  &-Header
    margin-bottom 10px
  &-Content
    width 400px
    box-sizing border-box
    border-radius 10px
    box-shadow 0 0 10px 0 var(--white-darker)
    background-color var(--white-default)
    padding 30px
  &-Input
    &:not(:last-child)
      margin-bottom 10px
  &-Buttons
    display flex
    justify-content space-around
</style>
