<template>
  <div>
    <!--Виведення івентів у список-->
    <div class="event_list">
      <div class="current_event" v-for="post in posts" :key="post.id">
        <img :src="post.image" class="current_event_img">
        <div class="current_event_text_area">
          <div class="current_event_title_wrapper">
            <h2 class="current_event_title"> {{ post.EventName}} </h2>
            <p class="current_event_data_and_time">{{ post.realData }} {{ post.realTime}}</p>
            </div>
            <p class="current_event_description">{{ post.EventAboutInfo }}</p>
            <p class="current_event_venue">{{ post.EventCity}}</p>
        </div>
          </div>
        </div>
      </div>
</template>

<script>

export default {
  name: 'EventList',
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.event_list{
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 4px 100px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 40px;
  margin-top: 30px;
}
.current_event{
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
  padding: 15px;
  border-radius: 10px;
}
.current_event_title_wrapper{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.current_event_img{
  width: 200px;
}
.current_event_text_area{
  margin-left: 65px;
}
.current_event_title{
  margin-bottom: 20px;
}
.current_event_description{
  margin-bottom: 40px;
}
</style>
