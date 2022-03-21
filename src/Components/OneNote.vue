<template>
  <div class="OneNote" :style="{ backgroundColor : note.color }">
    <div class="OneNote-Actions">
      <span class="icon icon-edit" @click="edit(note._id)"/>
      <span class="icon icon-trash" @click="del(note._id)"/>
    </div>
    <p class="OneNote-Header">{{ note.name }}</p>
    <p class="OneNote-Body">
      {{ note.body }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'one-note',
  props: ['note'],
  setup (props, { emit }) {
    const edit = (id) => {
      emit('EditNote', id)
    }
    const del = (id) => {
      emit('DelNote', id)
    }
    return {
      edit,
      del
    }
  }
}
</script>

<style lang="stylus">
.OneNote
  margin 5px
  padding 5px
  border-radius 5px
  width 200px
  height auto
  background-color var(--white-default)
  box-shadow 0 0 4px var(--blak-transparent)
  &-Actions
    display flex
    justify-content flex-end
    border-bottom 1px solid var(--black-light)
    padding-bottom 4px
</style>
