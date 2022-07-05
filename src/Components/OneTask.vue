<template>
  <div class="OneTask" :class="`OneTask__${status}`">
    <div class="OneTask-ActionsButtons">
      <div class="OneTask-Header">
        <select
          @change="changeStatusesTask($event, task._id)"
          class="OneTask-StatusWork"
          :value="task.status.val"
          :disabled="task.finish.val"
        >
          <option v-for="(value, name) in $store.state.statuses" :key="name" :value="name">
            {{ value }}
          </option>
        </select>
        <p class="OneTask-Name">
          <span class="OneTask-NameValue"><b>{{ task.nameTask.val }}</b></span>
        </p>
      </div>
      <div>
        <span v-if="!task.finish.val" class="OneTask-ActionButton icon icon-edit" @click="editTask(task._id)"/>
        <span v-if="!task.archive.val && task.finish.val" class="OneTask-ActionButton icon icon-inbox" @click="archivedTask(task._id)"/>
        <span v-if="!task.finish.val" class="OneTask-ActionButton icon icon-check" @click="finishedTask(task._id)"/>
      </div>
    </div>
    <p class="OneTask-Description">
      <span class="OneTask-NameHead"><b>Описание</b>: </span>
      <span class="OneTask-NameValue">{{ task.description.val }}</span>
    </p>
    <div class="OneTask-Dates">
      <p class="OneTask-DateCreate">
        <span class="OneTask-NameHead"><b>Дата создания</b>: </span>
        {{ FormattingDate(task.dateCreate.val) }}
      </p>
      <p class="OneTask-DateFinish">
        <span class="OneTask-NameHead"><b>Дата окончания</b>: </span>
        {{ FormattingDate(task.dateFinish.val) }}
      </p>
    </div>
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
      if (props.task.archive.val) {
        return 'Archive'
      }
      if (props.task.finish.val) {
        return 'Finished'
      }
      if (new Date(props.task.dateFinish.val).getTime() < new Date().getTime()) {
        return 'Time'
      } else if (new Date(props.task.dateFinish.val).getTime() > new Date().getTime()) {
        return 'InTime'
      } else {
        return 'InNow'
      }
    })

    const changeStatusesTask = (event, taskId) => {
      emit('ChangeStatus', { id: taskId, val: event.target.value })
    }
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
      changeStatusesTask,
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
  box-shadow 0 0 10px 1px var(--outline)
  border-radius 5px
  padding 10px
  width 100%
  &-Header
    display flex
    align-items baseline
  &-StatusWork
    margin-right 10px
    background-color inherit
  &-Dates
    display flex
  &-DateCreate
    margin-right 10px
  &-Finished
    font-style italic
  &__Finished
    background-color var(--secondary)
    color var(--on-secondary)
    & .OneTask-StatusWork
      color var(--on-secondary)
  &__Time
    background-color var(--error)
    color var(--on-error)
    & .OneTask-StatusWork
      color var(--on-error)
  &__InTime
    background-color var(--promary-container)
    color var(--on-primary-container)
    & .OneTask-StatusWork
      color var(--on-primary-container)
  &__InNow
    background-color var(--tertiary-container)
    color var(--on-tertiary-container)
    & .OneTask-StatusWork
      color var(--on-tertiary-container)
  &-Name, &-Description, &-DateCreate
    padding-bottom 10px
  &-ActionsButtons
    display flex
    justify-content space-between
    align-items center
    border-bottom 1px solid var(--outline)
    margin-bottom 4px
    padding-bottom 5px
  &-ActionButton
    font-size 20px
    &:not(:last-child)
      margin-right 5px
  &-ActionButton
    cursor pointer
</style>
