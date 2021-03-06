import { createRouter, createWebHistory } from 'vue-router'
import HeaderComponent from '@/Components/HeaderComponent'
import FooterComponent from '@/Components/FooterComponent'
import InnerHeader from '@/Components/InnerHeader'
import InnerFooter from '@/Components/InnerFooter'
import Notes from '@/Views/Notes/Notes'
import NotFound from '@/Views/404'

const routes = [
  {
    path: '/',
    name: 'Main',
    components: {
      header: HeaderComponent,
      default: () => import(/* webpackChunkName: "home" */ '../Views/Main/Main'),
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
      default: () => import(/* webpackChunkName: "taskList" */ '../Views/TaskList/TaskLists'),
      notes: Notes,
      footer: InnerFooter
    },
    meta: {
      title: 'Задачи'
    }
  },
  {
    path: '/mailing',
    name: 'mailing',
    components: {
      header: InnerHeader,
      default: () => import(/* webpackChunkName: "mailing" */ '../Views/Mail/Mail'),
      footer: InnerFooter
    },
    meta: {
      title: 'Отправка почты'
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
