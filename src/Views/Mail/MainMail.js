import { useStore } from 'vuex'
import { ref } from 'vue'

export function MainMail () {
  const store = useStore()
  const sender = ref('')
  const senderMail = ref(store.getters.GetUserMail)
  const recipient = ref('')
  const subject = ref('')
  const bodyMail = ref('')

  const clearMail = () => {
    sender.value = ''
    subject.value = ''
    recipient.value = ''
    bodyMail.value = ''
  }

  const sendMail = () => {
    store.commit('SetGloaderFlag', true)
    store.dispatch('apiSendOneMail', {
      name: sender.value,
      from: senderMail.value,
      to: recipient.value,
      sub: subject.value,
      html: bodyMail.value
    })
      .then(response => {
        console.log(response)
        store.commit('SetNotification', {
          header: 'Успех',
          body: response.payload,
          flag: true,
          status: 'success',
          duration: 5000
        })
      })
      .finally(() => {
        store.commit('SetGloaderFlag', false)
      })
  }

  return {
    store,
    sender,
    senderMail,
    recipient,
    subject,
    bodyMail,
    clearMail,
    sendMail
  }
}
