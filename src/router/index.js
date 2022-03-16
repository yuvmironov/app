import { createRouter, createWebHistory } from 'vue-router'
import HeaderComponent from '@/Components/HeaderComponent'
import FooterComponent from '@/Components/FooterComponent'
import InnerHeader from '@/Components/InnerHeader'
import InnerFooter from '@/Components/InnerFooter'
import NotFound from '@/Views/404'

const routes = [
  {
    path: '/',
    name: 'Main',
    components: {
      header: HeaderComponent,
      default: () => import(/* webpackChunkName: "home" */ '../Views/Main'),
      footer: FooterComponent
    },
    meta: {
      title: 'Вход'
    }
  },
  {
    path: '/taskList',
    name: 'taskList',
    components: {
      header: InnerHeader,
      default: () => import(/* webpackChunkName: "taskList" */ '../Views/TaskLists'),
      footer: InnerFooter
    },
    meta: {
      title: 'Задачи'
    }
  },
  {
    path: '/notesList',
    name: 'notesList',
    components: {
      header: InnerHeader,
      default: () => import(/* webpackChunkName: "notesList" */ '../Views/NotesList'),
      footer: InnerFooter
    },
    meta: {
      title: 'Заметки'
    }
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
