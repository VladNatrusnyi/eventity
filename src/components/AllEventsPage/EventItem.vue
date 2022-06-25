<template>
  <div class="event_item">
    <img :src=" require('../../assets/img/event-img.png')" alt="" class="current_event_img">
    <div class="current_event_text_area">
      <div class="current_event_title_wrapper">
        <h2 class="current_event_title"> {{ event_data.EventName}} </h2>
        <p class="current_event_data_and_time">{{date}}</p>
      </div>
      <div v-html="event_data.EventAboutInfo" class="current_event_description"></div>
      <p class="current_event_venue">{{ event_data.EventCity}}</p>
    </div>
  </div>
</template>

<script>
import formatDate from './../../filters/DateTimeFormater'

export default {
  name: 'EventItem',
  props: {
    event_data: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  computed: {
    date () {
      return formatDate(this.event_data.realTime)
    }
  }
}
</script>

<style scoped>
.current_event_data_and_time{
  margin-top: 5px;
}
.event_item{
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
  padding: 15px;
  background: #FFFFFF;
  filter: drop-shadow(0px 4px 10px rgba(1, 0, 0, 0.25));
  border-radius: 10px;
}
.current_event_title_wrapper{
  display: flex;
  align-items: flex-start;
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
  height: 75px;
  overflow: hidden;
  position: relative;
}
.current_event_description::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 30px;
  background: linear-gradient(180deg, transparent, #ffffffde 50%);
}

</style>
