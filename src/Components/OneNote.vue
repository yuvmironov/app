<template>
  <div class="OneNote" v-if="flagShowNote">
    <div class="OneNote-Content" :style="`background : ${colorNote}`">
      <div class="OneNote-Edit" v-show="editFlag">
        <yuv-input
          id="nameNote"
          v-model="nameNote"
          label="Имя задачи"
        />
        <yuv-select
          id="colorNote"
          label="Цвет"
          :options="colors"
          v-model="colorNote"
        />
        <editor
          api-key="iruikfet3r7sfm7pqjfnkn2io5ntkh89phqfpbgzkib6rl0i"
          cloud-channel='5'
          output-format="html"
          :init="tinyInitConfig"
          v-model="bodyNote"
          :initial-value="bodyNote"
        />
      </div>
      <div class="OneNote-NotEdit" v-show="!editFlag">
        <h5>{{ nameNote }}</h5>
        <p v-html="bodyNote"/>
      </div>
      <div class="OneNote-Buttons">
        <span
          v-if="!editFlag"
          class="icon icon-edit OneNote-Button"
          @click="editNote"
        />
        <span v-else
          class="icon icon-save OneNote-Button"
          @click="saveNote"
        />
        <span
          class="icon icon-trash OneNote-Button"
          @click="deleteNote"
        />
        <span class="icon icon-x OneNote-Button" @click="onClose"/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'one-note-active',
  props: ['note', 'flagShowNote', 'colors'],
  setup (props, { emit }) {
    const tinyInitConfig = ref({
      width: '650px',
      height: '200px',
      resize: false,
      menubar: false,
      toolbar: `
        bold italic`,
      id: 'oneNoteEditor',
      'model-events': 'change keydown blur focus paste'
    })

    const bodyNote = ref('')
    const colorNote = ref('')
    const nameNote = ref('')
    let id = ''
    const onClose = () => {
      editFlag.value = false
      emit('closeNoteWindow')
    }

    const editFlag = ref(false)
    const editNote = () => {
      editFlag.value = true
    }
    const saveNote = () => {
      emit('saveChange', {
        _id: id,
        name: {
          type: 'String',
          val: nameNote.value
        },
        body: {
          type: 'String',
          val: bodyNote.value
        },
        color: {
          type: 'String',
          val: colorNote.value
        }
      })
      editFlag.value = false
    }
    const deleteNote = () => {
      emit('deleteNote', id)
    }

    watch(() => props.note, newValue => {
      id = newValue._id
      nameNote.value = newValue.name.val
      colorNote.value = newValue.color.val
      bodyNote.value = newValue.body.val
    })
    watch(() => props.flagShowNote, () => {
      if (props.flagShowNote) {
        if (!props.note.name.val) {
          editFlag.value = true
        }
      }
    })
    return {
      tinyInitConfig,
      nameNote,
      colorNote,
      bodyNote,
      onClose,

      editFlag,
      editNote,
      saveNote,
      deleteNote
    }
  }
}
</script>

<style lang="stylus">
.OneNote
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  display flex
  align-items center
  justify-content center
  backdrop-filter: blur(4px)
  &-Content
    min-width 150px
    position relative
    padding 20px
    border-radius 15px
    &:hover > .OneNote-Buttons
      opacity 1
      transition 0.6s
  &-Buttons
    opacity 0
    transition 0.6s
    position absolute
    top 10px
    right 10px
    display flex
    font-size 20px
  &-Button
    cursor pointer
    &:not(:last-child)
      margin-right 5px
  &-Edit
    padding-top 20px
</style>
