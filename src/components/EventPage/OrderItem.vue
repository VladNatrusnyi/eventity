<template>
  <div class="order_item_wrapper">
    <div class="left_section">
      <user-promo :user_info="order.currentUserData" :size="80" @click="toUserPage" class="user_promo"/>
      <decor-line />
      <div v-html="order.responseText" ref="descriptionText" class="description_wrapper" :class="{active: isActive, wrap: show}"></div>
      <div @click="isActive = !isActive" class="detail_btn_wrapper" v-if="isActiveHeight">
        <p  v-if="isActive" class="detail_btn">Згорнути</p>
        <p v-else class="detail_btn">Читати далі</p>
        <i v-if="isActive" class="pi pi-chevron-up"></i>
        <i v-else class="pi pi-chevron-down"></i>
      </div>
    </div>
    <div class="right_section">
      <p class="publication_time">
        {{ time }}
      </p>
    </div>
    <div class="buttons_wrapper">
      <MyButton class="start_dialogue">Розпочати діалог</MyButton>
<!--      <MyButton class="select_artist" @click="selectThisArtist">Вибрати цього виконавця</MyButton>-->
    </div>
  </div>
</template>

<script>
import UserPromo from './UserPromo'
import DecorLine from '../UI/DecorLine'
import MyButton from '../UI/MyButton'
import formatDate from './../../filters/DateTimeFormater'
import { mapActions } from 'vuex'

export default {
  name: 'OrderItem',
  data () {
    return {
      isActive: false,
      isActiveHeight: false,
      show: false
    }
  },
  methods: {
    ...mapActions([
      'SELECT_ARTIST'
    ]),
    toUserPage () {
      this.$router.push(`/UserProfile/${this.order.currentUserData.id}/MyProfileInfo`)
    }
  },
  components: {
    UserPromo,
    DecorLine,
    MyButton
  },
  props: {
    order: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  mounted () {
    console.log(this.$refs.descriptionText.clientHeight)
    if (this.$refs.descriptionText && this.$refs.descriptionText.clientHeight >= 50) {
      this.isActiveHeight = true
    } else {
      this.isActiveHeight = false
      this.show = true
      console.log('Немає')
    }
  },
  computed: {
    time () {
      return formatDate(this.order.publicationTime)
    }
  }
}
</script>

<style scoped>
.order_item_wrapper{
  display: grid;
  grid-template-columns: 1fr minmax(100px, 200px);
  grid-template-rows: 1fr auto;
  padding: 15px 30px;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-bottom: 25px;
}
.left_section{}
.right_section{
  margin: 15px 0;
  justify-self: flex-end;
}
.select_artist{
  background: white;
  border: 2px solid #7567F8;
  color: #7567F8;
}
.select_artist:hover {
  background: #7567F8;
  color: white;
  cursor: pointer;
}
.start_dialogue{
  background: white;
  border: 2px solid #7567F8;
  color: #7567F8;
}
.start_dialogue:hover {
  background: #7567F8;
  color: white;
  cursor: pointer;
}
.buttons_wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: 2/1/3/3;
  gap: 5%;
  margin-top: 25px;
}

.description_wrapper{
  max-height: 50px;
  margin-top: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  transition: max-height 0.5s ease-out;
}
.description_wrapper.active{
  max-height: 1600px;
  transition: max-height 0.5s ease-in;
}
.description_wrapper.active:after{
  height: 0em;
  background: transparent;
}
.description_wrapper:after{
  content: "";
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 1em;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), white 100%);
  pointer-events: none;
  transition: 0.5s;
}
.wrap{
  height: 75px!important;
}
.wrap.description_wrapper{
  max-height: 75px;
}
.wrap.description_wrapper.active:after{
  background: transparent;
}
.detail_btn_wrapper{
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
.publication_time{
  font-size: 16px;
}
.user_promo:hover{
  cursor: pointer;
}
</style>
