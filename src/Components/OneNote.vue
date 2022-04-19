<template>
  <div class="OneNote" :style="{ backgroundColor : note.color.val }">
    <div class="OneNote-HeaderBlock">
      <p class="OneNote-Header">{{ note.name.val }}</p>
      <div class="OneNote-Actions">
        <span class="OneNote-Button icon icon-edit" @click="edit(note._id)"/>
        <span class="OneNote-Button icon icon-trash" @click="del(note._id)"/>
      </div>
    </div>
    <div class="OneNote-Body" v-html="note.body.val">
    </div>
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
  min-width 200px
  max-width 500px
  height auto
  background-color var(--white-default)
  box-shadow 0 0 4px var(--blak-transparent)
  &-HeaderBlock
    display flex
    justify-content space-between
    align-items center
    border-bottom 1px solid var(--black-light)
    padding 4px 0
  &-Header
    font-style italic
    font-size 14px
    margin-right 10px
  &-Body
    padding-top 10px
    width 100%
  &-Button
    font-size 20px
    cursor pointer
    &:not(:last-child)
      margin-right 5px
</style>
