<template>
  <div class="OneNote" v-if="flagShowNote" @click="onClose">
    <div class="OneNote-Content" :style="`background : ${colorNote}`">
      <yuv-input id="nameNote" v-model="nameNote" :disabled="true" label="Имя задачи"/>
      <yuv-select
        id="colorNote"
        label="Цвет"
        :options="colors"
          v-model="colorNote"
      />
      {{ bodyNote }}
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'one-note-active',
  props: ['note', 'flagShowNote', 'colors'],
  setup (props, { emit }) {
    const bodyNote = ref('')
    const colorNote = ref('')
    const nameNote = ref('')
    const onClose = (e) => {
      if (e.target.classList.contains('OneNote')) {
        emit('closeNoteWindow')
      }
    }
    watch(() => props.note, newValue => {
      nameNote.value = newValue.name.val
      colorNote.value = newValue.color.val
      bodyNote.value = newValue.body.val
    })
    return {
      nameNote,
      colorNote,
      bodyNote,
      onClose
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
    padding 20px
</style>
