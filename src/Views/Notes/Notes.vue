<template>
  <div class="Notes" :class="{ 'Notes__Show' : flag }">
    <yuv-icon-button class="Notes-Icon" :class="{ 'Notes-Icon__Hide' : flag }" :fun="show" icon="clipboard"/>
    <p class="Notes-IconText">Заметки</p>
    <div class="Notes-List" v-show="flag">
      <div class="Notes-Buttons">
        <yuv-icon-button class="Notes-ButtonPlus" :fun="addNote" icon="plus"/>
        <yuv-icon-button class="Notes-BackArrow" :fun="show" icon="arrow-right"/>
      </div>
      <div v-if="notes.length">
        <p class="Notes-NoteLink"
           v-for="note in notes"
           :key="note._id"
           @click="selectOneNote(note._id)"
           :style="`background: ${note.color.val}`"
        >
          {{ note.name.val }}
        </p>
      </div>
      <div v-else>
        У вас нет заметок
      </div>
      <one-note-active
        :note="note"
        :colors="noteColors"
        :flag-show-note="showOneNote"
        @closeNoteWindow="closeNoteWindow"
        @saveChange="saveChange"
        @deleteNote="deleteNote"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import OneNoteActive from '@/Components/OneNoteActive'

export default {
  components: { OneNoteActive },
  setup () {
    const flag = ref(false)
    const showOneNote = ref(false)
    const closeNoteWindow = () => {
      showOneNote.value = false
    }
    const show = () => {
      flag.value = !flag.value
    }
    const store = useStore()

    const notes = computed(() => {
      return store.getters.getNoteList
    })

    const noteColors = computed(() => {
      const res = []
      for (const color in store.getters.getNoteColors) {
        res.push(store.getters.getNoteColors[color])
      }
      return res
    })

    const note = ref({})
    const getNotes = () => {
      return store.dispatch('apiGetNotes', { listName: store.getters.GetUserName })
    }
    const getColors = () => {
      return store.dispatch('apiGetNoteColors')
    }
    onMounted(() => {
      store.commit('SetGloaderFlag', true)
      Promise.all([getNotes(), getColors()])
        .finally(() => {
          store.commit('SetGloaderFlag', false)
        })
    })

    const selectOneNote = (id) => {
      note.value = notes.value.find(e => {
        return e._id === id
      })
      showOneNote.value = true
    }

    const addNote = () => {
      note.value = {
        name: {
          type: 'String',
          val: ''
        },
        body: {
          type: 'String',
          val: ''
        },
        color: {
          type: 'String',
          val: '#00bfff'
        }
      }
      showOneNote.value = true
    }

    const saveChange = (data) => {
      store.commit('SetGloaderFlag', true)
      if (data?._id) {
        store.dispatch('apiEditNote', {
          listName: store.getters.GetUserName,
          note: data
        })
          .then(response => {
            store.commit('SetNotification', {
              header: 'Успех',
              body: response.payload,
              flag: true,
              status: 'success',
              duration: 5000
            })
            for (let i = 0; i < notes.value.length; i++) {
              if (notes.value[i]._id === data._id) {
                notes.value[i] = data
                break
              }
            }
          })
          .finally(() => {
            store.commit('SetGloaderFlag', false)
          })
      } else {
        store.dispatch('apiNewNote', {
          listName: store.getters.GetUserName,
          note: data
        })
          .then(response => {
            notes.value.push(response.payload[0])
          })
          .finally(() => {
            store.commit('SetGloaderFlag', false)
          })
        showOneNote.value = false
      }
    }
    const deleteNote = (id) => {
      store.commit('SetGloaderFlag', true)
      store.dispatch('apiDeleteNote',
        {
          listName: store.getters.GetUserName,
          noteId: id
        })
        .then(response => {
          store.commit('SetNotification', {
            header: 'Успех',
            body: response.payload,
            flag: true,
            status: 'success',
            duration: 5000
          })
          for (let i = 0; i < notes.value.length; i++) {
            if (notes.value[i]._id === id) {
              notes.value.splice(i, 1)
              break
            }
          }
          showOneNote.value = false
        })
        .finally(() => {
          store.commit('SetGloaderFlag', false)
        })
    }
    return {
      flag,
      showOneNote,
      closeNoteWindow,
      notes,
      note,
      noteColors,
      selectOneNote,
      addNote,
      saveChange,
      deleteNote,
      show
    }
  }
}
</script>

<style lang="stylus">
.Notes
  position absolute
  top 60px
  right 10px
  &-Buttons
    display flex
    width 100%
    justify-content flex-end
  &-Icon
    &:hover
      & + .Notes-IconText
        opacity 1
        right 60px
        transition 1s
    &__Hide
      display none
  &-IconText
    position absolute
    top 20px
    right 0
    opacity 0
    transition 1s
  &__Show
    width 100%
  &-List
    z-index 10
    width 300px
    position fixed
    padding 10px
    top 0
    bottom 0
    right 0
    background var(--background)
    color var(--on-background)
  &-NoteLink
    cursor pointer
    padding 5px
    &:not(:last-child)
      margin-bottom 5px
  &-BackArrow
    margin-bottom 5px
  &-ButtonPlus
    margin-right 5px
</style>
