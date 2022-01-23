<template>
  <div class="container">
    <event-list :posts="posts"/>
  </div>
</template>
<script>
import EventList from '../components/EventList'
export default {
  name: 'AllEvents',
  components: { EventList },
  computed: {
    posts () {
      // return this.$store.state.posts
      return this.$store.getters.getPosts
    }
  }
}
</script>
