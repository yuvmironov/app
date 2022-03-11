<template>
  <div class="Lk">
    <div class="Lk-NewTask" @click="newTask">
      <span class="icon icon-plus"/>
      <span>Новая задача</span>
    </div>
    <div class="Lk-Tasks">
      <one-task
        v-for="item in taskLists" :key="item._id"
        :task="item"
        @editTask="editTask"
        @archivedTask="archivedTask"
        @finishedTask="finishedTask"
      />
    </div>
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
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import OneTask from '@/Components/OneTask'
import FormEdit from '@/Components/FormEdit'

export default {
  name: 'lk',
  components: {
    OneTask,
    FormEdit
  },
  setup () {
    const createTaskForm = ref(null)
    const editTaskForm = ref(null)
    const store = useStore()
    onMounted(() => {
      store.dispatch('apiGetList', { listName: store.getters.GetUserName })
        .then(response => {
          taskLists.value = JSON.parse(JSON.stringify(response.payload))
        })
    })

    const taskLists = ref([])

    const editData = ref('')
    const newTask = () => {
      createTaskForm.value.onOpen()
    }
    const newTaskSave = (data) => {
      console.log(data)
    }
    const editTask = (id) => {
      console.log('edit', id)
      for (let i = 0; i < taskLists.value.length; i++) {
        if (taskLists.value[i]._id === id) {
          editData.value = taskLists.value[i]
          break
        }
      }
      editTaskForm.value.onOpen()
    }
    const saveAfterEdit = data => {
      data.dateCreate.val = new Date(data.dateCreate.val)
      data.dateFinish.val = new Date(data.dateFinish.val)
      console.log(data)
      store.dispatch('apiEditTask', {
        listName: store.getters.GetUserName,
        task: data
      })
        .then(response => {
          console.log(response)
        })
    }
    const archivedTask = id => {
      console.log('archived', id)
    }
    const finishedTask = id => {
      console.log('finished', id)
    }

    return {
      createTaskForm,
      editTaskForm,
      taskLists,
      newTask,
      newTaskSave,
      editTask,
      saveAfterEdit,
      archivedTask,
      finishedTask,
      editData
    }
  }
}
</script>

<style lang="stylus">
.Lk
  height 100vh
  display flex
  justify-content flex-start
  align-items flex-start
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
