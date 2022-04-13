<template>
  <div class="FormEdit" v-if="show">
    <div class="FormEdit-Content">
      <h2 class="FormEdit-Header">Редактирование задачи</h2>
      <yuv-input
        class="FormEdit-Input"
        id="nameTask"
        label="Имя задачи"
        v-model="dataForForm.nameTask.val"
      />
      <yuv-input
        class="FormEdit-Input"
        id="dateFinish"
        type="date"
        label="Дата окончания"
        v-model="dataForForm.dateFinish.val"
      />
      <yuv-input
        class="FormEdit-Input"
        id="description"
        label="Описание"
        v-model="dataForForm.description.val"
      />
      <div class="FormEdit-Buttons">
        <yuv-button
          label="Сохранить"
          :fun="save"
        />
        <yuv-button
          label="Отменить"
          :fun="cansel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { InputDate } from '@/Plugins/DateFormater'

export default {
  name: 'form-edit',
  props: ['dataInForm'],
  setup (props, { emit }) {
    const show = ref(false)
    const onOpen = () => {
      show.value = true
    }
    const onClose = () => {
      show.value = false
    }

    const dataForForm = ref({
      nameTask: {
        val: ''
      },
      dateFinish: {
        val: ''
      },
      description: {
        val: ''
      }
    })
    watch(() => props.dataInForm, newValue => {
      newValue.dateFinish.val = InputDate(newValue.dateFinish.val)
      dataForForm.value = newValue
    })

    const save = () => {
      emit('saveEditData', JSON.parse(JSON.stringify(dataForForm.value)))
    }

    const cansel = () => {
      onClose()
    }

    return {
      dataForForm,
      show,
      onOpen,
      onClose,
      save,
      cansel
    }
  }
}
</script>

<style lang="stylus">
.FormEdit
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
