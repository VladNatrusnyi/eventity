<template>
  <div>
    <Toast />
    <decor-line />
    <h2 class="title">Ваша заявка</h2>
    <decor-line />
    <div>
      <span class="p-float-label dropdown">
        <Dropdown id="dropdown" v-model="workerTypeLocal" :options="workersArray" optionLabel="value" />
        <label for="dropdown">Виберіть вашу спеціальність</label>
      </span>
    </div>
    <Editor v-model="newResponse.responseText" editorStyle="height: 320px" class="editor"/>
    <div class="btn_wrapper">
      <my-button class="btn" @click="sendResponse" :class="{error: errorSignal}">Додати заявку</my-button>
    </div>
  </div>
</template>

<script>
import DecorLine from '../UI/DecorLine'
import MyButton from '../UI/MyButton'
import { mapActions } from 'vuex'
import Toast from 'primevue/toast'

export default {
  name: 'ResponseField',
  data () {
    return {
      newResponse: {
        eventId: this.eventIdNumber,
        userId: this.creatorId,
        responseText: '',
        workerType: ''
      },
      errorSignal: false,
      workerTypeLocal: null
    }
  },
  components: {
    DecorLine,
    MyButton,
    Toast
  },
  props: {
    eventIdNumber: String,
    creatorId: String,
    workersArray: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  methods: {
    ...mapActions([
      'ADD_NEW_RESPONSE'
    ]),
    sendResponse () {
      if (this.newResponse.responseText !== '' && this.newResponse.workerType !== null) {
        const publicationTime = new Date()
        this.newResponse.publicationTime = JSON.stringify(publicationTime.toString())
        this.ADD_NEW_RESPONSE(this.newResponse)
        this.$toast.add({ severity: 'success', summary: 'Вітаємо', detail: 'Вашу заявку надіслано', life: 3000 })
        this.errorSignal = false
      } else {
        this.errorSignal = true
        this.$toast.add({ severity: 'error', summary: 'Помилка відправлення', detail: 'Ви не заповнили заявку', life: 3000 })
      }
    }
  },
  watch: {
    workerTypeLocal (newValue) {
      this.newResponse.workerType = newValue.value
    }
  }
}
</script>

<style scoped>
.title{
  padding: 20px 0px;
}
.editor{
  margin: 20px 0px;
}
.dropdown{
  margin-top: 25px;
}
.btn_wrapper{
  display: flex;
  justify-content: center;
}
.btn{
  background: white;
  border: 2px solid #7567F8;
  color: #7567F8;
  display: block;
  margin-bottom: 25px;
}
.btn:hover {
  background: #7567F8;
  color: white;
  cursor: pointer;
}
.btn.error{
  border: 2px solid red;
}
/deep/.p-dropdown{
  width: 30%;
}
</style>
