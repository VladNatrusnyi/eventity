<template>
    <div class="create_event">
    <div class="container">
      <div class="content">
        <info-about-event />
        <EventForm />
      </div>
      <EventList :posts="posts"/>
    </div>
  </div>
<!--  @create="createPost"-->
<!--  :posts="posts"-->
</template>

<script>
import EventForm from '../components/EventForm'
import EventList from '../components/EventList'
import InfoAboutEvent from '../components/InfoAboutEvent'
export default {
  name: 'CreateEvent',
  computed: {
    posts () {
      // return this.$store.state.posts
      return this.$store.getters.getPosts
    }
  },
  components: {
    EventForm,
    EventList,
    InfoAboutEvent
  }
}
</script>
<style scoped>
.create_event{
  padding-top: 40px;
  background: #F3F3F3;
}
.content{
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.event_designer_necessary_personal_list li{
  margin-bottom: 15px;
  font-size: 16px;
  padding: 5px 10px;
  border: 1px solid #F0F2F5;
  border-radius: 3px;
  width: 35%;
  page-break-inside: avoid;
  break-inside: avoid;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
