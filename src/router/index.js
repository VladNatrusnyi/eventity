import { createRouter, createWebHistory } from 'vue-router'
import CreateEvent from '../views/CreateEvent.vue'
import MainPage from '../views/MainPage.vue'
import Contacts from '../views/Contacts.vue'
import AllEvents from '../views/AllEvents.vue'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/CreateEvent',
    name: 'CreateEvent',
    component: CreateEvent
  },
  {
    path: '/Contacts',
    name: 'Contacts',
    component: Contacts
  },
  {
    path: '/AllEvents',
    name: 'AllEvents',
    component: AllEvents
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
