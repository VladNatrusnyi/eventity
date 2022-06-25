<template>
  <Toast />
  <Dialog v-model:visible="displayFeedbackPopup" :modal="true" :dismissableMask="true">
    <template #header>
      <h3>Введіть вашу відповідь на відгук</h3>
    </template>
    <Editor v-model="feedbackText" editorStyle="height: 200px" class="editor"/>
    <template #footer>
      <Button label="Відмінити" icon="pi pi-times" class="p-button-text" @click="() => {this.displayFeedbackPopup = false}"/>
      <Button label="Надіслати" @click="giveFeedback" icon="pi pi-check" autofocus />
    </template>
  </Dialog>
  <div class="comment_item_wrapper">
    <div class="user_promo_wrapper">
      <user-promo :user_info="this.commentData.commentCreatorData" :size="80" @click="toUserPage" class="user_promo" />
      <div class="right_section">{{this.date}}</div>
    </div>
    <decor-line/>
    <div v-html="this.commentData.commentText" class="comment_text_wrapper"></div>
    <div>
      <div @click="openFeedbackSection" v-if="this.commentData.feedbackText" class="detail_feedback_wrapper">
        <i v-if="feedbackStatus" class="pi pi-chevron-down"></i>
        <i v-else class="pi pi-angle-right"></i>
        <p class="detail_btn">Відповідь на відгук</p>
      </div>
    </div>
    <div v-if="feedbackStatus" v-html="this.commentData.feedbackText" class="comment_text_wrapper"></div>
    <div class="feedback" v-if="this.commentData.recipient === this.user && !this.commentData.feedbackText">
      <div @click="openFeedbackPopup" class="detail_btn_wrapper">
        <p class="detail_btn">Відповісти на відгук</p>
        <i class="pi pi-send"></i>
      </div>
    </div>
  </div>
</template>

<script>
import UserPromo from '../EventPage/UserPromo'
import DecorLine from '../UI/DecorLine'
import { mapActions, mapGetters } from 'vuex'
import formatDate from '../../filters/DateTimeFormater'
import Toast from 'primevue/toast'

export default {
  name: 'CommentItem',
  data () {
    return {
      displayFeedbackPopup: false,
      feedbackText: '',
      feedbackStatus: false
    }
  },
  components: {
    UserPromo,
    DecorLine,
    Toast
  },
  props: {
    commentData: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  methods: {
    ...mapActions([
      'GIVE_FEEDBACK'
    ]),
    toUserPage () {
      this.$router.push(`/UserProfile/${this.commentData.commentCreatorData.id}/MyProfileInfo`)
    },
    openFeedbackPopup () {
      this.displayFeedbackPopup = true
    },
    giveFeedback () {
      if (this.feedbackText === '') {
        this.$toast.add({ severity: 'error', summary: 'Помилка відправлення', detail: 'Ви нічого не ввели', life: 3000 })
      } else {
        this.GIVE_FEEDBACK({ commentId: this.commentData.commentId, feedbackText: this.feedbackText, recipient: this.commentData.recipient })
        if (this.GIVE_FEEDBACK_ERROR) {
          this.$toast.add({ severity: 'error', summary: 'Помилка відправлення', detail: 'Перезавантажте сторінку і спробуйте ще раз', life: 3000 })
        } else {
          this.$toast.add({ severity: 'success', summary: 'Вітаємо', detail: 'Вашу відповідь надіслано', life: 3000 })
          this.displayFeedbackPopup = false
        }
      }
    },
    openFeedbackSection () {
      if (this.feedbackStatus) {
        this.feedbackStatus = false
      } else {
        this.feedbackStatus = true
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'GIVE_FEEDBACK_ERROR'
    ]),
    date () {
      return formatDate(this.commentData.creationData)
    }
  }
}
</script>

<style scoped>
.comment_text_wrapper{
  background: white;
  border-radius: 6px;
  box-shadow: 0px 4px 60px rgba(0, 0, 0, 0.1);
  padding: 20px 25px;
  margin-top: 20px;
}
.comment_item_wrapper {
  background: white;
  border-radius: 6px;
  box-shadow: 0px 4px 60px rgba(0, 0, 0, 0.2);
  padding: 20px 25px;
  margin-bottom: 30px;
}
.user_promo:hover{
  cursor: pointer;
}
.user_promo_wrapper{
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.right_section{
}
.feedback{
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.detail_feedback_wrapper{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 25px;
  margin-top: 10px;
}
.detail_btn_wrapper{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 25px;
}
.detail_btn{
  color: #7567F8;
  font-weight: normal;
  font-size: 16px;
  text-align: center;
  margin-top: 5px;
  padding-right: 5px;
  border-bottom: 1px dashed transparent;
}
.detail_btn:hover{
  cursor:pointer;
  border-bottom: 1px dashed #7567F8;
}
.pi{
  color: #7567F8;
  font-weight: normal;
  font-size: 16px;
}
/deep/.p-accordion.p-accordion-header:not(.p-disabled).p-accordion-header-link:focus{
  box-shadow: none;
}
</style>
