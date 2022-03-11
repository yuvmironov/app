import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'
import store from './Store'
import 'yuv-components/src/Styles/Variable.styl'
import 'yuv-components/src/Styles/ResetStyle.styl'
import 'yuv-components/src/Styles/Fonts.styl'
import Components from 'yuv-components/src/components'
import FormCreateTask from '@/Components/FormCreateTask'
const app = createApp(App)

for (const key in Components) {
  app.component(key, Components[key])
}

app
  .use(store)
  .use(router)
  .component('FormCreateTask', FormCreateTask)
  .mount('#app')
