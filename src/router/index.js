import { createRouter, createWebHistory } from 'vue-router'
import store from './../store/store'
import CreateEvent from '../views/CreateEvent.vue'
import MainPage from '../views/MainPage.vue'
import Contacts from '../views/Contacts.vue'
import AllEvents from '../views/AllEvents.vue'
import EventPage from '../views/EventPage.vue'
import UserProfile from '../views/UserProfile'
// import MyProfile from '../views/MyProfile'
import MyProfileInfo from '../components/MyProfilePage/MyProfileInfo'
import ProfileSettings from '../components/MyProfilePage/ProfileSettings'
import TasksAndVacancies from '../components/MyProfilePage/TasksAndVacancies'
import RegisterForm from '../components/RegisterPage/RegisterForm'
import SignIn from '../components/SignInPage/SignIn'
import EditEventPage from '../components/EditEventPage/EditEventPage'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/Events/:id/EditEvent',
    name: 'EditEventPage',
    component: EditEventPage
  },
  {
    path: '/CreateEvent',
    name: 'CreateEvent',
    component: CreateEvent,
    beforeEnter (to, from, next) {
      if (store.getters.checkUser) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/Contacts',
    name: 'Contacts',
    component: Contacts
  },
  {
    path: '/Events',
    name: 'AllEvents',
    component: AllEvents
  },
  {
    path: '/Events/:id',
    name: 'EventPage',
    component: EventPage
    // beforeEnter (to, from, next) {
    //   if (store.getters.checkUser) {
    //     next()
    //   } else {
    //     next('/login')
    //   }
    // }
  },
  {
    path: '/UserProfile/:id/MyProfileInfo',
    name: 'UserProfile',
    component: UserProfile,
    props: true,
    children: [
      {
        path: '',
        name: 'MyProfileInfo',
        component: MyProfileInfo,
        props: true
      },
      {
        path: '/UserProfile/:id/settings',
        name: 'ProfileSettings',
        component: ProfileSettings,
        props: true
      },
      {
        path: '/UserProfile/:id/vacancies',
        name: 'TasksAndVacancies',
        component: TasksAndVacancies,
        props: true
      }
    ]
  },
  {
    path: '/registration',
    name: 'RegisterForm',
    component: RegisterForm
  },
  {
    path: '/login',
    name: 'SignIn',
    component: SignIn
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
