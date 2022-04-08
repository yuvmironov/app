<template>
  <div class="Mail">
    <h1>Отправка почты</h1>
    <yuv-input
      class="Mail-Input"
      id="Sender"
      label="Имя отправителя"
      v-model="sender"
    />
    <yuv-input
      class="Mail-Input"
      id="SenderMail"
      label="От кого"
      type="email"
      v-model="senderMail"
    />
    <yuv-input
      class="Mail-Input"
      id="Recipient"
      label="Получатель"
      type="email"
      v-model="recipient"
    />
    <yuv-input
      class="Mail-Input"
      id="Recipient"
      label="Заголовок"
      type="test"
      v-model="subject"
    />
    <editor
      api-key="iruikfet3r7sfm7pqjfnkn2io5ntkh89phqfpbgzkib6rl0i"
      cloud-channel='5'
      output-format="html"
      :init="tinyInitConfig"
      v-model="bodyMail"
      :initial-value="bodyMail"
    />
    <div class="Mail-Buttons">
      <yuv-button
        class="Mail-Button"
        name="Отправить"
        :fun="sendMail"
      />
      <yuv-button
        class="Mail-Button"
        name="Очистить"
        :fun="clearMail"
      />
    </div>
  </div>
</template>

<script>
import { MainMail } from '@/Views/Mail/MainMail'
import { EditorConfiguration } from '@/Views/Mail/EditorConfiguration'

export default {
  name: 'mail',
  setup () {
    const { sender, senderMail, recipient, subject, bodyMail, clearMail, sendMail } = MainMail()
    const { tinyInitConfig } = EditorConfiguration()

    return {
      sender,
      senderMail,
      recipient,
      subject,
      bodyMail,
      tinyInitConfig,
      clearMail,
      sendMail
    }
  }
}
</script>

<style lang="stylus">
.Mail
  padding 10px
  &-Input
    &:not(:last-child)
      margin-bottom 10px
  &-Buttons
    display flex
  &-Button
    &:not(:last-child)
      margin-right 5px
.tox-tinymce
  margin-bottom 10px
</style>
