<template>
  <div class="OneTask" :class="`OneTask__${status}`" v-if="!task.archive.val">
    <div class="OneTask-ActionsButtons">
      <p class="OneTask-Finished" v-if="task.finish.val">
        Завершена
      </p>
      <p v-else>
        Активная
      </p>
      <div>
        <span v-if="!task.finish.val" class="OneTask-ActionButton icon icon-edit" @click="editTask(task._id)"/>
        <span v-if="!task.archive.val && task.finish.val" class="OneTask-ActionButton icon icon-inbox" @click="archivedTask(task._id)"/>
        <span v-if="!task.finish.val" class="OneTask-ActionButton icon icon-check" @click="finishedTask(task._id)"/>
      </div>
    </div>
    <p class="OneTask-Name">
      <span class="OneTask-NameHead">Название: </span>
      <span class="OneTask-NameValue">{{ task.nameTask.val }}</span>
    </p>
    <p class="OneTask-Description">
      <span class="OneTask-NameHead">Описание: </span>
      <span class="OneTask-NameValue">{{ task.description.val }}</span>
    </p>
    <p class="OneTask-DateCreate">
      <span class="OneTask-NameHead">Дата создания: </span>
      {{ FormattingDate(task.dateCreate.val) }}
    </p>
    <p class="OneTask-DateFinish">
      <span class="OneTask-NameHead">Дата окончания: </span>
      {{ FormattingDate(task.dateFinish.val) }}
    </p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { FormattingDate } from '@/Plugins/DateFormater'

export default {
  name: 'one-task',
  props: {
    task: {
      type: Object
    }
  },
  setup (props, { emit }) {
    const status = computed(() => {
      if (props.task.finish.val) {
        return 'Finished'
      }
      if (new Date(props.task.dateFinish.val) < new Date()) {
        return 'Time'
      } else {
        return 'InTime'
      }
    })

    const editTask = id => {
      emit('editTask', id)
    }
    const archivedTask = id => {
      emit('archivedTask', id)
    }
    const finishedTask = id => {
      emit('finishedTask', id)
    }
    return {
      FormattingDate,
      editTask,
      archivedTask,
      finishedTask,
      status
    }
  }
}
</script>

<style lang="stylus">
.OneTask
  margin 10px
  position relative
  box-shadow 0 0 10px 1px var(--black-light)
  border-radius 5px
  padding 10px
  width 300px
  &__Finished
    background-color var(--white-darker)
  &__Time
    background-color var(--red-light)
  &__InTime
    background-color var(--green-light)
  &-ActionsButtons
    display flex
    justify-content space-between
    align-items center
    border-bottom 1px solid var(--black-light)
    margin-bottom 4px
  &-ActionButton
    cursor pointer
</style>
