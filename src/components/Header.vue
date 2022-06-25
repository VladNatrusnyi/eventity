<template>
<div class="header">
  <div class="contain">
    <div class="left_part">
      <img src="./../assets/img/logo.png" alt="" class="main_logo">
      <router-link to="/Events" class="find_job_btn">Знайти роботу</router-link>
      <a href="/CreateEvent" @click.prevent="onClickCreate" class="create_event-btn">Створити подію</a>
    </div>
    <div class="right_part">
      <nav>
        <a href="/" @click.prevent="onClickMain" class="go_to_main">Головна</a>
        <router-link to="/Contacts" class="go_to_contacts">Контакти</router-link>
        <router-link to="" class="go_to_help">Допомога</router-link>
        <router-link to="" class="about_us">Про нас</router-link>
        <SplitButton :label="USER_NAME" :model="items" v-if="checkUser" class="p-button-rounded"/>
        <router-link v-else to="/login" class="enter">Вхід</router-link>
      </nav>
    </div>
   </div>
</div>
  <hr>
</template>
<script>
import SplitButton from 'primevue/splitbutton'
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  data () {
    return {
      items: [
        {
          label: 'Мій профіль',
          icon: 'pi pi-user',
          command: () => {
            this.$router.push(`/UserProfile/${this.user}/MyProfileInfo`)
          }
        },
        {
          label: 'Вихід',
          icon: 'pi pi-user',
          to: '/',
          command: () => {
            this.logout()
          }
        }
      ]
    }
  },
  components: {
    SplitButton
  },
  methods: {
    logout () {
      this.$store.dispatch('logoutUser')
    },
    onClickCreate () {
      this.$router.push('/CreateEvent')
    },
    onClickMain () {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters([
      'checkUser',
      'user',
      'USER_NAME'
    ])
  }
}
</script>
<style scoped>
.contain{
  padding: 7px 50px;
  margin: 0 auto;
  /*border: 2px solid red;*/
  /*width: 100%;*/
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left_part{
  display: flex;
  align-items: center;
}
.right_part{
  display: flex;
  align-items: center;
}
a{
  text-decoration: none;
  font-size:16px ;
  font-weight: bold;
  color: #7568F8;
}
.find_job_btn{
  margin-right: 30px;
  margin-left: 15px;
  border: 1px solid #7568F8;
  border-radius: 20px;
  padding: 6px 15px;
}
.find_job_btn:hover{
  color: #fff;
  background: #7567F8;
}
.create_event-btn{
  color: #fff;
  background: #7567F8;
  border-radius: 20px;
  padding: 6px 15px;
}
.create_event-btn:hover{
  border: 1px solid #7568F8;
  color: #7568F8;
  background: white;
}
nav a{
  margin-right: 35px;
}
</style>
