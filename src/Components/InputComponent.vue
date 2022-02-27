<template>
  <div class="InputComponents">
    <input class="InputComponents-Input"
           :class="{ 'InputComponents-Input__Error' : !flag, 'InputComponents-Input__Success': flag }"
           :type="type"
           :id="id"
           :value="modelValue"
           :disabled="disabled"
           @input="inputEvent($event.target.value)"
           @focus="inputEvent($event.target.value)"
           @blur="inputEvent($event.target.value)"
           autocomplete="off"
           required
    >
    <label class="InputComponents-Label" :for="id">{{ label }}</label>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  name: 'input-component',
  emits: ['update:modelValue'],
  props: {
    type: {
      type: String,
      default: 'text'
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'Default label'
    },
    modelValue: {},
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {},
    errMessage: {}
  },
  setup (props, { emit }) {
    const flag = ref(false)
    onMounted(() => {
      inputEvent(props.modelValue)
    })
    const inputEvent = (data) => {
      const digits = /\d/g
      const capitalLetter = /[A-Z]/g
      const smallLetter = /[a-z]/g
      // eslint-disable-next-line
      const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      switch (props.type) {
        case 'text':
          if (data) {
            flag.value = true
          }
          break
        case 'email':
          flag.value = regEmail.test(data)
          break
        case 'password':
          flag.value = !!((data.length >= 8 && data.length <= 64) &&
            data.match(digits) &&
            data.match(capitalLetter) &&
            data.match(smallLetter))
          break
      }
      if (flag.value) {
        emit('update:modelValue', data)
      }
    }
    return {
      inputEvent,
      flag
    }
  }
}
</script>

<style lang="stylus" scoped>
.InputComponents
  position:relative
  width: 100%
  &-Label
    position:absolute
    font-size: var(--fontlabel)
    color:var(--grayBlack)
    z-index:2
    left:.5em
    top:.8em
    pointer-events:none
    background:var(--inputBack_P)
    transition:all 200ms ease-out
    transform:translateY(-1.45em)
    padding: 0 .5em
  &-Input
    position:relative
    font-size: var(--fontBase)
    width: 100%;
    height: 2.5em;
    color:var(--brandBlack)
    outline:none
    border: 0
    border-radius 3px
    padding: 0 1em
    box-shadow: inset 0 0 0 1px var(--grayMiddle)
    box-sizing: border-box
    &__Error
      box-shadow 0 0 0 1px var(--alert)
    &__Success
      box-shadow 0 0 0 1px var(--success)
</style>
