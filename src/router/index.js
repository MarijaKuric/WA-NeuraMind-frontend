import { createRouter, createWebHistory } from 'vue-router'
import Pocetna from '@/views/Pocetna.vue'
import DailyFacts from '@/views/DailyFacts.vue'

const routes = [
  {
    path: '/',
    name: 'Pocetna',
    component: Pocetna,
  },
  {
    path: '/daily-facts',
    name: 'DailyFacts',
    component: DailyFacts,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
