<template>
  <ScrollTop :threshold="300" />
  <div class="loader" v-if="loader">
    <preloader />
  </div>
  <div class="user_profile" v-else>
    <div>
      <div v-if="this.param === this.user">
        <my-profile :user-id="this.param" />
      </div>
      <div v-else>
        <div class="container">
           <user-promo :user_info="CURRENT_USER" />
        </div>
          <div class="content">
            <div class="container">
              <profile-info-table :user="CURRENT_USER" />
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserPromo from '../components/EventPage/UserPromo'

import Preloader from '../components/UI/Preloader'
import { mapActions, mapGetters } from 'vuex'
import MyProfile from './MyProfile'
import ProfileInfoTable from '../components/UI/ProfileInfoTable'

export default {
  name: 'UserProfile',
  data () {
    return {
      loader: true,
      param: this.$route.params.id
    }
  },
  components: {
    Preloader,
    UserPromo,
    MyProfile,
    ProfileInfoTable
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
      'CURRENT_USER',
      'user'
    ]),
    userId () {
      return this.$route.params.id
    }
  },
  mounted () {
    console.log(this.param)
    this.GET_CURRENT_USER_FROM_API(this.param)
    setTimeout(() => {
      this.showContent()
    }, 1000)
  },
  watch: {
    '$route.params.id' (newValue, oldValue) {
      console.log('Совершён переход по ссылке', newValue)
      this.GET_CURRENT_USER_FROM_API(newValue)
      this.param = newValue
    }
  }
}
</script>

<style scoped>
.content{
  background-color: #F3F3F3;
  padding-top: 10px;
}
.shadow{
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
  padding: 0px 40px 20px 40px;
}
</style>
