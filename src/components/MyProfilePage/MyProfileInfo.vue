<template>
  <div class="my_profile_info">
    <profile-info-table :user="prop" />
  </div>
</template>

<script>
import ProfileInfoTable from '../UI/ProfileInfoTable'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MyProfile',
  props: {
    prop: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  components: {
    ProfileInfoTable
  },
  methods: {
    ...mapActions([
      'GET_CURRENT_USER_FROM_API'
    ])
  },
  mounted () {
    this.GET_CURRENT_USER_FROM_API(this.$route.params.id)
  },
  computed: {
    ...mapGetters([
      'CURRENT_USER'
    ])
  }
}
</script>

<style scoped>
.my_profile_info{
  padding: 20px 0px;
}
</style>
