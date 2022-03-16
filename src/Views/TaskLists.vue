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
        @editTask="editTask"
        @archivedTask="archivedTask"
        @finishedTask="finishedTask"
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
      taskFlag.value = 'main'
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
              taskLists.value.splice(i, 1)
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
    const clearArchive = () => {
      store.commit('SetGloaderFlag', true)
      store.dispatch('apiClearArchive', { listName: store.getters.GetUserName })
        .then(response => {
          store.commit('SetNotification', {
            header: 'Успех',
            body: response.message,
            flag: true,
            status: 'success',
            duration: 5000
          })
          taskLists.value = []
        })
        .catch(() => {
          store.commit('SetNotification', {
            header: 'Ошибка',
            body: 'Не удалось очистить архивные задачи. Попробуйте позже',
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
