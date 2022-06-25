<template>
  <Toast />
  <Fieldset legend="Додати відгук" :toggleable="true" :collapsed="true">
    <Editor id="inputtext" v-model="commentText" editorStyle="height: 200px" class="editor"/>
    <div class="send_buttom_wrapper">
      <my-button class="btn" :class="{error: errorSignal}" @click="sendComment">Надіслати відгук</my-button>
    </div>
  </Fieldset>
</template>

<script>
import MyButton from '../UI/MyButton'
import Toast from 'primevue/toast'
import { mapActions } from 'vuex'

export default {
  name: 'CommentForm',
  data () {
    return {
      commentText: '',
      errorSignal: false
    }
  },
  components: {
    MyButton,
    Toast
  },
  methods: {
    ...mapActions([
      'ADD_NEW_COMMENT'
    ]),
    sendComment () {
      if (this.commentText === '') {
        this.errorSignal = true
        this.$toast.add({ severity: 'error', summary: 'Помилка надсилання', detail: 'Ви нічого не ввели у поле для відгуку', life: 3000 })
      } else {
        this.ADD_NEW_COMMENT({ userId: this.$route.params.id, commentText: this.commentText })
        this.$toast.add({ severity: 'success', summary: 'Вітаємо', detail: 'Ваш відгук надіслано', life: 3000 })
        this.errorSignal = false
        this.commentText = ''
      }
    }
  }
}
</script>

<style scoped>
.shadow{
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
  padding: 20px;
}
/deep/.p-fieldset-legend{
  margin-left: 25px;
  margin-bottom: 15px;
}
/deep/.p-fieldset{
  border-radius: 10px;
}
.send_buttom_wrapper{
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.btn{
  background: white;
  border: 2px solid #7567F8;
  color: #7567F8;
  display: block;
}
.btn:hover {
  background: #7567F8;
  color: white;
  cursor: pointer;
}
.btn.error{
  border: 2px solid red;
}
</style>
