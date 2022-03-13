<template>
  <div class="Lk">
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
    const taskFlag = ref('main')
    const store = useStore()
    const getMainTask = () => {
      store.commit('SetGloaderFlag', true)
      store.dispatch('apiGetList', { listName: store.getters.GetUserName })
        .then(response => {
          taskLists.value = JSON.parse(JSON.stringify(response.payload))
        })
        .finally(() => {
          store.commit('SetGloaderFlag', false)
        })
    }
    onMounted(() => {
      getMainTask()
      taskFlag.value = 'main'
    })

    const taskLists = ref([])

    const editData = ref('')
    const newTask = () => {
      createTaskForm.value.onOpen()
    }
    const newTaskSave = (data) => {
      const task = {
        nameTask: {
          type: 'text',
          val: data.name
        },
        dateCreate: {
          type: 'date',
          val: new Date(data.dateCreate)
        },
        dateFinish: {
          type: 'date',
          val: new Date(data.dateFinish)
        },
        finish: {
          type: 'checkbox',
          val: false
        },
        archive: {
          type: 'checkbox',
          val: false
        },
        description: {
          type: 'textarea',
          val: data.description
        }
      }
      const sendingData = {
        listName: store.getters.GetUserName,
        task: task
      }
      store.commit('SetGloaderFlag', true)
      store.dispatch('apiAddTask', sendingData)
        .then(response => {
          taskLists.value.push(response)
        })
        .finally(() => {
          store.commit('SetGloaderFlag', false)
        })
    }
    const editTask = (id) => {
      console.log('edit', id)
      for (let i = 0; i < taskLists.value.length; i++) {
        if (taskLists.value[i]._id === id) {
          editData.value = JSON.parse(JSON.stringify(taskLists.value[i]))
          break
        }
      }
      editTaskForm.value.onOpen()
    }
    const saveAfterEdit = data => {
      data.dateCreate.val = new Date(data.dateCreate.val)
      data.dateFinish.val = new Date(data.dateFinish.val)
      store.commit('SetGloaderFlag', true)
      store.dispatch('apiEditTask', {
        listName: store.getters.GetUserName,
        task: data
      })
        .then(response => {
          store.commit('SetNotification', {
            header: 'Успех',
            body: response.payload,
            flag: true,
            status: 'success',
            duration: 5000
          })
          for (let i = 0; i < taskLists.value.length; i++) {
            if (taskLists.value[i]._id === data._id) {
              taskLists.value[i] = data
            }
          }
          editTaskForm.value.onClose()
        })
        .catch(() => {
          store.commit('SetNotification', {
            header: 'Ошибка',
            body: 'Не удалось обновить задачу. Попробуйте позже',
            flag: true,
            status: 'error',
            duration: 5000
          })
        })
        .finally(() => {
          store.commit('SetGloaderFlag', false)
        })
    }
    const archivedTask = id => {
      console.log('archived', id)
      let temp = ''
      for (let i = 0; i < taskLists.value.length; i++) {
        if (taskLists.value[i]._id === id) {
          temp = JSON.parse(JSON.stringify(taskLists.value[i]))
          break
        }
      }
      temp.archive.val = true
      store.commit('SetGloaderFlag', true)
      store.dispatch('apiEditTask', {
        listName: store.getters.GetUserName,
        task: temp
      })
        .then(() => {
          store.commit('SetNotification', {
            header: 'Успех',
            body: 'Задача успешно отправлена в архив',
            flag: true,
            status: 'success',
            duration: 5000
          })
          for (let i = 0; i < taskLists.value.length; i++) {
            if (taskLists.value[i]._id === id) {
              taskLists.value[i].archive.val = true
              break
            }
          }
        })
        .catch(() => {
          store.commit('SetNotification', {
            header: 'Ошибка',
            body: 'Не удалось отправить задачу в архив. Попробуйте позже',
            flag: true,
            status: 'error',
            duration: 5000
          })
        })
        .finally(() => {
          store.commit('SetGloaderFlag', false)
        })
    }
    const finishedTask = id => {
      console.log('finished', id)
      let temp = ''
      for (let i = 0; i < taskLists.value.length; i++) {
        if (taskLists.value[i]._id === id) {
          temp = JSON.parse(JSON.stringify(taskLists.value[i]))
          break
        }
      }
      temp.finish.val = true
      store.commit('SetGloaderFlag', true)
      store.dispatch('apiEditTask', {
        listName: store.getters.GetUserName,
        task: temp
      })
        .then(() => {
          store.commit('SetNotification', {
            header: 'Успех',
            body: 'Задача завершена',
            flag: true,
            status: 'success',
            duration: 5000
          })
          for (let i = 0; i < taskLists.value.length; i++) {
            if (taskLists.value[i]._id === id) {
              taskLists.value[i].finish.val = true
              break
            }
          }
        })
        .catch(() => {
          store.commit('SetNotification', {
            header: 'Ошибка',
            body: 'Не удалось завершить задачу. Попробуйте позже',
            flag: true,
            status: 'error',
            duration: 5000
          })
        })
        .finally(() => {
          store.commit('SetGloaderFlag', false)
        })
    }

    const getArchivedTask = () => {
      taskFlag.value = 'archive'
      store.commit('SetGloaderFlag', true)
      store.dispatch('apiGetArchiveList', { listName: store.getters.GetUserName })
        .then(response => {
          taskLists.value = JSON.parse(JSON.stringify(response.payload))
        })
        .finally(() => {
          store.commit('SetGloaderFlag', false)
        })
    }

    return {
      getMainTask,
      createTaskForm,
      editTaskForm,
      taskFlag,
      taskLists,
      newTask,
      newTaskSave,
      editTask,
      saveAfterEdit,
      archivedTask,
      finishedTask,
      editData,
      getArchivedTask
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
