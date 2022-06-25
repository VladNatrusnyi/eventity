<template>
  <comment-form v-if="this.recipient !== this.user" class="comment_form" />
  <br>
  <board :title="'Відгуки'" :isActive="true">
    <template v-slot:sub_element>
      <div class="field">
        <span class="p-float-label">
         <div v-if="!this.allComments && this.CURRENT_COMMENTS.length > 1" @click="showAllComments" class="all_comment_btn">Всі відгуки</div>
        </span>
      </div>
    </template>
    <template v-slot:main_content>
      <div v-if="this.CURRENT_COMMENTS.length === 0">Поки немає відгуків</div>
      <comment-list v-else :allComments="this.allComments" :CURRENT_COMMENTS="this.SHOW_CURRENT_COMMENTS"/>
      <div @click="hideAllComments" class="detail_btn_wrapper">
        <p  v-if="this.allComments" class="detail_btn">Згорнути відгуки</p>
        <i v-if="this.allComments" class="pi pi-chevron-up"></i>
      </div>
    </template>
  </board>
</template>

<script>
import Board from '../UI/Board'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Comments',
  data () {
    return {
      allComments: false
    }
  },
  components: {
    Board,
    CommentForm,
    CommentList
  },
  props: {
    recipient: String
  },
  methods: {
    ...mapActions([
      'GET_CURRENT_COMMENTS',
      'SHOW_COMMENTS'
    ]),
    showAllComments () {
      this.allComments = true
      this.SHOW_COMMENTS(true)
    },
    hideAllComments () {
      this.allComments = false
      this.SHOW_COMMENTS(false)
    }
  },
  mounted () {
    this.GET_CURRENT_COMMENTS(this.recipient)
  },
  computed: {
    ...mapGetters([
      'SHOW_CURRENT_COMMENTS',
      'CURRENT_COMMENTS',
      'user'
    ])
  }
}
</script>

<style scoped>
.all_comment_btn{
  font-size: 25px;
  color: #7567F8;
  font-weight: 500;
}
.all_comment_btn:hover{
  cursor: pointer;
}
.comment_form{
  margin-bottom: 20px;
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
</style>
