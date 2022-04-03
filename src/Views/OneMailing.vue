<template>
  <div class="OneMailing">
    <div class="OneMailing-MailingBlock">
      <div class="OneMailing-MailingBody">
        <div class="OneMailing-MailingButtons">
          <yuv-button
            class="OneMailing-MailingButton"
            name="Редактировать тело рассылки"
            :fun="openEdit"
          />
          <yuv-button
            class="OneMailing-MailingButton"
            name="Редактировать список получателей"
            :fun="openEdit"
          />
        </div>
        <h4>{{ OneMailing.name }}</h4>
        <p class="OneMailing-Mailing" v-html="OneMailing.body"></p>
      </div>
      <div class="OneMailing-Recipients">
        <p v-for="element in OneMailing.recipients" :key="element">{{ element }}</p>
      </div>
    </div>
    <div class="OneMailing-EditWin" v-if="editMailing">
      <editor
        api-key="iruikfet3r7sfm7pqjfnkn2io5ntkh89phqfpbgzkib6rl0i"
        cloud-channel='5'
        output-format="html"
        :init="tinyInitConfig"
        v-model="OneMailing.body"
        :initial-value="OneMailing.body"
      />
      <yuv-button
        name="Сохранить"
        :fun="closeEdit"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'

export default {
  name: 'one-mailing',
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const getOneMailin = (id) => {
      console.log('asdasdasdasd', store.getters.getMailingList)
      if (store.getters.getMailingList !== undefined) {
        store.getters.getMailingList.forEach(item => {
          if (item._id === id) {
            OneMailing.value = JSON.parse(JSON.stringify(item))
          }
        })
      } else {
        router.push('/mailing')
      }
    }

    const OneMailing = ref({})
    const editMailing = ref(false)
    onMounted(() => {
      getOneMailin(route.params.id)
    })
    onBeforeRouteUpdate((to, from) => {
      if (to.params.id !== from.params.id) {
        getOneMailin(to.params.id)
      }
    })
    const openEdit = () => {
      editMailing.value = !editMailing.value
      document.querySelector('body').style.overflow = 'hidden'
    }
    const closeEdit = () => {
      editMailing.value = !editMailing.value
      document.querySelector('body').style.overflow = 'auto'
    }
    const tinyInitConfig = {
      width: '100%',
      height: `${document.body.clientHeight - 60}px`,
      plugins: 'advlist autolink lists link image charmap print preview emoticons' +
        ' insertdatetime preview anchor searchreplace visualblocks code fullscreen' +
        ' insertdatetime media table paste imagetools wordcount',
      toolbar: `
        insertfile undo redo |
        styleselect |
        bold italic |
        alignleft aligncenter alignright alignjustify |
        bullist numlist outdent indent table|
        link image insertdatetime |
        fullscreen`,
      id: 'mailing',
      'model-events': 'change keydown blur focus paste'
    }

    return {
      OneMailing,
      editMailing,
      openEdit,
      closeEdit,
      tinyInitConfig
    }
  }
}
</script>

<style lang="stylus">
.OneMailing
  width 100%
  &-MailingBlock
    display flex
    justify-content space-between
  &-MailingBody
    flex-basis 70%
  &-MailingButtons
    display flex
  &-MailingButton
    &:not(:last-child)
      margin-right 5px
  &-Mailing
    border 1px solid black
    padding 10px
    margin-bottom 10px
  &-EditWin
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background-color var(--black-lighter)
    display flex
    flex-wrap wrap
    align-items flex-start
    justify-content flex-start
    padding 10px
</style>
