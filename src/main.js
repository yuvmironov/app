import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'
import store from './Store'
import Notification from '@/Components/Notification'
import InputComponent from '@/Components/InputComponent'

createApp(App)
  .use(store)
  .use(router)
  .component('Notification', Notification)
  .component('InputComponent', InputComponent)
  .mount('#app')
