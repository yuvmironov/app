import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'
import store from './Store'
import axios from 'axios'
import 'yuv-components/src/Styles/Variable.styl'
import 'yuv-components/src/Styles/ResetStyle.styl'
import 'yuv-components/src/Styles/Fonts.styl'
import Components from 'yuv-components/src/components'
import FormCreateTask from '@/Components/FormCreateTask'

import Editor from '@tinymce/tinymce-vue'
axios.defaults.withCredentials = true
if (process.env.NODE_ENV === 'prodaction') {
  axios.defaults.baseURL = 'https://yuvmironov.herokuapp.com/'
} else {
  axios.defaults.baseURL = 'http://localhost:3000'
}
const app = createApp(App)

for (const key in Components) {
  app.component(key, Components[key])
}

app
  .use(store)
  .use(router)
  .component('Editor', Editor)
  .component('FormCreateTask', FormCreateTask)
  .mount('#app')
