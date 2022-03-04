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
    }
  },
  {
    path: '/lk',
    name: 'lk',
    components: {
      header: InnerHeader,
      default: () => import(/* webpackChunkName: "lk" */ '../Views/lk'),
      footer: InnerFooter
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
