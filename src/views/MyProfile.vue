<template>
  <div class="user_profile">
    <div class="container">
      <user-promo :user_info="CURRENT_USER" />
      <TabMenu :model="tabItems" />
    </div>
    <div class="content">
      <div class="container">
        <router-view :prop="CURRENT_USER"/>
      </div>
    </div>
  </div>
</template>

<script>
import UserPromo from '../components/EventPage/UserPromo'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MyProfile',
  data () {
    return {
      loader: true,
      tabItems: [
        { label: 'Мій профіль', icon: 'pi pi-fw pi-home', to: `/UserProfile/${this.userId}/MyProfileInfo` },
        { label: 'Налаштування профілю', icon: 'pi pi-fw pi-calendar', to: `/UserProfile/${this.userId}/settings` },
        { label: 'Завдання/Вакансії', icon: 'pi pi-fw pi-pencil', to: `/UserProfile/${this.userId}/vacancies` }
      ]
    }
  },
  components: {
    UserPromo
  },
  methods: {
    ...mapActions([
      'GET_CURRENT_USER_FROM_API'
    ]),
    showContent () {
      this.loader = false
    }
  },
  computed: {
    ...mapGetters([
      'CURRENT_USER'
    ])
  },
  props: {
    userId: String
  },
  mounted () {
    this.GET_CURRENT_USER_FROM_API(this.userId)
  }
}
</script>

<style scoped>
.content{
  background-color: #F3F3F3;
  padding-top: 10px;
  height: 100%;
}
</style>
