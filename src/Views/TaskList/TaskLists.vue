<template>
  <div class="Lk">
    <h1>Задачи</h1>
    <div class="Lk-Actions">
      <div class="Lk-NewTask" @click="newTask">
        <span class="icon icon-plus"/>
        <span>Новая задача</span>
      </div>
      <div v-if="taskFlag === 'main'" class="Lk-NewTask" @click="getArchivedTask">
        <span class="icon icon-inbox"/>
        <span>Архивные задачи</span>
      </div>
      <div v-else class="Lk-NewTask" @click="getMainTask">
        <span class="icon icon-inbox"/>
        <span>Текущие задачи</span>
      </div>
    </div>
    <div class="Lk-Tasks">
      <p v-if="!taskLists.length && taskFlag === 'main'">
        У вас еще нет активных задач.
      </p>
      <p v-if="!taskLists.length && taskFlag === 'archive'">
        Архив задач пуст
      </p>
      <one-task
        v-for="item in taskLists" :key="item._id"
        :task="item"
        @editTask="editOneTask"
        @archivedTask="archivedOneTask"
        @finishedTask="finishedOneTask"
        @ChangeStatus="changeStatusOneTask"
      />
    </div>
    <span v-if="taskFlag === 'archive' && taskLists.length" class="Lk-NewTask" @click="clearArchive">
      <span class="icon icon-x"/>
      Очистить список архивных задач
    </span>
    <form-create-task
      ref="createTaskForm"
      @newTask="newTaskSave"
    />
    <form-edit
      ref="editTaskForm"
      :data-in-form="editData"
      @saveEditData="saveAfterEdit"
    />
  </div>
</template>

<script>
import OneTask from '@/Components/OneTask'
import FormEdit from '@/Components/FormEdit'
import { createTask } from './createTask'
import { getTasks } from './getTasks'
import { editTask } from './editTask'
import { archivedTask } from './archivedTask'
import { finishedTask } from './finishedTask'

export default {
  name: 'lk',
  components: {
    OneTask,
    FormEdit
  },
  setup () {
    const { taskFlag, taskLists, getArchivedTask, getMainTask } = getTasks()
    const { createTaskForm, newTask, newTaskSave } = createTask(taskLists)
    const { editTaskForm, editData, changeStatusOneTask, editOneTask, saveAfterEdit } = editTask(taskLists)
    const { archivedOneTask, clearArchive } = archivedTask(taskLists)
    const { finishedOneTask } = finishedTask(taskLists)

    return {
      getMainTask,
      createTaskForm,
      editTaskForm,
      taskFlag,
      taskLists,
      editData,
      newTask,
      newTaskSave,
      editOneTask,
      saveAfterEdit,
      archivedOneTask,
      finishedOneTask,
      changeStatusOneTask,
      getArchivedTask,
      clearArchive
    }
  }
}
</script>

<style lang="stylus">
.Lk
  height 100vh
  display flex
  flex-direction column
  justify-content flex-start
  align-items flex-start
  padding 20px
  &-Actions
    display flex
    margin-bottom 10px
  &-Tasks
    display flex
    flex-wrap wrap
  &-NewTask
    cursor pointer
    padding-left 10px
    font-size 20px
    display flex
    align-items center
</style>
