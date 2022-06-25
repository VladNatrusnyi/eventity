import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import PrimeVue from 'primevue/config'

// import 'primevue/resources/themes/lara-light-purple/theme.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import MultiSelect from 'primevue/multiselect'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import FileUpload from 'primevue/fileupload'
import Rating from 'primevue/rating'
import Editor from 'primevue/editor'
import ToastService from 'primevue/toastservice'
import ProgressSpinner from 'primevue/progressspinner'
import TabMenu from 'primevue/tabmenu'
import SplitButton from 'primevue/splitbutton'
import Password from 'primevue/password'
import Button from 'primevue/button'
import InputMask from 'primevue/inputmask'
import Tooltip from 'primevue/tooltip'
import Dialog from 'primevue/dialog'
import ConfirmDialog from 'primevue/confirmdialog'
import Fieldset from 'primevue/fieldset'
import ScrollTop from 'primevue/scrolltop'
import Panel from 'primevue/panel'
import Menu from 'primevue/menu'
import Paginator from 'primevue/paginator'
import Chip from 'primevue/chip'
import Toast from 'primevue/toast'

import ConfirmationService from 'primevue/confirmationservice'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCujJoEK5kPO7w9Y0OOmuC7_FLERRZP82o',
  authDomain: 'eventity-4ef1b.firebaseapp.com',
  databaseURL: 'https://eventity-4ef1b-default-rtdb.firebaseio.com',
  projectId: 'eventity-4ef1b',
  storageBucket: 'eventity-4ef1b.appspot.com',
  messagingSenderId: '882189594683',
  appId: '1:882189594683:web:8969caac379a6b2c2f2c1e',
  measurementId: 'G-JKW0E146KG'
}

// Initialize Firebase
initializeApp(firebaseConfig)
onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    store.dispatch('loggedUser', user)
    store.dispatch('GET_USER_FROM_API')
  }
})

const app = createApp(App)
app.use(ElementPlus).use(store).use(router).mount('#app')
app.use(VueAxios, axios)
app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)
app.directive('tooltip', Tooltip)
app.component('Accordion', Accordion)
app.component('AccordionTab', AccordionTab)
app.component('MultiSelect', MultiSelect)
app.component('Checkbox', Checkbox)
app.component('InputText', InputText)
app.component('Dropdown', Dropdown)
app.component('Calendar', Calendar)
app.component('InputNumber', InputNumber)
app.component('Textarea', Textarea)
app.component('FileUpload', FileUpload)
app.component('Rating', Rating)
app.component('Editor', Editor)
app.component('ProgressSpinner', ProgressSpinner)
app.component('TabMenu', TabMenu)
app.component('SplitButton', SplitButton)
app.component('Password', Password)
app.component('Button', Button)
app.component('InputMask', InputMask)
app.component('Tooltip', Tooltip)
app.component('Dialog', Dialog)
app.component('ConfirmDialog', ConfirmDialog)
app.component('Fieldset', Fieldset)
app.component('ScrollTop', ScrollTop)
app.component('Panel', Panel)
app.component('Menu', Menu)
app.component('Paginator', Paginator)
app.component('Chip', Chip)
app.component('Toast', Toast)
