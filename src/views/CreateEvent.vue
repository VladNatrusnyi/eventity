<template>
    <div class="create_event">
    <div class="container">
        <EventForm />
    </div>
  </div>
<!--  @create="createPost"-->
<!--  :posts="posts"-->
</template>

<script>
import EventForm from '../components/CreateEventPage/EventForm'
export default {
  name: 'CreateEvent',
  computed: {
  },
  components: {
    EventForm
  }
}
</script>
<style scoped>
.create_event{
  padding-top: 40px;
  background: #F3F3F3;
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
