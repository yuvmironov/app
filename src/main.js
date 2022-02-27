import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'
import store from './Store'
import Notification from '@/Components/Notification'

createApp(App)
  .use(store)
  .use(router)
  .component('Notification', Notification)
  .mount('#app')
